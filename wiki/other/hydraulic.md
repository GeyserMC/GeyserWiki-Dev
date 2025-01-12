---
title: Hydraulic
description: >-
  Hydraulic is a companion to Geyser which allows for Bedrock players to join
  modded Minecraft: Java Edition servers.
crowdin_page_id: 9a0f2967-c806-4ac0-8a1d-3481a6e65f90
---

Hydraulic is a companion to Geyser which allows for Bedrock players to join modded Minecraft: Java Edition servers. 

## What is Hydraulic? {#what-is-hydraulic}

Hydraulic is a server-side mod, which allows for Bedrock players to join modded Minecraft: Java Edition servers. This project works alongside [Geyser](https://github.com/GeyserMC/Geyser) to make this possible.

:::caution

This project is still in very early development and should not be used on production setups!

:::

## Download {#download} 

You can download Hydraulic [here](/download/?project=other-projects&hydraulic=expanded).

## Contributing {#contributing}

Any contributions are appreciated. Please feel free to reach out to us on [Discord](https://discord.gg/geysermc) if
you're interested in helping out with Hydraulic.

### Project Setup {#project-setup}

1. Clone the repo to your computer.
2. Navigate to the Hydraulic root directory and run `git submodule update --init --recursive`. This command downloads all the needed submodules for Hydraulic and is a crucial step in this process.
3. The project should import into your IDE after the loom setup is complete. For more detailed information, see the [Fabric setup](https://fabricmc.net/wiki/tutorial:setup)
4. Use `./gradlew build` to compile a jar file, or use `./gradlew :fabric:runServer` or `./gradlew :neoforge:runServer` to run a server with Hydraulic installed. Make sure to install Geyser into your `mods` folder!
