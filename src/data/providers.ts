import { translate } from "@docusaurus/Translate"
import { Providers } from "../types/providers"

// Do not modify the structure of this file without updating the extraction logic in create-providers-json.ts

const connectionTemplates = {
    asConfigured: translate({
        id: 'providers.connect.templates.default.as_configured',
        message: "Connect using the Java server IP and the Bedrock port set in your Geyser config."
    }),
    bedrockPort: translate({
       id: 'providers.connect.templates.default_bedrock_port',
       message: "Connect with the Java server IP and the default Bedrock port (19132)."
    }),
    sameAsJava: translate({
        id: 'providers.connect.templates.java_ip_port',
        message: 'Connect with the Java server IP and Java server port.'
    }),
    providedByHost: translate({
        id: 'providers.connect.templates.provided_by_host',
        message: 'Instructions on how to connect on Bedrock edition are provided by the host.'
    })
}

const configChangeTemplates = {
    cloneRemotePort: {
        clone_remote_port: true
    },
    contactHostForPort: {
        port_instruction: translate({
            id: 'providers.config.templates.ask_host_for_port',
            message: "Contact your server hosting provider and ask for a UDP port to use Geyser. Set 'bedrock port' to the port provided."
        })
    },
    assignPort: {
        port_instruction: translate({
            id: 'providers.config.templates.assign_port',
            message: "Assign a UDP port in the server hosting providers panel, and set 'bedrock port' to it."
        })
    },
    allocatedPort: {
        port_instruction: translate({
            id: 'providers.config.templates.allocated_port',
            message: "Set 'bedrock port' to one of the ports allocated to you."
        })
    },
    cloneRemotePortOrSupport: {
        clone_remote_port: true,
        other_instruction: translate({
            id: 'providers.config.templates.alternative_support',
            message: "Alternatively to running Geyser on the same port as the Java server, contact the server hosting provider to get a custom port."
        })
    },
    cloneRemotePortOrCustom: {
        clone_remote_port: true,
        other_instructions: translate({
            id: 'providers.config.templates.alternative_allocation',
            message: "Alternatively to running Geyser on the same port as the Java server, you can create a port allocation."
        })
    },
    cloneRemotePortOrDedicatedIp: {
        clone_remote_port: true,
        other_instructions: translate({
            id: 'providers.config.templates.custom_port_dedicated_ip',
            message: "If you have a dedicated IP, you can contact the server hosting provider's support to use a custom port."
        })
    },
    javaAddress: {
        port: 19132,
        address_instructions: translate({
            id: 'providers.config.templates.java_address',
            message: "Set 'bedrock address' to the Java server's public address."
        })
    },
    javaIpAndPort: {
        clone_remote_port: true,
        address_instructions: translate({
            id: 'providers.config.templates.java_address'
        })
    }
}

const warnings = {
    ovhFirewallMisconfiguration: translate({
        id: 'providers.warnings.ovh_firewall_misconfig',
        message: "To fix random `Unable to Connect` issues, see [here](https://wiki.geysermc.org/geyser/port-forwarding/#ovh-and-soyoustart)."
    })
}

