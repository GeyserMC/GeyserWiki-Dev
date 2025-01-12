---
title: Commands and Permissions
description: Commands and their associated permission nodes for Geyser.
crowdin_sync: true
crowdin_page_id: cd92ff4f-9105-46a2-8696-8b0e2f8b9d31
---

# Commands and Permissions

Geyser features many built-in commands that can be used by players or server owners.

:::info

When using BungeeCord and Velocity, you will need to use a permission plugin such as [LuckPerms](https://luckperms.net/)
on the proxy server to assign permissions to players. Assigning permissions on the backend servers will not work.

:::

## Geyser commands & their permissions {#geyser-commands--their-permissions}

|                Command                |           Permission          |                                                              Description                                                             |
| :-----------------------------------: | :---------------------------: | :----------------------------------------------------------------------------------------------------------------------------------: |
|   `geyser` <br/> Geyser root command  |        `geyser.command`       |                                The permission required to see/run any Geyser commands.                               |
|     `geyser help` <br/> `geyser ?`    |     `geyser.command.help`     |                                        Shows help for all registered commands.                                       |
|         `geyser advancements`         | `geyser.command.advancements` |                                           Open the Java advancements menu.                                           |
|             `geyser dump`             |     `geyser.command.dump`     |                                    Dumps Geyser debug information for bug reports.                                   |
|             `geyser list`             |     `geyser.command.list`     |                                      List all players connected through Geyser.                                      |
|            `geyser offhand`           |    `geyser.command.offhand`   |                                             Puts an item in your offhand.                                            |
|            `geyser reload`            |    `geyser.command.reload`    |                            Reloads the Geyser configurations. Kicks all players when used!                           |
|           `geyser settings`           |   `geyser.command.settings`   |                          Opens a settings menu allowing you to modify aspects of the world.                          |
| `geyser shutdown` <br/> `geyser stop` |   `geyser.command.shutdown`   |                    Shuts down Geyser.<br/>*This command only works on Standalone.*                   |
|          `geyser statistics`          |  `geyser.command.statistics`  |                                            Open the Java statistics menu.                                            |
|            `geyser version`           |    `geyser.command.version`   |                               Shows the current Geyser version and checks for updates.                               |
|           `geyser tooltips`           |   `geyser.command.tooltips`   |                                 Toggle showing Advanced Tooltips (F3 + H on Java)                                 |
|          `geyser extensions`          |  `geyser.command.extensions`  | Lists all currently loaded extensions. This command is only registered if any extensions are loaded. |

## Permissions for Geyser extensions {#extension-permissions}

For the following, `<id>` refers to the extensions' id.

| Command                    | Permission                    | Description                                                               |
| :------------------------- | :---------------------------- | :------------------------------------------------------------------------ |
| `<id> help` <br/> `<id> ?` | `geyser.command.exthelp.<id>` | Shows help for all commands registered by this extension. |

## Other Permissions {#other-permissions}

Besides commands, there are other permissions that are used to guard specific Geyser features.

| Permission                  | Description                                                                                                                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `geyser.settings.server`    | Allow players to use the [game settings menu](/img/wiki/game_menu.png). (Also requires player to have op.)                          |
| `geyser.settings.gamerules` | Defines whether a user can alter gamerules in the [game settings menu](/img/wiki/game_menu.png). (Also requires player to have op.) |
| `geyser.update`             | Whether this player will receive Geyser update notifications upon joining.                                                                                             |

## Permissions when using Geyser-Standalone/Geyser-ViaProxy {#standalone-viaproxy-permissions}

Geyser-ViaProxy and Geyser-Standalone feature their own basic permission handler. To edit base permissions,
open the `permissions.yml` file and add or remove permissions that Geyser players should receive when joining.
See the file for more information.

You can further customize permission handling by creating a [Geyser extension](/wiki/geyser/extensions/) that makes use of Geysers API
to deal with permission checking.

## Permissions when using Geyser on platforms without permission handlers {#permissions-platforms-no-permission-handlers}

The following affects Geyser-BungeeCord, Geyser-Velocity, and Geyser-Fabric.
These platforms unfortunately do not have built-in permission handlers. Because of that, you will need to grant permissions on those platforms
manually using permission handlers, such as [LuckPerms](https://luckperms.net/). Geyser's permission are listed above. For extension permissions, consult their documentation.

Alternatively, you can use [LuckLink](https://github.com/onebeastchris/LuckLink), a third-party Geyser extension, to automatically register permissions using [LuckPerms](https://luckperms.net/).

- Install [LuckPerms](https://luckperms.net/) on the platform where you've installed Geyser (BungeeCord/Velocity/Fabric).
- To allow Geyser to automatically register permission defaults, install the [LuckLink](https://github.com/onebeastchris/LuckLink) Geyser extension
  by downloading the `LuckLink.jar` and adding it to Geyser's `extensions` folder.
- Restart the server, and permissions should be automatically registered.

## Floodgate commands and permissions {#floodgate-commands-and-permissions}

For Floodgate commands, see [here](/wiki/floodgate/commands/).
