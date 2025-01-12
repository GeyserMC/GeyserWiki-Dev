---
title: Features
description: >-
  Learn about the features of Floodgate 2.0, including the whitelist command and
  skin uploading.
crowdin_page_id: 92f27f70-d154-493d-ad49-adc7e35e6953
---

## Whitelist command {#whitelist-command}

Floodgate 2.0 has a whitelist command, `fwhitelist`, that should be used for adding or removing Floodgate players to whitelist.json. The username prefix doesn't need to be included.
`fwhitelist add Tim203`
`fwhitelist remove Tim203`

You can also specify a UUID: `fwhitelist add 00000000-0000-0000-0009-01f64f65c7c3`

The permission node is `floodgate.command.fwhitelist`.

## What is skin uploading? {#what-is-skin-uploading}
Skins of Bedrock player should be visible to Java players on servers with Floodgate 2.0 installed.  
If they aren't, it's most likely that the skin uploading queue has grown too large and can take a while to upload your skin.

Skin uploading is also a part of the [Global Api](/wiki/api/api.geysermc.org/global-api/). It is responsible for converting Bedrock skins to Java skins and uploading them to Mojang servers make them show up on Java Edition.

We're using MineSkin internally. MineSkin is running on accounts donated by the community. So if you want to support MineSkin and make the upload times faster, feel free to look at [this page](https://mineskin.org/account) for more info.

![Example skin upload](/img/wiki/skin_upload_example.png)