export const providersData: Providers = {
    built_in: [
        {
            name: 'Apex Hosting',
            url: 'https://apexminecrafthosting.com/',
            hosting_article: "https://apexminecrafthosting.com/geysermc/",
            hosting_support: "https://apexminecrafthosting.com/support/",
            connect_instructions: connectionTemplates.sameAsJava,
            custom_install_location: translate({
                id: 'providers.provider.apex_hosting.install',
                message: "Go to the Customizations tab in the panel and select 'Enabled' under the 'Geyser Auto Installer' option."
            })
        },
        {
            name: 'Arth Hosting',
            url: 'https://arthmc.xyz/',
            connect_instructions: connectionTemplates.asConfigured,
            custom_install_location: translate({
                id: 'providers.provider.arth_hosting.install',
                message: "Geyser is installed and configured on all servers by default. You can disable it in the 'Manage Plugins' menu."
            })
        },
        {
            name: 'Aternos',
            url: 'https://aternos.org/',
            connect_instructions: connectionTemplates.sameAsJava,
            hosting_article: "https://support.aternos.org/hc/en-us/articles/360051047631",
            hosting_support: "https://discord.aternos.org/",
            custom_install_location: translate({
                id: 'providers.provider.aternos.install',
                message: "Install Geyser in the Aternos plugin list."
            }),
            info: translate({
                id: 'providers.provider.aternos.info',
                message: "Aternos automatically installs the latest version of Geyser, but does not auto update it. To update, reinstall the plugin (no need to uninstall Geyser/deleting the plugin files)."
            })
        },
        {
            name: 'Cloud Nord',
            url: 'https://cloudnord.net/',
            connect_instructions: connectionTemplates.asConfigured,
            hosting_support: "https://cloudnord.net/submitticket.php",
            info: translate({
                id: 'providers.provider.cloud_nord.description',
                message: "Servers from the [Crossplay Server](https://cloudnord.net/minecraftcrossplay-server-hosting/) hosting section do not need further configuration."
            }),
            custom_install_location: translate({
                id: 'providers.provider.cloud_nord.install',
                message: "Install Geyser from the Plugins/Mods tab on the panel."
            }),
            config: {
                port_instruction: translate({
                    id: 'providers.provider.cloud_nord.port',
                    message: "Go to the Network tab on your server and generate a new port, or pick an existing unused one. Then, set 'bedrock port' to it."
                })
            }
        },
        {
            name: 'CreeperHost',
            url: 'https://www.creeperhost.net/',
            connect_instructions: "provided_by_host",
            custom_install_location: translate({
                id: 'providers.provider.creeperhost.install',
                message: "Has a toggle within the control panel to automatically enable Geyser."
            })
        },
        {
            name: 'Cubes Hosting',
            url: 'https://www.cubes.host/',
            connect_instructions: translate({
                id: 'providers.provider.cubes_hosting.connect',
                message: "Connect with the Java server IP and the port shown in the server console."
            }),
            custom_install_location: translate({
                id: 'providers.provider.cubes_hosting.install',
                message: "Install Geyser using the plugin manager. Then restart the server and Geyser will run on an additional port - you can check it in the server console."
            }),
            info: translate({
                id: 'providers.provider.cubes_hosting.info',
                message: "Geyser-Standalone can be set up through a support ticket."
            }),
        },
        {
            name: 'exaroton',
            url: 'https://exaroton.com/',
            hosting_article: "https://support.exaroton.com/hc/en-us/articles/360019857918-Geyser",
            connect_instructions: connectionTemplates.sameAsJava,
            custom_install_location: translate({
                id: 'providers.provider.exaroton.install',
                message: "Install Geyser in the exaroton plugin list."
            })
        },
        {
            name: 'GGServers',
            url: 'https://ggservers.com',
            connect_instructions: connectionTemplates.providedByHost,
            custom_install_location: translate({
                id: 'providers.provider.ggservers.install',
                message: "Can be installed to any server from their auto plugin setups."
            })
        },
        {
            name: 'Lilypad',
            url: 'https://lilypad.gg',
            hosting_article: "https://lilypad.gg/bedrock",
            connect_instructions: connectionTemplates.providedByHost,
            custom_install_location: translate({
                id: 'providers.provider.lilypad.install',
                message: "Tick the 'Enable Bedrock crossplay?' option when changing your server software to automatically install and configure Geyser + Floodgate."
            })
        },
        {
            name: 'MCServerHost',
            url: 'https://mcserverhost.com/',
            description: translate({
                id: 'providers.provider.mcserverhost.description',
                message: "Under the server configuration, select 'Crossplay' to automatically install Geyser and Floodgate. Join with the connection address. To update Geyser and Floodgate, replace the plugin jars in the server manager and restart the server."
            })
        },
        {
            name: 'Minefort',
            url: 'https://minefort.com/',
            connect_instructions: translate({
                id: 'providers.provider.minefort.connect_instructions',
                message: "Connect via `play.minefort.com` and join using `/server [servername]`, or connect directly via `[servername].minefort.com`."
            }),
            additional_step: translate({
                id: 'providers.provider.minefort.additional_step',
                message: "To allow Bedrock players, go to the server dashboard under 'Connect Support', and enable the 'Allow Bedrock' option."
            })
        },
        {
            name: 'Minehut',
            url: 'https://minehut.com/',
            connect_instructions: translate({
                id: 'providers.provider.minehut.connect_instructions',
                message: "Connect via `bedrock.minehut.com` and do `/join [servername]`, or connect directly via `[servername].bedrock.minehut.gg`."
            })
        },
        {
            name: 'Physgun',
            url: 'https://physgun.com/',
            config: configChangeTemplates.cloneRemotePort,
            connect_instructions: connectionTemplates.sameAsJava
        },
        {
            name: 'PiglinHost',
            url: 'https://piglinhost.com/',
            hosting_support: 'https://billing.piglinhost.com/submitticket.php?step=2&deptid=5',
            connect_instructions: connectionTemplates.providedByHost,
            config: {
              other_instructions: translate({
                  id: 'providers.provider.config.other',
                  message: "If you did not order the server from the [cross-platform servers page](https://piglinhost.com/minecraft-java-hosting.html), contact the support for help with Geyser setup."
              })
            }
        },
        {
            name: 'OMGServ',
            url: 'https://www.omgserv.com/en/',
            connect_instructions: connectionTemplates.providedByHost,
            custom_install_location: translate({
                id: 'providers.provider.omgserv.install',
                message: "Select Geyser in the [Install Menu](https://i.imgur.com/Gewpsrq.png), to automatically it. You can enable floodgate in the [server properties on the dashboard](https://i.imgur.com/jg5mzNj.png)."
            })
        },
        {
            name: 'Pufferfish Host',
            url: 'https://pufferfish.host/',
            connect_instructions: connectionTemplates.providedByHost,
            info: translate({
                id: 'providers.provider.pufferfish_host.info',
                message: "Geyser is installed and configured on all servers by default."
            })
        },
        {
            name: 'Server.pro (Gaming plans)',
            url: 'https://server.pro',
            config: {
                port_instruction: translate({
                    id: 'providers.provider.server_pro.port',
                    message: "Allocate a UDP port in the firewall tab, and set 'bedrock port' to it."
                })
            },
            connect_instructions: connectionTemplates.asConfigured
        },
        {
            name: 'Snakecraft Hosting',
            url: 'https://snakecrafthosting.com/',
            connect_instructions: connectionTemplates.sameAsJava,
            custom_install_location: translate({
                id: 'providers.provider.snakecraft_hosting.install',
                message: "Select 'Paper + Geyser with Floodgate' under the Jar Type at checkout to install the Geyser plugin."
            })
        },
        {
            name: 'SRKHOST',
            url: 'https://www.srkhost.eu/',
            connect_instructions: connectionTemplates.providedByHost,
            custom_install_location: translate({
                id: 'providers.provider.srkhost.install',
                message: "You can enable Geyser on the version changer page. Geyser will run on the given port by the host."
            })
        },
        {
            name: 'WiseHosting',
            url: 'https://wisehosting.com',
            hosting_article: 'https://help.wisehosting.com/en/articles/13-how-to-install-geysermc-java-bedrock-crossplay-to-your-server',
            connect_instructions: connectionTemplates.providedByHost,
            custom_install_location: translate({
                id: 'providers.provider.wisehosting.install',
                message: "For auto installation: Find the GeyserMC presets from the `Properties` tab in the Game Panel. There, click `Install` and restart your server."
            })
        },
        {
            name: 'ZapHosting',
            url: 'https://zap-hosting.com/en/',
            connect_instructions: connectionTemplates.sameAsJava,
            custom_install_location: translate({
                id: 'providers.provider.zaphosting.install',
                message: "Find the plugin in the control panel and restart your server."
            })
        }
    ],
    support: [
        {
            name: 'Akliz',
            url: 'https://www.akliz.net/',
            connect_instructions: connectionTemplates.asConfigured,
            config: configChangeTemplates.assignPort,
        },
        {
            name: 'Aquatis',
            url: 'https://aquatis.host/',
            connect_instructions: connectionTemplates.asConfigured,
            config: configChangeTemplates.contactHostForPort,
        },
        {
            name: 'BisectHosting',
            url: 'https://www.bisecthosting.com/',
            hosting_support: 'https://www.bisecthosting.com/clients/index.php?rp=/knowledgebase/193/How-to-install-Geyser-and-Floodgate-on-a-Minecraft-Java-server.html',
            connect_instructions: connectionTemplates.asConfigured,
            config: {
                port: 19132,
                address_instruction: translate({
                    id: 'providers.provider.bisecthosting.config.address',
                    message: "Set 'bedrock address' to the public IP of your server (e.g. `address: 51.79.129.18`)"
                })
            },
            additional_step: translate({
                id: 'providers.provider.additional_step',
                message: "Under the home tab, select 'Enable UDP Network' and restart the server."
            }),
            warn: translate({
                id: 'providers.provider.bisecthosting.info',
                message: "If you still cannot connect after following these instructions, contact Bisects support as they reportedly have UDP disabled on some nodes."
            }),
        },
        {
            name: 'Birdflop',
            url: 'https://birdflop.com/',
            connect_instructions: connectionTemplates.asConfigured,
            config: {
                port_instruction: translate({
                    id: 'providers.provider.birdflop.config.port',
                    message: "Open an allocation in the networks tab, and set 'bedrock address' to it."
                }),
                other_instructions: translate({
                    id: 'providers.provider.birdflop.other',
                    message: "If you have a dedicated IP, you can open a ticket to request allocation of the default Bedrock port (19132)"
                })
            }
        },
        {
            name: 'Bloom.Host',
            url: 'https://www.bloom.host/',
            hosting_article: 'https://docs.bloom.host/plugins/geysermc/',
            connect_instructions: connectionTemplates.bedrockPort,
            config: {
                other_instructions: translate({
                    id: 'providers.provider.bloom.other',
                    message: "Create the allocation for port 19132 in the 'port and proxies' tab on the panel."
                })
            }
        },
        {
            name: 'Clovux',
            url: 'https://clovux.net/',
            connect_instructions: connectionTemplates.bedrockPort,
            config: configChangeTemplates.javaAddress
        },
        {
            name: 'Consulhosting',
            url: 'https://consulhosting.nl/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'Craft-Hosting',
            url: 'https://craft-hosting.ru/',
            config: configChangeTemplates.cloneRemotePort,
            connect_instructions: connectionTemplates.sameAsJava,
            warn: translate({
                id: 'providers.provider.craft-hosting.description',
                message: "This provider appears to only provide service in Russia."
            })
        },
        {
            name: 'DedicatedMC',
            url: 'https://dedicatedmc.io/',
            hosting_article: 'https://docs.dedicatedmc.io/plugins-mods/how-to-install-geysermc/',
            config: configChangeTemplates.cloneRemotePortOrSupport,
            connect_instructions: connectionTemplates.sameAsJava
        },
        {
            name: 'ElfIDC',
            url: 'https://www.elfidc.com/',
            connect_instructions: connectionTemplates.sameAsJava,
            custom_install_location: translate({
                id: 'providers.provider.elfidc.custom',
                message: "When placing an order, choose Paper/Spigot + Geyser, which will automatically install the Geyser plugin."
            }),
            warn: translate({
                id: 'providers.provider.elfidc.warning',
                message: "This hosting provider only provides service in China."
            })
        },
        {
            name: 'EnviroMC',
            url: 'https://enviromc.host/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'ExtraVM',
            url: 'https://extravm.com/',
            connect_instructions: connectionTemplates.bedrockPort,
            config: configChangeTemplates.javaAddress,
        },
        {
            name: 'FadeHost',
            url: 'https://fadehost.com/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePortOrDedicatedIp,
        },
        {
            name: 'FakaHeda',
            url: 'https://fakaheda.eu/',
            connect_instructions: connectionTemplates.asConfigured,
            config: configChangeTemplates.cloneRemotePortOrCustom
        },
        {
            name: 'FalixNodes',
            url: 'https://falixnodes.net/',
            connect_instructions: connectionTemplates.asConfigured,
            config: {
                port_instruction: translate({
                    id: 'providers.provider.falixnodes.config.port',
                    message: "Open a port yourself on the network page in the game panel, then use that port in the bedrock section of the Geyser config."
                })
            }
        },
        {
            name: 'Ferox Hosting',
            url: 'https://feroxhosting.nl',
            hosting_article: "https://feroxhosting.nl/kb/",
            connect_instructions: connectionTemplates.asConfigured,
            config: configChangeTemplates.assignPort,
        },
        {
            name: 'Fluctis Hosting',
            url: 'https://fluctishosting.com',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'FREAKHOSTING',
            url: 'https://freakhosting.com/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'FreeMcServer.net',
            url: 'https://freemcserver.net',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'GameHosting.it',
            url: 'https://www.gamehosting.it/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'GameProHost',
            url: 'https://gameprohost.com/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'GPortal',
            url: 'https://www.g-portal.com/',
            config: {
                port_instruction: translate({
                    id: 'providers.provider.gportal.description',
                    message: "You have to adjust the port according to your query port. Scheme: Query port: xxx65. The ports from xxx66 to xxx70 are available. For example, if your query port is 12365, then Geyser can only run under the port range 12366-12370."
                }),
                address_instruction: translate({
                    id: 'providers.provider.gportal.description',
                    message: "Set 'bedrock address' to the Java server IP."
                })
            },
            connect_instructions: connectionTemplates.asConfigured
        },
        {
            name: 'Heavynode',
            url: 'https://www.heavynode.com/',
            connect_instructions: connectionTemplates.asConfigured,
            config: {
                port_instruction: translate({
                    id: "providers.provider.heavynode.config.port",
                    message: "Open a port yourself in the networking section of the control panel."
                })
            },
            info: translate({
                id: 'providers.provider.heavynode.info',
                message: "The default bedrock port `19132` is available with a dedicated IP (contact support)."
            }),
            warn: translate({
                id: "providers.provider.heavynode.warn",
                message: "To resolve further connection issues for servers located in Canada and the UK, contact their support with the info found [here](https://wiki.geysermc.org/geyser/port-forwarding/#ovh-and-soyoustart)."
            })
        },
        {
            name: 'Hicoria',
            url: 'https://hicoria.com/en/',
            config: configChangeTemplates.allocatedPort,
            connect_instructions: connectionTemplates.asConfigured
        },
        {
            name: 'Hosterfy',
            url: 'https://www.hosterfy.com/',
            config: configChangeTemplates.cloneRemotePortOrSupport,
            connect_instructions: connectionTemplates.sameAsJava,
        },
        {
            name: 'HostEZ',
            url: 'https://hostez.io/minecraft',
            config: {
                port_instruction: translate({
                    id: 'providers.provider.hostez.config.port',
                    message: "Add 1 to the port you were assigned (e.g. 25565 -> 25566), and set that as the 'bedrock port' in the config."
                }),
                other_instructions: translate({
                    id: 'providers.provider.hostez.config.other',
                    message: "Different ports can be set in the Allocations tab. Premium products with a dedicated IP can use the default port (19132)."
                })
            },
            connect_instructions: connectionTemplates.asConfigured,
            info: translate({
                id: 'providers.provider.hostez.info',
                message: "Most MC plans also include UDP DDoS protection, which can be used with Geyser."
            })
        },
        {
            name: 'Host Havoc',
            url: 'https://hosthavoc.com/minecraft',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'Hosting-Minecraft',
            url: 'https://hosting-minecraft.pro/',
            config: {
                port_instruction: translate({
                  id: 'providers.provider.hosting-minecraft.config.port',
                  message: "Create a new port in the \"Allocations\" tab and set 'bedrock port' to that port."
              })
            },
            connect_instructions: connectionTemplates.asConfigured
        },
        {
            name: 'HumbleServers',
            url: 'https://humbleservers.com/',
            config: {
                clone_remote_port: true,
                other_instructions: translate({
                    id: 'providers.provider.humbleservers.config.other',
                    message: "Alternatively to using the Java server port, use one of the two extra ports."
                })
            },
            connect_instructions: translate({
                id: 'providers.provider.humbleservers.connect',
                message: "Connect with the Java server IP and Java server port. If the subdomain doesn't work, use your regular numbered IP address."
            })
        },
        {
            name: 'KeKsHost',
            url: 'https://kekshost.com/en/',
            connect_instructions: connectionTemplates.bedrockPort,
        },
        {
            name: 'Kinetic Hosting',
            url: 'https://kinetichosting.net/',
            hosting_article: 'https://www.kinetichosting.net/articles/minecraft-java/plugins/geyser',
            config: {
                clone_remote_port: true,
                other_instructions: translate({
                    id: 'providers.provider.config.other',
                    message: "Alternatively to using the Java server port, open a port in the Network and Ports page, and set that port as the `bedrock port` in the Geyser config."
                })
            },
            connect_instructions: connectionTemplates.asConfigured
        },
        {
            name: 'MC-HOST24.de',
            url: 'https://mc-host24.de/',
            config: configChangeTemplates.javaIpAndPort,
            connect_instructions: connectionTemplates.sameAsJava
        },
        {
            name: 'MCPEhost.ru',
            url: 'https://mcpehost.ru',
            connect_instructions: connectionTemplates.asConfigured,
            config: {
                port_instruction: translate({
                    id: 'providers.provider.mcpehost_ru.config.port',
                    message: "Create an additional port in the server settings and enable UDP protocol, then use that as the `bedrock port`."
                })
            }
        },
        {
            name: 'Meloncube',
            url: 'https://www.meloncube.net/',
            connect_instructions: connectionTemplates.providedByHost,
            config: configChangeTemplates.contactHostForPort,
        },
        {
            name: 'MineStrator',
            url: 'https://minestrator.com/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'Minecraft-Hosting.pro',
            url: 'https://www.minecraft-hosting.pro/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'Netbela',
            url: 'https://netbela.nl/store/minecraft',
            config: configChangeTemplates.cloneRemotePort,
            connect_instructions: connectionTemplates.sameAsJava,
            custom_install_location: translate({
                id: 'providers.provider.netbela.custom_install_location',
                message: "Install Geyser with the dedicated Plugin installer."
            })
        },
        {
            name: 'NFOservers',
            url: 'https://nfoservers.com/',
            config: configChangeTemplates.javaAddress,
            connect_instructions: connectionTemplates.bedrockPort,
            info: translate({
                id: 'providers.provider.nfoservers.info',
                message: "You can also run Geyser-Standalone separately on an Unmanaged VDS."
            })
        },
        {
            name: 'Nitrado',
            url: 'https://nitrado.net',
            hosting_article: 'https://wiki.nitrado.net/en/How_to_install_GeyserMC_and_Floodgate',
            connect_instructions: connectionTemplates.asConfigured,
            config: {
                port_instruction: translate({
                    id: 'providers.provider.nitrado.config.port',
                    message: "Get Geyser as a plugin. Add 4 to the Port of the Java server."
                })
            }
        },
        {
            name: 'Nodecraft',
            url: 'https://nodecraft.com',
            config: {
                port: 25565
            },
            connect_instructions: connectionTemplates.sameAsJava
        },
        {
            name: 'PaperNodes',
            url: 'https://papernodes.com/',
            config: configChangeTemplates.cloneRemotePortOrSupport,
            connect_instructions: connectionTemplates.sameAsJava,
        },
        {
            name: 'Pebblehost',
            url: 'https://pebblehost.com/',
            hosting_article: 'https://youtu.be/v9lC80UBZF4',
            config: configChangeTemplates.cloneRemotePort,
            connect_instructions: connectionTemplates.sameAsJava
        },
        {
            name: 'PlanetNode',
            url: 'https://planetnode.net',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'PUBCS',
            url: 'https://pubcs.com',
            config: configChangeTemplates.cloneRemotePortOrDedicatedIp,
            connect_instructions: connectionTemplates.sameAsJava,
        },
        {
            name: 'RamShard',
            url: 'https://ramshard.com/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'Redline Hosting',
            url: 'https://redlinehosting.net/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'Revivenode',
            url: 'https://revivenode.com/',
            config: {
                clone_remote_port: true,
                other_instructions: translate({
                    id: 'providers.provider.revivenode.config.other',
                    message: "You can also create a secondary port in the `network tab` and use that as the `bedrock port`."
                })
            },
            connect_instructions: connectionTemplates.sameAsJava,
            warn: warnings.ovhFirewallMisconfiguration
        },
        {
            name: 'ScalaCube',
            url: 'https://scalacube.com/',
            config: configChangeTemplates.javaIpAndPort,
            connect_instructions: connectionTemplates.sameAsJava
        },
        {
            name: 'Shockbyte',
            url: 'https://shockbyte.com/',
            hosting_article: 'https://shockbyte.com/billing/knowledgebase/173/Introduction-to-GeyserMCorDragonProxy-How-GeyserMC-Works.html',
            connect_instructions: connectionTemplates.sameAsJava,
        },
        {
            name: 'Skynode.pro',
            url: 'https://skynode.pro/',
            connect_instructions: connectionTemplates.asConfigured,
            config: {
                port_instruction: translate({
                    id: 'providers.provider.skynode.pro.config.port',
                    message: "Go to 'Server Details', add a new port, and set the `bedrock port` in your config to that port."
                })
            }
        },
        {
            name: 'Sparked Host',
            url: 'https://sparkedhost.com',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'STIPE',
            url: 'https://stipe.com.au/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort,
            info: translate({
                id: 'providers.provider.stipe.info',
                message: "This provider only provides service in Australia."
            })

        },
        {
            name: 'SyntexHosting',
            url: 'https://syntexhosting.com/',
            config: configChangeTemplates.cloneRemotePortOrSupport,
            connect_instructions: connectionTemplates.sameAsJava,
        },
        {
            name: 'The Minecraft Hosting',
            url: 'https://theminecrafthosting.com/',
            config: configChangeTemplates.cloneRemotePort,
            connect_instructions: connectionTemplates.sameAsJava
        },
        {
            name: 'TNAHosting',
            url: 'https://tnahosting.net/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'TurboHost',
            url: 'https://turbohost.nl/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'UltimateSRV',
            url: 'https://ultimatesrv.com/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'VexyHost',
            url: 'https://vexyhost.com/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'Volcano Hosting',
            url: 'https://www.volcanohosting.net/',
            connect_instructions: connectionTemplates.sameAsJava,
            config: configChangeTemplates.cloneRemotePort
        },
        {
            name: 'VoltHosting',
            url: 'https://www.volthosting.co.uk/',
            hosting_support: 'https://volthosting.co.uk/contact.html',
            config: {
                clone_remote_port: true,
                other_instructions: translate({
                    id: 'providers.provider.volthosting.config.other',
                    message: "Alternatively, request an additional port, or buy a dedicated IP address."
                })
            },
            connect_instructions: connectionTemplates.asConfigured,
        },
        {
            name: 'Vultam',
            url: 'https://vultam.net/',
            hosting_support: 'https://clients.vultam.net/submitticket.php?step=2&deptid=1',
            connect_instructions: connectionTemplates.asConfigured,
            config: {
                clone_remote_port: true,
                other_instructions: translate({
                    id: 'providers.provider.vultam.config.other',
                    message: "Alternatively, allocate a port to your server in the Network section of the control panel. Set that as the `bedrock port` in the Geyser config."
                })
            }
        },
        {
            name: 'Wasabi Hosting',
            url: 'https://wasabihosting.com',
            custom_install_location: translate({
                id: 'providers.provider.wasabihosting.description',
                message: "Install Geyser with the plugin installer."
            }),
            config: configChangeTemplates.cloneRemotePort,
            connect_instructions: connectionTemplates.sameAsJava
        },
        {
            name: "Wepwawet",
            url: "https://wepwawet.net/",
            connect_instructions: connectionTemplates.asConfigured,
            config: {
                other_instructions: translate({
                    id: 'providers.provider.wepwawet.config.other',
                    message: "Add a new port in the Network tab. Use this new port as the bedrock port."
                })
            }
        },
        {
            name: 'WinterNode',
            url: 'https://winternode.com',
            config: {
                clone_remote_port: true,
                other_instructions: translate({
                    id: 'providers.provider.winternode.config.other',
                    message: "Alternatively, request an additional port, or buy a dedicated IP address."
                })
            },
            connect_instructions: connectionTemplates.sameAsJava,
        },
        {
            name: 'WitherHosting',
            url: 'https://witherhosting.com/',
            hosting_article: 'https://support.witherhosting.com/en/article/how-to-install-and-use-geysermc-1xn5l6v',
            connect_instructions: connectionTemplates.asConfigured,
            config: {
              other_instructions: translate({
                  id: 'providers.provider.witherhosting.config.other',
                  message: "Either use the Java server's port, or create a port in the ports manager on the panel and use that for Bedrock."
              })
            }
        }
    ],
    no_support: [
        {
            name: 'MyArena',
            url: 'https://www.myarena.ru/',
            connect_instructions: null,
            warn: translate({
                id: 'providers.provider.myarena.description',
                message: "Does seem to be working, but the Java version is too old in order for Geyser to run properly."
            })
        },
        {
            name: 'NiCraft',
            url: 'https://www.ni-host.com/',
            connect_instructions: null,
            warn: translate({
                id: 'providers.provider.nicraft.description',
                message: "Does not provide Bedrock support, and are affected by a [firewall configuration issue](https://wiki.geysermc.org/geyser/port-forwarding/#ovh-and-soyoustart), which prohibits most players from joining."
            })
        },
        {
            name: 'Feather',
            url: 'https://feathermc.com/',
            connect_instructions: null,
            warn: translate({
                id: 'providers.provider.feather.description',
                message: "Their proxy network does not support UDP. Therefore, Geyser is not supported. As an alternative, set up a paper server with e.g. playit.gg instead of port forwarding."
            })
        }
    ]
}
