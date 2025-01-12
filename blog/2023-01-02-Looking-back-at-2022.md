---
title: Looking back at 2022
slug: looking-back-at-2022
authors: Camotoy
hide_table_of_contents: false
description: A look back at the year of 2022 for Geyser.
crowdin_page_id: 921bcb8d-70cb-49d1-9f83-deb59979eafa
---
Hi.

2022 for Geyser was, in comparison to other years, rather unremarkable in terms of new features. Whereas 2021 had Bedrock skin support and complete inventory support, and 2020 had movement fixes, this year felt largely like a maintenance year. I think that’s a good thing; it means we’ve reached the point where the only things left to do are bug fixes, niche features/behavior, or updates. Even so, here are some of the notable points from Geyser in 2022, and what’s next.

<!-- truncate -->

## Yearly GitHub Stats

In 2022, we had 519 commits from 59 contributors, 85 merged PRs, and 869 new stars on the repository. The reach Geyser continues to get every year is positively astounding.

## (Nearly) Every Floodgate Instance Breaking

On February 2nd, 2022, Mojang snuck in a change to their API which resulted in almost every Floodgate instance involving the Paper server software breaking (likely due to [this](https://github.com/PaperMC/Paper/blob/0cc2503b88343c4d10d9e6ecf7592d56762b4cae/patches/server/0183-Ability-to-change-PlayerProfile-in-AsyncPreLoginEven.patch#L38) Paper patch) - even Floodgate instances only on the proxy. We swiftly put mitigations in place, and while I hope such an issue never has to happen again, the day presented a once-in-a-lifetime unique challenge in fixing a sudden, serious bug that we did not induce, and it’s a reminder that part of the job at Geyser is working around whatever changes Mojang throws at us, inside or outside of updates.

## Custom Item Support

Finally, Java’s CustomModelData system is now supported on Bedrock. This change is largely thanks to [ImDaBigBoss](https://github.com/ImDaBigBoss), who created the [PR](https://github.com/GeyserMC/Geyser/pull/2822) back in February, and [Kastle](https://github.com/Kas-tle), who has worked to map Java packs to Bedrock as effortlessly as possible. 

## Dedicated Wiki

We now have a [dedicated wiki](https://wiki.geysermc.org/), allowing users to contribute documentation without allowing random changes from anyone.

## Extensions

After two years of theory and concepts, Geyser extensions are now possible, allowing for improved interaction with Bedrock clients to take advantage of what the Bedrock platform has to offer. These work very similar to plugins and allow for developers to write code specifically for Bedrock and Geyser features using the Geyser API. In 2023, we hope to see more API additions that allow for servers, plugins and mods to shine in creativity.

## Geyser-Fabric Joins the Main Repository

Geyser-Fabric is now a part of the main Geyser repository, instead of being relegated to a separate repository. This will ensure that the Fabric mod always gets the latest changes to Geyser, and isn’t prone to losing out on updates.

## Secure Profiles and Geyser

The 1.19 Java updates added new changes that allowed player chat to be verified and reported to Mojang. Bedrock as it stands is essentially incompatible with these changes; before 1.19.3, requiring that all players chat securely (enabling `enforce-secure-profile` in `server.properties`) would prevent Bedrock from joining. Thankfully, in 1.19.3, that same setting now allows Bedrock players to join, just without the ability to chat.

## Almost 100% Day-One Updates

I’m very proud of all our developers and contributors that are able to get updates ready before each Minecraft release. Two years ago for 1.16, we were unable to have an update ready before the release date. Now, we are in a place to be consistently prepared for supporting auto-updating Bedrock clients by having a Geyser version released by the day of. The almost exception this year was the Bedrock 1.19.21 update released in August - while it was supposed to be a patch update, it surprised the entire Bedrock community (even featured servers) by being incompatible with the prior 1.19.20 version without any notice from Mojang. There was no notable difference, and we were able to push an update in about an hour after we discovered the incompatibility.

## Upcoming: Geyser and Floodgate Merge

As we look to 2023, one of my goals as a project lead on Geyser is ensuring the setup and update process is as smooth and secure as possible. Having two plugins for users to worry about isn’t fun, and many support requests we get have no idea that they need Floodgate for Bedrock players to join without needing a Java account. While Floodgate has to stick around for backend servers and Geyser Standalone, we want to package Floodgate functionality into Geyser for improved efficiency, to fix some [annoying bugs](https://github.com/GeyserMC/Floodgate/issues/178) where having duplicate classes causes API errors, and to simplify how many plugins you need to install to get Geyser running.


Overall, I’m really happy and very grateful to see Geyser where it is today. We have 20,000 running Geyser instances, with 10,000 players combined on all of them. We have an amazing community, and the support of many in the wider Minecraft community. 2023 promises more good changes - here’s to it!
