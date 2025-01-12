---
title: GeyserConnect
description: >-
  GeyserConnect is a extension for Geyser that allows you to join multiple
  servers using a single Geyser proxy.
crowdin_page_id: 2cb4e25c-82d5-48a2-b0b5-92239e82e845
---

GeyserConnect is a extension for Geyser that allows you to join multiple servers using a single GeyserMC proxy.

## Setup {#setup}
(For GeyserConnect to work you need an open UDP port, by default it's `19132`).
1. Download the latest Geyser build from the [downloads page](/download)
2. Download the latest build from [here](https://geysermc.org/download/?project=other-projects&geyserconnect=expanded)
3. Extract the downloaded ZIP file, and put the extracted JAR file into the `extensions` folder in your GeyserMC standalone installation.
4. Start Geyser standalone as you do with a normal Geyser install. EG: `java -Xms1024M -jar Geyser.jar` (More info on [Creating a Startup Script](/wiki/geyser/creating-a-startup-script/))
5. Shutdown the standalone Geyser instance, and make you're desired changes to the GeyserConnect configuration in `GeyserConnect` in the `extensions` folder.
6. Connect to it to make sure its all working.

## DNS {#dns}
There are [DNS](https://github.com/GeyserMC/GeyserConnect/tree/master/bind9) (using bind9) configs in the repo if you would like to use them.

## Config {#config}
See [here](https://github.com/GeyserMC/GeyserConnect/blob/master/src/main/resources/config.yml).
