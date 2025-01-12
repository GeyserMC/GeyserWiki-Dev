---
title: '1.18 Release, MCProtocolLib, Refactors & More!'
slug: 1-18-release-and-more
authors: RednedEpic
hide_table_of_contents: false
description: >-
  In this post, we will be covering all the changes that led up to the 1.18
  release.
crowdin_page_id: cd16bcf9-0de9-4239-946a-4ccdbeb372f6
---
Hi everyone 👋

Welcome to the new Geyser blog! We’ll be posting new content here periodically about project updates, future plans, project announcements and really just miscellaneous development-related content around the Geyser project(s). These will be linked in our #blog-feed channel on Discord, so if you want to be notified when we make new posts and such, feel free to either follow the channel in your own Discord server, or turn on notifications.

<!-- truncate -->

## Introduction: {#introduction}
In this post, we will be covering all the changes that led up to the 1.18 release. With 1.18 came a huge set of changes for Geyser which although may not be visible to the end user, were a massive feat internally. This resulted in not only multiple project refactors of Geyser along with surrounding projects (PacketLib, MCProtocolLib, etc.) but many additional optimizations and improvements to how the code operated and ran. For the latter half of 2021 especially, we’ve been putting in a lot more time to ensure Geyser runs more smoothly and to optimize poorly performing parts of the code, so much of these changes were a direct result of that initiative.

