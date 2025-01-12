---
title: RakNet Amplification Attack Summary and Response
slug: raknet-amplification-attack
authors: Kas-tle
hide_table_of_contents: false
description: A look at how we dealt with an exploit in the RakNet protocol
crowdin_page_id: 4a2c95a7-61af-4d0b-aa13-d034e0e5a0b9
---

In March, we were made aware of an exploit in the RakNet networking library used by Geyser, making Geyser instances vulnerable to use in a Distributed Denial of Service (DDoS) amplification attack. This bug was patched on all builds of Geyser numbered 478 and later. If you are still running an outdated build of Geyser, you should update immediately by downloading the latest build from [https://geysermc.org/download](https://geysermc.org/download). The original [security advisory](https://github.com/CloudburstMC/Network/security/advisories/GHSA-6h3m-c6fv-8hvh) for this vulnerability was published on the [CloudburstMC/Network](https://github.com/CloudburstMC/Network) repository. This post will detail the timeline, anatomy of the attack, our response, and additional measures we have taken to prevent similar attacks in the future.

<!-- truncate -->

## Timeline (UTC)

* **March 24th, 11:00AM**: bStats data begins to show instability in the number of online Geyser instances
* **March 28th,  5:00AM**: First reported Geyser instance causing server suspension by OVH
* **March 28th,  4:00PM**: First GitHub issue is opened referencing spamming of suspicious connections 
* **March 28th,  5:00PM**: Attack against the Global Linking Server, which also hosts the Global API and Geyser Test Server, takes all three services offline
* **March 28th,  6:07PM**: The Global API server is started to begin restoration of the database from the MariaDB log
* **March 28th,  6:27PM**: The packets sent from Geyser responsible for the suspension of the Geyser Test Server machine are identified as being 134 bytes each sent at a rate of 60,000 packets per second
* **March 28th,  6:30PM**: A build of Geyser with enhanced logging for the Cloudburst Network library is installed on the test server to gather data about the attack vector.
* **March 28th,  7:48PM**: Database restoration is completed and the Global API is brought back online, but remains unstable due to the initial backlog of requests from the downtime
* **March 28th,  8:46PM**: Global API stability returns to normal
* **March 29th,  1:30AM**: Initial rate limiting is implemented in Geyser from upstream changed in Cloudburst Network, but the specific attack vector is still unclear 
* **March 29th,  3:32AM**: Packet responsible is identified as Connection Request Accepted, sent by Geyser in the initial RakNet handshake
* **March 29th,  6:00AM**: Initial proof of concept is created showing a client can maliciously spam Connection Request packets, causing the server to reply with larger Connection Request Accepted packets
* **March 29th, 12:25PM**: Further rate limiting is added to Geyser via Cloudburst Network, particularly for replies to Connection Request packets
* **March 30th,  9:20AM**: A raw packet capture is obtained from a Geyser instance under attack, unmasking the root cause of the issue as the RakNet reliability setting of the Connection Request Accepted packet in Cloudburst Network
* **March 30th, 10:30AM**: A final fix to Cloudburst Network is pushed to Geyser, and a previously exploited instance is monitored with full packet dumps to confirm the fix
* **March 30th, 10:28PM**: Security advisory is published on the Cloudburst Network GitHub repository
* **March 30th, 10:31PM**: First @everyone ping in 1 year is made in the Geyser Discord announcing the security advisory and requesting all server owners update their instances as soon as possible


## Initial Warning Signs

Before the issue was initially detected, a suspicious trend can be seen in Geyser’s bStats data. On March 24th starting at approximately 11:00AM UTC, noticeable dips are seen in the total number of online Geyser instances. Normally, the number of online instances smoothly climbs and falls by about 500 instances, likely correlating with when people have free time to play Minecraft. Beginning on March 24th, frequent hourly swings of as much as 2200 instances online are seen. Given hindsight, this is likely when wide scale exploitation of this attack began.

| ![Geyser bStats Usage](/img/blog/2024-05-05-raknet-amplification-attack/geyser-bstats-usage.png) |
|:--:| 
| *bStats chart of servers using Geyser over the month of March. Clear instability in the number of online servers reported is seen at the left starting on March 24th, at least three days before any formal reports of the attack were received.* |


## Initial Disclosure

Multiple users in the Geyser Discord first brought the attack to our attention by providing us with notices from their hosting provider that their server instances were suspended due to abuse. This means that their Geyser instances were sending outbound traffic interpreted by their hosting provider interpreted as a denial of service attack. Here is a snippet from one of these notices:


```sh
##############################################################################
#       DDoS-Attack detected from host XXX.XXX.XXX.XXX                       #
##############################################################################

TIME                             	SRC       	SRC-PORT  ->  DST       	DST-PORT  SIZE  PROT
----------------------------------------------------------------------------------------------------------
2024-03-28 06:49:06.493070866 +0100  XXX.XXX.XXX.XXX	19132  ->  51.75.XXX.XXX    	1   134   UDP
2024-03-28 06:49:06.50822918  +0100  XXX.XXX.XXX.XXX	19132  ->  51.75.XXX.XXX    	1   134   UDP
2024-03-28 06:49:06.515954324 +0100  XXX.XXX.XXX.XXX	19132  ->  51.75.XXX.XXX    	1   134   UDP
2024-03-28 06:49:06.519665639 +0100  XXX.XXX.XXX.XXX	19132  ->  51.75.XXX.XXX    	1   134   UDP
2024-03-28 06:49:06.523410527 +0100  XXX.XXX.XXX.XXX	19132  ->  51.75.XXX.XXX    	1   134   UDP
2024-03-28 06:49:06.526647418 +0100  XXX.XXX.XXX.XXX	19132  ->  51.75.XXX.XXX    	1   134   UDP
2024-03-28 06:49:06.53355138  +0100  XXX.XXX.XXX.XXX	19132  ->  51.75.XXX.XXX    	1   134   UDP
2024-03-28 06:49:06.537470479 +0100  XXX.XXX.XXX.XXX	19132  ->  51.75.XXX.XXX    	1   134   UDP
```
*Abuse report from OVH regarding the suspension of server running a Geyser instance.*

This is the first information we were presented with regarding the attack vector. Based on this, we  can determine the rough speed of the attack by subtracting the time of the last packet in the report from the first packet (0.044399613 seconds) and dividing the packets sent in that timeframe (8 packets) by the time, we can see about 180 packets per second are being sent here. We are also given the size of the packet on the wire, which is 134 bytes. It’s important to note that this is the size of the packet as it exits the provider network, so it should only contain the destination headers for the public IP address.

Logs were also provided by another user, which show that after many repeated connection attempts, Cloudburst Network was unable to keep up and packet byte buffer handling was compromised.

```log
[nioEventLoopGroup-5-1/ERROR] [org.cloudburstmc.netty.channel.raknet.RakChannelPipeline]: Exception thrown in RakNet pipeline
io.netty.handler.codec.DecoderException: java.lang.NullPointerException: Cannot invoke "io.netty.buffer.ByteBuf.release()" because "this.buffer" is null
  at io.netty.handler.codec.MessageToMessageDecoder.channelRead(MessageToMessageDecoder.java:98)
  at io.netty.handler.codec.MessageToMessageCodec.channelRead(MessageToMessageCodec.java:111)
  at io.netty.channel.AbstractChannelHandlerContext.invokeChannelRead(AbstractChannelHandlerContext.java:442)
  at io.netty.channel.AbstractChannelHandlerContext.invokeChannelRead(AbstractChannelHandlerContext.java:420)
  at io.netty.channel.AbstractChannelHandlerContext.fireChannelRead(AbstractChannelHandlerContext.java:412)
  at io.netty.channel.DefaultChannelPipeline$HeadContext.channelRead(DefaultChannelPipeline.java:1410)
  at io.netty.channel.AbstractChannelHandlerContext.invokeChannelRead(AbstractChannelHandlerContext.java:440)
  at io.netty.channel.AbstractChannelHandlerContext.invokeChannelRead(AbstractChannelHandlerContext.java:420)
  at io.netty.channel.DefaultChannelPipeline.fireChannelRead(DefaultChannelPipeline.java:919)
  at org.cloudburstmc.netty.handler.codec.raknet.server.RakServerRouteHandler.channelRead(RakServerRouteHandler.java:60)  
  ...
  at org.cloudburstmc.netty.handler.codec.raknet.AdvancedChannelInboundHandler.channelRead(AdvancedChannelInboundHandler.java:48)
  ...
  at org.geysermc.geyser.network.netty.handler.RakConnectionRequestHandler.channelRead(RakConnectionRequestHandler.java:80)
  ...
  at org.cloudburstmc.netty.handler.codec.raknet.ProxyInboundRouter.channelRead(ProxyInboundRouter.java:66)
  ...
Caused by: java.lang.NullPointerException: Cannot invoke "io.netty.buffer.ByteBuf.release()" because "this.buffer" is null
  at org.cloudburstmc.netty.channel.raknet.packet.EncapsulatedPacket.deallocate(EncapsulatedPacket.java:138)
  ... 45 more
```
*Stacktrace from an attacked server after many hours of connection attempts, showing instability in the ability of Cloudburst Network to process packets.*


## Reproduction Attempts

Given that the packet spam was occurring without Bedrock login taking place, the vulnerability was likely in the initial establishment of the RakNet connection. Minecraft Bedrock Edition uses a modified version of the RakNet protocol which has gone largely unchanged for many years and is unofficially documented at [https://wiki.vg/Raknet_Protocol](https://wiki.vg/Raknet_Protocol). Before game packets are sent, the connection is established with 7 packets, four of which are sent by the client and three of which are sent by the server. It was likely that one of these three packets was being spammed by the Geyser instance. The initial RakNet connection follows the sequence:

```sh
[Client -> Server] Open Connection Request 1
[Server -> Client] Open Connection Reply 1
[Client -> Server] Open Connection Request 2
[Server -> Client] Open Connection Reply 2

RakNet connection is established and further messages now wrapped in Frame Set Packet

(FSP) [Client -> Server] Connection Request
(FSP) [Server -> Client] Connection Request Accepted
(FSP) [Client -> Server] New Incoming Connection
```
*Summary of the RakNet initial connection sequence. Note that the ability to utilize RakNet reliability settings begin only once packets are wrapped in a Frame Set Packet.*

Given that the packet being spammed is coming from the server, and given it has a known outbound length of 134 bytes, we can analyze a normal connection to Geyser in Wireshark to determine the most likely responsible packet:

| ![Wireshark Initial RakNet Connection](/img/blog/2024-05-05-raknet-amplification-attack/wireshark-initial-raknet-connection.png) |
|:--:|
| *Wireshark packet capture of a Geyser server at the initial RakNet connection stage. A hex dump of the Connection Request Accepted packet, sent by the server to the client, is shown. Note that byte numbers start at 0.* |

We can see that on the client end, Connection Request Accepted is 148 bytes over the wire. However, if we subtract the 14 bytes of headers (bytes 0 to 13) added by the local network for routing, we get a size of 134 bytes when the packet left the provider network. Knowing this packet is likely responsible, we can consider how we might get the server to send many of them. One somewhat naive approach we took initially was sending many Connection Request packets once receiving Open Connection Reply 2 from the server. This does indeed result in the server sending many connection request accepted packets, showing there indeed was potential for abuse in Cloudburst Network’s existing implementation:

| ![Wireshark Reproduction Attempt](/img/blog/2024-05-05-raknet-amplification-attack/wireshark-reproduction-attempt.png) |
|:--:|
| *Wireshark packet capture of a Geyser instance after being sent hundreds of Connection Request packets by a single client. The Geyser instance consequently replies with an equal number of Connection Request Accepted packets.* |

That said, this is at best an amplification factor of two. By now, we had some bandwidth data of the attack, showing an amplification factor of at least 350 in the wild. Given this, there must have been a way to get this packet to be sent many more times.

| ![Pterodactyl Outbound Spike](/img/blog/2024-05-05-raknet-amplification-attack/pterodactyl-outbound-spike.png) |
|:--:|
| *Pterodactyl Panel dashboard of a Paper server running Geyser during an attack, showing a large outbound traffic spike. Within the short attack period, inbound traffic is only 819KiB, while outbound traffic is nearly 300MiB.* |


## Live Analysis

One thing that worked in our favor, ironically, was the wide scale exploitation of this vulnerability. Since our own official test server, and even some of our personal servers, were actively being attacked at regular intervals, we had ample locations to gather data about the attack. We began taking full raw packet capture of a server actively being attacked, which would ultimately unveil the root cause of the attack.

| ![Wireshark Live Attack](/img/blog/2024-05-05-raknet-amplification-attack/wireshark-live-attack.png) |
|:--:|
| *Wireshark packet capture of a Geyser instance under attack. The highlighted packet is a NAK packet sent by the client to the Geyser instance requesting the server resend packets with sequence numbers ranging from 0 to 8191. The immediately following packet is similar, requesting packets 8192 to 16383. The attacker sent these at the beginning of the connection and then simply waited while the Geyser instance continued to send thousands of packets, with each one incrementing the sequence number, leading to yet more packets being sent until the malicious NAK requests were fulfilled.* |

Looking at the packets sent by the attacker, we see that things largely follow the specified connection sequence. But we also see a new type of packet as well: a NAK packet with a range of 0 to 8191. This brings us to the topic of RakNet packet reliability.

Since UDP itself does not have an inbuilt handshake like TCP to ensure all data arrives bit perfect in the correct order, RakNet implements a reliability system as a substitute. For this system, each packet is sent with a reliability type. While RakNet has eight reliability types, understanding this vulnerability only requires us to understand the difference between reliable and unreliable packets. Simply put, the client can request that reliable packets be resent, while it cannot request the resend of unreliable packets. Looking at the Cloudburst Network library, we see that this packet was indeed sent as reliable.

| ![RakServerOnlineInitialHandler](/img/blog/2024-05-05-raknet-amplification-attack/rak-server-online-initial-handler.png) |
|:--:|
| *RakServerOnlineInitialHandler#sendConnectionRequestAccepted is responsible for sending the Open Connection Request packet in the initial connection sequence. The RakReliability.RELIABLE enum causes the packet to be cached by the server before it is sent, therefore allowing the client to later re-request it via NAK.* |

Because the packet was marked as reliable, this means that Network allows the client to respond with an ACK (Positive Acknowledgement) or NAK (Negative Acknowledgement). At this stage in the connection, this is a vector for abuse because the client has not yet done anything to prove that we are communicating with them directly versus receiving UDP packets with spoofed IP headers. By sending a NAK with the maximum range, they force us to continuously send the Connection Request Accepted packet.


## Effects

This begs the question though: why would an attacker bother doing this? The two leading theories are UDP amplification, meaning the goal is to use Geyser instances as a means to attack other servers, or provider-based suspension, meaning the goal is to get the servers running Geyser instances suspended by their hosting provider.


### UDP Amplification

As explained earlier, UDP has no inbuilt handshake. This means that UDP allows for traffic to be sent to a given IP address without them acknowledging or accepting it. When the ratio of request size to response size is near one, this is largely a nonissue since an attacker gains very little by going through a third party to send the data. In this case, however, the attacker can send a very small amount of data (~52 bytes) and trigger a response of over 8000 134 byte packets. Because the connection sequence up to Connection Request Accepted is always the same and does not require the attacker to actually see the packets we respond with to respond correctly, the attacker can spoof the source IP header of the UDP packets it sends to the Geyser instance. This means that, because of this amplification vector, the Geyser instance can unwittingly be used to multiply the attacker's traffic by a theoretical maximum factor of 22,000. However, in practice, we saw that in the wild the actual multiplication factor was around 1000.


### Provider-Based Suspension

It is also important to consider that servers are generally hosted not locally, but with hosting providers. Hosting providers have a legitimate business interest in preventing their network from being used for abuse, as failing to do so could result in other hosting providers and ISPs blocking their traffic altogether. As a result, many hosting providers employ mechanisms to detect unusual traffic from their servers and will “black hole” traffic to and from servers on their network emitting such traffic. This means that if an attacker wishes to take down a particular server, rather than overwhelm it with a traditional denial of service attack, they can simply make it appear as though the server itself is trying to engage in a denial of service attack. This will result in outbound traffic from the server being dropped by the provider, effectively having the same effect. We saw this occur, for example, with some Geyser services hosted on Hetzer as shown by the below MTR.


```sh
mtr pe.minetropical.net -rwbc 10  	 
Start: 2024-03-28T18:24:58+0000
HOST: MS.local                                             	Loss%   Snt   Last   Avg  Best  Wrst StDev
  1.|-- 172.16.0.1                                            	0.0%	10	0.8   1.2   0.3   4.6   1.3
  2.|-- no-ptr.ziax.ltd (XXX.XXX.XXX.XXX)                       	0.0%	10	0.9   0.8   0.6   1.4   0.2
  3.|-- 62.7.117.42                                           	0.0%	10	7.5   7.6   7.2   8.4   0.3
  4.|-- core2-hu0-3-0-7.colindale.ukcore.bt.net (217.32.170.174)  0.0%	10	7.1   7.2   6.5   8.2   0.5
  5.|-- core6-hu0-3-0-15.faraday.ukcore.bt.net (109.159.252.134) 20.0%	10	7.5   7.7   7.0   9.0   0.6
  6.|-- 166-49-209-194.gia.bt.net (166.49.209.194)            	0.0%	10	7.5   7.6   7.2   8.8   0.5
  7.|-- t2c4-et-5-3-0.de-fra.gia.bt.net (166.49.195.103)      	0.0%	10   20.5  21.4  20.2  24.5   1.4
  8.|-- decix-gw.hetzner.com (80.81.192.164)                  	0.0%	10   20.8  20.8  20.3  22.0   0.4
  9.|-- core11.nbg1.hetzner.com (213.239.252.22)              	0.0%	10   25.8  26.2  25.5  29.3   1.2
 10.|-- blocked.hetzner.com (88.198.253.78)                   	0.0%	10   28.1  35.7  28.1  76.1  14.4
 11.|-- ???                                                  	100.0	10	0.0   0.0   0.0   0.0   0.0
 12.|-- blocked.hetzner.com (88.198.253.78)                  	90.0%	10  2906. 2906. 2906. 2906.   0.0
```
*MTR (My Traceroute) shows the path packets take to a given Geyser server. In the 10th and 12th hop, we can see that the packet is being routed to the hostname blocked.hetzner.com, implying traffic to the server is being null-routed.*


## Mitigation

Multiple forms of mitigation for this bug, as well as preventive measures to guard against future attacks have been introduced into Geyser and its upstream networking library. These include proper reliability handling during the early RakNet connection, early cookie verification, and rate limiting.


### Proper Reliability Handling in Early RakNet Connection

The principal mitigation was changing the reliability type of the abused packet to unreliable. This means that the server will no longer respond to NAK requests for it, effectively leading to the attackers requests going unanswered. The packet capture below is taken from an instance with the reliability type of Connection Request Accepted changed to unreliable. We can see that the attacker simply continues to increment their packet range requested by NAK, but no response is provided.

| ![Wireshark Mitigated Attack](/img/blog/2024-05-05-raknet-amplification-attack/wireshark-mitigated-attack.png) |
|:--:|
| *Wireshark packet capture of a Geyser instance under attack with a build mitigating the original attack vector. The attacker is seen sending NAK packets with a sequence range of as high as 40,959. However, since the packet was not sent as reliable, there is nothing for the Geyser instance to send in response.* |


### Early Cookie Verification

The underlying issue that allows for UDP amplification attacks is a lack of verification at an early stage of the connection. The original RakNet protocol actually specifies an optional solution for this. For context, RakNet was purchased by Oculus in 2014, and open sourced. Given the acquisition of Oculus by Facebook, the code for the original implementation is now archived by them. While Mojang’s implementation of RakNet has some differences from the original, it does share many of the same features. In the packet Open Connection Reply 1, the original specification refers to a boolean HasSecurity, followed by a four byte cookie if the boolean is true.

| ![Original RakNet Packets](/img/blog/2024-05-05-raknet-amplification-attack/original-raknet-packets.png) |
|:--:|
| *This is an excerpt from the original RakNet source containing the packet identifier enums. The comments above each enum define the packet structure. These packets from the initial login sequence are largely unchanged in Mojang’s RakNet implementation, though it does not appear that the client has any support for full encryption as defined in the original specification. This can be inferred because when the HasSecurity boolean and cookie is sent by the server in Open Connection Reply 1, Open Connection Request 2 by the client does include the cookie, but sets the clientSupportsSecurity boolean to false.* |

It turns out that if a cookie is supplied by the Bedrock server in Open Connection Reply 1, the Bedrock client will reply with the same cookie. This allows us to effectively verify that the IP of the Bedrock client is not being spoofed by the third packet. Were the IP of the Bedrock client being spoofed, the packet containing the cookie would be sent to the victim’s IP and be unknown to the attacker. If the attacker sends back an incorrect cookie, the connection can be terminated at that point.


### Rate Limiting

In addition, Cloudburst Network also implemented three main rate limits to prevent further potential abuse of the protocol. These are summarized in the table below.

| Name                    | RakNet Connection Stage | Description                                          | Default |
| ----------------------- | ----------------------- | ---------------------------------------------------- | ------- |
| RAK_PACKET_LIMIT        | post-connection         | per-ip per-tick (10ms) post-connection packet limit  | 120     |
| RAK_GLOBAL_PACKET_LIMIT | post-connection         | per-tick (10ms) overall packet limit                 | 1000    |

Geyser initially rolled out a fix that forced these defaults, but has since been [updated](https://github.com/GeyserMC/Geyser/pull/4532) to allow them to be configured with system properties that are documented on the [Geyser Wiki](https://wiki.geysermc.org/geyser/geyser-command-line-arguments-and-system-properties/#disabling-warnings-and-advanced-configuration).

These defaults may present an issue to those running a reverse proxy in front of their Geyser instance, particularly those utilizing DDoS mitigation services like TCPShield and CosmicGuard, as to Network it will appear that all connections are originating from the same IP. To make configuration on these services easier, Geyser will disable these rate limits provided proxy protocol is enabled for the bedrock connection, and the Geyser instance is properly configured to only accept connections from the IPs of the proxy. To simplify this configuration, Geyser’s config can now accept a URL to specify proxy server IP ranges. Many DDoS mitigation providers have a static link to an always up to date text file of these.

```yaml
bedrock:
# ...
  enable-proxy-protocol: true
  proxy-protocol-whitelisted-ips: [ "https://cosmic.global/ips/", "https://tcpshield.com/v4/" ]
```
*Geyser configuration using a URL pointing a new-line separated text file containing allowed IPs for proxy-protocol usage.*


## Long Term Impact

It is extremely important that all those running vulnerable instances of Geyser update as soon as possible. Failure to do so may result in your Geyser instance being used to harm others via UDP denial of service amplification. We continue to see this issue being exploited in the wild as of the writing of this post, and see no reason that will stop in the foreseeable future. The number of unpatched instances will likely decrease over time as Bedrock updates force server owners to update in order to support players on the latest Bedrock version.


## Acknowledgements 

We thank the community for their patience as we addressed this issue, all those who responsibly disclosed this issue to us, the developers at Cloudburst and Geyser that worked to mitigate the issue, the server hosts that took an active role in ensuring instances on their hosting services were patched as soon as possible, all donors for their financial support of Geyser, and Cubecraft for their continued financial and operational support of the project.