## Writing a New Java Edition Protocol Library: {#writing-a-new-java-edition-protocol-library}
To preface, we were not initially planning to do this big refactor all at once, but one thing led to another and here we are. Our initial plans were actually quite a bit different, with us initially planning to deprecate and remove MCProtocolLib from our codebase, [and instead implement support for Java Edition](https://github.com/GeyserMC/Protocol/tree/feature/java-3.0) inside of [Protocol](https://github.com/CloudburstMC/Protocol), our Bedrock Edition protocol library. We actually got it to a point where you could join and properly send/receive packets quite well!

![Java Edition Lib](https://user-images.githubusercontent.com/29153871/144722769-88a6701f-4478-4608-96ae-a5c855b752b7.png)

This was inline with our plans to continually improve performance and maintainability with Geyser, since using a library where much of the code is the same across both the Java & Bedrock protocol libraries would reduce much of the additional work we need to do in. A good example of this is inside our [ItemTranslator](https://github.com/GeyserMC/Geyser/blob/master/core/src/main/java/org/geysermc/geyser/translator/inventory/item/ItemTranslator.java#L295-L357) class, where we translate NBT objects from that used inside of MCProtocolLib, to that used inside of our Bedrock protocol library. We were intending to have this done with 1.18 since the update itself was not too drastic, meaning we could spend much more time on Geyser itself, rather than trying to update to the protocol.

## Taking over MCProtocolLib: {#taking-over-mcprotocollib}
However our plans completely changed when Steveice10, the maintainer of MCProtocolLib at the time, reached out [and asked if we wanted to take over the project](https://github.com/GeyserMC/MCProtocolLib/issues/659). At first we were a bit hesitant as we had already put in quite a bit of work to our new library, but as MCProtocolLib was already an integral part of Geyser from [the very beginning](https://github.com/GeyserMC/Geyser/commit/17b99a80fe910ba7147aa4f3cd2669b5538422c7) and we had essentially been maintaining the library for the past year or so, we all came to the consensus that scrapping the library would be a poor idea, both for us as well as the wider community who was also using this library. We decided to take over it.

With us now being in full control of MCProtocolLib, that gave us much more freedom to update and improve the project that we previously were unable to do. Rather than go on with a new library altogether, we felt it would be better to gradually port over much of our work into MCProtocolLib. With the release of 1.18 still lingering, we decided to jump the gun and start on a massive refactor of packets, with us adopting Mojang-mapped packet names. This is something we were doing inside of Protocol for Java Edition and with more and more projects adopting these names and for the sake of unity across the board, we felt now was the best time to make this decision. 

## Improving Performance in MCProtocolLib: {#improving-performance-in-mcprotocollib}
During the process of renaming packets to use Mojmap names, we found that most of the performance bottlenecks with MCProtocolLib & Geyser did not particularly lie with object translation, since it's relatively cheap in the grand scheme of things, but just the ways in which the library operated itself.

![Slow Packets](https://user-images.githubusercontent.com/29153871/144722843-4bef937f-b393-487d-99fc-cc56a8eece58.PNG)

What we identified is that inside of MinecraftProtocol, the main class inside of MCProtocolLib, that it was re-registering the Minecraft protocol individually for every player individually, any time the protocol state changed. To give a bit more background on this - the Minecraft protocol operates over four individual state. The first is the handshaking state, which is the state set when a client first makes a connection the Minecraft server. Once the handshake has completed, the next state is either the `login` or the `status` state. The status state is set when a client pings the server from the server list and never actually joins, while the login state is for when the client is logging into the server. Once the login is complete, the server then goes on to the `game` state, where you actually recieve packets that let you interact with the world.

Below is an example of what MCProtocolLib was doing previously, any time you switched from the `login` state to the `game` state:

```java
private void initGame(BiConsumer<Integer, Class<? extends Packet>> clientboundPackets, BiConsumer<Integer, Class<? extends Packet>> serverboundPackets) {
        clientboundPackets.accept(0x00, ServerSpawnEntityPacket.class);
        clientboundPackets.accept(0x01, ServerSpawnExpOrbPacket.class);
        clientboundPackets.accept(0x02, ServerSpawnLivingEntityPacket.class);
        clientboundPackets.accept(0x03, ServerSpawnPaintingPacket.class);
        clientboundPackets.accept(0x04, ServerSpawnPlayerPacket.class);
        clientboundPackets.accept(0x05, ServerAddVibrationSignalPacket.class);
        clientboundPackets.accept(0x06, ServerEntityAnimationPacket.class);
        clientboundPackets.accept(0x07, ServerStatisticsPacket.class);
        clientboundPackets.accept(0x08, ServerPlayerActionAckPacket.class);
        clientboundPackets.accept(0x09, ServerBlockBreakAnimPacket.class);
        clientboundPackets.accept(0x0A, ServerUpdateTileEntityPacket.class);
        clientboundPackets.accept(0x0B, ServerBlockValuePacket.class);
        clientboundPackets.accept(0x0C, ServerBlockChangePacket.class);
        clientboundPackets.accept(0x0D, ServerBossBarPacket.class);
        clientboundPackets.accept(0x0E, ServerDifficultyPacket.class);
        clientboundPackets.accept(0x0F, ServerChatPacket.class);
        clientboundPackets.accept(0x10, ServerClearTitlesPacket.class);
        clientboundPackets.accept(0x11, ServerTabCompletePacket.class);
        clientboundPackets.accept(0x12, ServerDeclareCommandsPacket.class);
        clientboundPackets.accept(0x13, ServerCloseWindowPacket.class);
        clientboundPackets.accept(0x14, ServerWindowItemsPacket.class);
        clientboundPackets.accept(0x15, ServerWindowPropertyPacket.class);
        clientboundPackets.accept(0x16, ServerSetSlotPacket.class);
        clientboundPackets.accept(0x17, ServerSetCooldownPacket.class);
        clientboundPackets.accept(0x18, ServerPluginMessagePacket.class);
        // this continues for more than 100 more packets
```

With the above code, every game packet would be registered into a new map. This was a far less than ideal situation, given that hundreds of packets would be registered, and this was something called for every client. We opted to replace this with a [static registry](https://github.com/GeyserMC/MCProtocolLib/blob/master/src/main/java/com/github/steveice10/mc/protocol/codec/MinecraftCodec.java) which instead holds these values just once. Any time the sub-protocol changes, it instead just pulls from this static codec instead, rather than populating a map every time.

We also identified other areas where code was running poorly - previously, every packet was constructed through reflection, which we realized could easily be replaced with a packet factory. Nowadays, the packet registration code is only constructed once, and the player's protocol state determines which map to pull packets from.

With all these changes consolidated into an individual codec, it also opens the door for multi-version compatibility - something we were initially planning to do with our Java Edition work in Protocol. Although not officially supported yet nor something we have fully committed to, these changes will allow that capability in the future, and implementing projects technically could implement the capability to do so if they please.

## Refactoring Geyser: {#refactoring-geyser}
With the massive changes inside MCProtocolLib already lining up, we already foresaw the changes in Geyser being quite drastic. With plans for extensions and a more streamlined API being in the plans for over a year, we felt that now was the best time to start moving along with that. This initially started with a massive refactor of the packages inside of Geyser. Previously, everything involved with the work Geyser did with packet translation and whatnot lied in the `connector` module of the project. This name was slightly confusing for many as Geyser does much more than just "connecting you to a server." With that being said, we decided to rename the module to `core` and update the packaging for it from `org.geysermc.connector` to `org.geysermc.geyser`. 

Along with the package name changes, we decided to start implementing a new API. At the time of writing, this is still something that is very much a work in progress, however this will make it much easier to write projects that interop with Geyser & Floodgate in a much more streamlined fashion, and allow for extensions to have a solid base to build off of.

## Improving Code in Geyser: {#improving-code-in-geyser}
As mentioned earlier in this post, one of our plans was to eventually move away from MCProtocolLib due to the additional translation we have to do between MCProtocolLib and Protocol objects. However, as we continued working on both the MCProtocolLib changes and the Geyser refactor, we identified that these translations were not the sources of most performance bottlenecks inside of Geyser itself. This led to us refactoring our entity system inside of Geyser, not solely for the sake of performance, but also for the sake of better usability and understanding.

```java
public void updateBedrockMetadata(EntityMetadata entityMetadata, GeyserSession session) {
        switch (entityMetadata.getId()) {
            case 0:
                if (entityMetadata.getType() == MetadataType.BYTE) {
                    byte xd = (byte) entityMetadata.getValue();
                    metadata.getFlags().setFlag(EntityFlag.ON_FIRE, ((xd & 0x01) == 0x01) && !metadata.getFlags().getFlag(EntityFlag.FIRE_IMMUNE)); // Otherwise immune entities sometimes flicker onfire
                    metadata.getFlags().setFlag(EntityFlag.SNEAKING, (xd & 0x02) == 0x02);
                    metadata.getFlags().setFlag(EntityFlag.SPRINTING, (xd & 0x08) == 0x08);
                    // Swimming is ignored here and instead we rely on the pose
                    metadata.getFlags().setFlag(EntityFlag.GLIDING, (xd & 0x80) == 0x80);

                    setInvisible(session, (xd & 0x20) == 0x20);
                }
                break;
            case 1: // Air/bubbles
                setAir((int) entityMetadata.getValue());
                break;
            case 2: // custom name
                if (entityMetadata.getValue() instanceof Component message) {
                    // Always translate even if it's a TextMessage since there could be translatable parameters
                    metadata.put(EntityData.NAMETAG, MessageTranslator.convertMessage(message, session.getLocale()));
                }
                break;
            case 3: // is custom name visible
                if (!this.is(PlayerEntity.class))
                    metadata.put(EntityData.NAMETAG_ALWAYS_SHOW, (byte) ((boolean) entityMetadata.getValue() ? 1 : 0));
                break;
            case 4: // silent
                metadata.getFlags().setFlag(EntityFlag.SILENT, (boolean) entityMetadata.getValue());
                break;
            case 5: // no gravity
                metadata.getFlags().setFlag(EntityFlag.HAS_GRAVITY, !(boolean) entityMetadata.getValue());
                break;
            case 6: // Pose change - typically used for bounding box and not animation
                Pose pose = (Pose) entityMetadata.getValue();

                metadata.getFlags().setFlag(EntityFlag.SLEEPING, pose.equals(Pose.SLEEPING));
                // Triggered when crawling
                metadata.getFlags().setFlag(EntityFlag.SWIMMING, pose.equals(Pose.SWIMMING));
                setDimensions(pose);
                break;
            case 7: // Freezing ticks
                // The value that Java edition gives us is in ticks, but Bedrock uses a float percentage of the strength 0.0 -> 1.0
                // The Java client caps its freezing tick percentage at 140
                int freezingTicks = Math.min((int) entityMetadata.getValue(), 140);
                setFreezing(session, freezingTicks / 140f);
                break;
        }
    }
```

Looking at the code above, our previous code for translating entity metadata was extremely scattered and utilized many magic “numbers” associated with entity translation. These types of switch statements were all over various entity classes, and were quite messy. 

To explain the above code in more detail - the way Minecraft Java sends entity metadata over the protocol is that it associates an id for every entity metadata “type”. Looking at the above code, id 3 for example, is associated with whether an entity’s name is visible above their head. The problem with handling our code like this is that if Mojang decides to add a new entity metadata field at id 2 for example, everything above that will be incremented by 1, so 'custom name visible' would have an id of 4, rather than 3 in future updates. Along with the code being so scattered, it meant that we would need to increment ids inside of _every_ entity class, which was far less than ideal.

What we opted to do to remedy this issue is to instead not use massive if or switch statements on the ids, but to register these values inside of a list, and add them based on the order they should be translated in.

```java
EntityDefinition<Entity> entityBase = EntityDefinition.builder((BaseEntityFactory<Entity>) Entity::new)
        .addTranslator(MetadataType.BYTE, Entity::setFlags)
        .addTranslator(MetadataType.INT, Entity::setAir) // Air/bubbles
        .addTranslator(MetadataType.OPTIONAL_CHAT, Entity::setDisplayName)
        .addTranslator(MetadataType.BOOLEAN, Entity::setDisplayNameVisible)
        .addTranslator(MetadataType.BOOLEAN, (entity, entityMetadata) -> entity.setFlag(EntityFlag.SILENT, ((BooleanEntityMetadata) entityMetadata).getPrimitiveValue()))
        .addTranslator(MetadataType.BOOLEAN, Entity::setGravity)
        .addTranslator(MetadataType.POSE, Entity::setPose)
        .addTranslator(MetadataType.INT, Entity::setFreezing)
        .build();
```

All that code shown earlier has been condensed into the following. Now, if Mojang is to add a new metadata field at id 2 for instance, we can simply just plug it in as the third value, and boom, everything else will automatically be incremented!

In regards to performance, previously all the entity data had been held in an EntityType enum, which was not the best for constructing more complex entity objects. This meant we had to use reflection for constructing entities which as mentioned earlier, was used inside of MCProtocolLib, and was slower than what we wanted. This too was replaced with an entity factory, and can be seen in the above code snippet.

## New API, Extensions, and Looking Onward: {#new-api-extensions-and-looking-onward}
As brought up multiple times throughout this post, we have been spending time working up a new API. We eventually want to bring in extensions to Geyser, which act as plugins on their own except they are loaded from Geyser itself. With more and more people and larger servers adopting Geyser, many more unique and niche usecases have popped up which don’t particularly fit inside of Geyser itself, but would still benefit users as a whole. As Geyser is capable of running on 6 platforms at this point in time (Spigot, Sponge, Standalone, Velocity, Fabric and BungeeCord, with Forge likely on the way), as a developer, creating a separate addon capable of running on all these platforms is far less than ideal. We’ve opted to get around this by creating a new extension system, allowing developers to create an extension one time for Geyser, and it being capable of running on any of these platforms.

This extension API has not been created yet however, and plans for the base API inside of Geyser are still being finalized. We also intend to start moving most of Floodgate into Geyser itself, so unless you are running Floodgate independently from Geyser (e.g. you use Geyser Standalone but run Floodgate on the proxy), in the near future you will only need to install Geyser, and Floodgate’s functions will all be handled automatically in Geyser.

With that coming up, we also want to design the base API to be agnostic in the sense that basic functions such as retrieving how many players are online can be done using the same API, whether the server has just Geyser installed or just Floodgate. But at the same time, we also want to make it easy to utilize a more-specific Floodgate and Geyser API. 

Anyway, that about wraps up the first post! Thanks for reading and feel free to offer any feedback about the topics covered in our [Discord server](https://discord.gg/geysermc)!
