import { translate } from "@docusaurus/Translate"
import { Providers } from "../types/providers"

// Do not modify the structure of this file without updating the extraction logic in create-providers-json.ts

const descriptionTemplates = {
    default: translate({
        id: 'providers.templates.default',
        message: "Enable `clone-remote-port` (or manually set `bedrock port` to the Java port), and connect with the Java IP and port."
    }),
    ipAndPort: translate({
        id: 'providers.templates.ip_and_port',
        message: "Enable `clone-remote-port` (or manually set `bedrock port` to the Java port), uncomment `bedrock address`, and change `0.0.0.0` to your Java server's IP. Connect with the Java IP and port."
    }),
    forwardingOption: translate({
        id: 'providers.templates.forwarding_option',
        message: "Offers a working port forwarding option."
    }),
    javaIp: translate({
        id: 'providers.templates.java_ip',
        message: "Make sure your remote address is 'auto', uncomment `bedrock address`, and change `0.0.0.0` to your Java server's IP."
    })
}

export const providersData: Providers = {
    built_in: [
        {
            name: 'Apex Hosting',
            url: 'https://apexminecrafthosting.com/',
            description: translate({
                id: 'providers.provider.apex_hosting.description',
                message: "Full auto installation. Go to the Customizations tab in the panel and select 'Enabled' under the 'Geyser Auto Installer' option. Then, restart and connect to your server with your Java IP and port. See [Apex's article](https://apexminecrafthosting.com/geysermc/) for more details."
            })
        },
        {
            name: 'Arth Hosting',
            url: 'https://arthmc.xyz/',
            description: translate({
                id: 'providers.provider.arth_hosting.description',
                message: "Geyser is installed and configured on all servers by default. You can disable it in the 'Manage Plugins' menu."
            })
        },
        {
            name: 'Aternos',
            url: 'https://aternos.org/',
            description: translate({
                id: 'providers.provider.aternos.description',
                message: "Install Geyser in the Aternos plugin list and connect to your server with your Java IP and port. See [Aternos's article](https://support.aternos.org/hc/en-us/articles/360051047631) for more details. Do note: Aternos automatically installs the latest version of the plugin, but does not auto update it. To update Geyser on Aternos, simply reinstall the plugin (no need to uninstall the plugin/deleting the plugin files)."
            })
        },
        {
            name: 'AxentHost',
            url: 'https://axenthost.com/',
            description: translate({
                id: 'providers.provider.axenthost.description',
                message: "Navigate to the server Variants tab and select GeyserMC. By default, vanilla Minecraft servers are created, so removing the server files in the Files tab before switching variant will be required to make a clean installation of Geyser. This happens since the reinstallation is a soft reinstall and the process doesn't remove the old server files coming from the vanilla variant."
            })
        },
        {
            name: 'Cloud Nord',
            url: 'https://cloudnord.net/',
            description: translate({
                id: 'providers.provider.cloud_nord.description',
                message: "Go to their [Crossplay Server](https://cloudnord.net/minecraftcrossplay-server-hosting/) hosting section and order your server. Instructions on how to join are provided."
            })
        },
        {
            name: 'CreeperHost',
            url: 'https://www.creeperhost.net/',
            description: translate({
                id: 'providers.provider.creeperhost.description',
                message: "Has a toggle within the control panel to automatically enable Geyser. May not be enabled by default, so you may need to toggle it and restart the server."
            })
        },
        {
            name: 'Cubes Hosting',
            url: 'https://www.cubes.host/',
            description: translate({
                id: 'providers.provider.cubes_hosting.description',
                message: "Install Geyser using the plugin manager. Then restart the server and Geyser will run on an additional port - you can check it in the server console. Geyser-Standalone can be set up through a support ticket."
            })
        },
        {
            name: 'exaroton',
            url: 'https://exaroton.com/',
            description: translate({
                id: 'providers.provider.exaroton.description',
                message: "Install Geyser in the exaroton plugin list and connect to your server with your Java IP and port. See [exaroton's article](https://support.exaroton.com/hc/en-us/articles/360019857918-Geyser) for more details."
            })
        },
        {
            name: 'GGServers',
            url: 'https://ggservers.com',
            description: translate({
                id: 'providers.provider.ggservers.description',
                message: "Can be installed to any server from their auto plugin setups. No further configuration needed."
            })
        },
        {
            name: 'Lilypad',
            url: 'https://lilypad.gg',
            description: translate({
                id: 'providers.provider.lilypad.description',
                message: "Tick the 'Enable Bedrock crossplay?' option when changing your server software to automatically install and configure Geyser + Floodgate. For more details, navigate to [lilypad.gg/bedrock](https://lilypad.gg/bedrock)."
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
            description: translate({
                id: 'providers.provider.minefort.description',
                message: "On the server dashboard under 'Connect Support', make sure 'Allow Bedrock' is enabled. Then connect via `play.minefort.com` and join using `/server [servername]`, or connect via `[servername].minefort.com`."
            })
        },
        {
            name: 'Minehut',
            url: 'https://minehut.com/',
            description: translate({
                id: 'providers.provider.minehut.description',
                message: "Connect via `bedrock.minehut.com` and do `/join [servername]`, or connect directly via `[servername].bedrock.minehut.gg`."
            })
        },
        {
            name: 'Physgun',
            url: 'https://physgun.com/',
            description: descriptionTemplates.default
        },
        {
            name: 'PiglinHost',
            url: 'https://piglinhost.com/',
            description: translate({
                id: 'providers.provider.piglinhost.description',
                message: "Order from the [cross-platform servers page](https://piglinhost.com/minecraft-java-hosting.html). Alternatively, contact their support by creating a [support ticket](https://billing.piglinhost.com/submitticket.php?step=2&deptid=5) or via discord for installation and configuration help."
            })
        },
        {
            name: 'OMGServ',
            url: 'https://www.omgserv.com/en/',
            description: translate({
                id: 'providers.provider.omgserv.description',
                message: "Select Geyser in the [Install Menu](https://i.imgur.com/Gewpsrq.png), it will be automatically installed. You can enable floodgate in the [server properties on the dashboard](https://i.imgur.com/jg5mzNj.png)."
            })
        },
        {
            name: 'Pufferfish Host',
            url: 'https://pufferfish.host/',
            description: translate({
                id: 'providers.provider.pufferfish_host.description',
                message: "Geyser is installed and configured on all servers by default."
            })
        },
        {
            name: 'Server.pro',
            url: 'https://server.pro',
            description: translate({
                id: 'providers.provider.server.pro.description',
                message: "Different instructions for different plans: On VPS, select Geyser in the [Service Type Menu](https://i.imgur.com/loSNmvu.png), Floodgate can be enabled on the dashboard configuration. For manual installation: Using a Premium or Free plan, use the same port as your Java server for the Bedrock port in the configuration file and connect that; for the Free plan, also enable the `clone-remote-port` option. If you are using a PRO or a VPS plan, you can use any port, which can be opened on the Firewall tab."
            })
        },
        {
            name: 'Snakecraft Hosting',
            url: 'https://snakecrafthosting.com/',
            description: translate({
                id: 'providers.provider.snakecraft_hosting.description',
                message: "Select 'Paper + Geyser with Floodgate' under the Jar Type at checkout to install the Geyser plugin. Players will Connect with the same IP and port as you would on Java."
            })
        },
        {
            name: 'SRKHOST',
            url: 'https://www.srkhost.eu/',
            description: translate({
                id: 'providers.provider.srkhost.description',
                message: "You can enable Geyser on the version changer page. Geyser will run on the given port by the host."
            })
        },
        {
            name: 'Virtual Gladiators',
            url: 'https://virtualgladiators.com/',
            description: translate({
                id: 'providers.provider.virtual_gladiators.description',
                message: "Find the plugin in the control panel under the 'VG Recommended' category and restart your server. IP and port are the same as Java."
            })
        },
        {
            name: 'WiseHosting',
            url: 'https://wisehosting.com',
            description: translate({
                id: 'providers.provider.wisehosting.description',
                message: "Both auto and manual installation available. Find the GeyserMC presets from the `Properties` tab in the Game Panel. There, click `Install` and restart your server. See [Crossplay FAQ](https://help.wisehosting.com/en/articles/13-how-to-install-geysermc-java-bedrock-crossplay-to-your-server) for additional details."
            })
        },
        {
            name: 'ZapHosting',
            url: 'https://zap-hosting.com/en/',
            description: translate({
                id: 'providers.provider.zaphosting.description',
                message: "Find the plugin in the control panel and restart your server. IP and port are the same as Java."
            })
        },
        {
            name: '365Hosts',
            url: 'https://365hosts.com',
            description: translate({
                id: 'providers.provider.365hosts.description',
                message: "Go to their [Minecraft: Crossplay](https://www.365hosts.com/gaming/crossplayminecraft) hosting section and order your server. Instructions on how to join are provided."
            })
        }
    ],
    support: [
        {
            name: 'Akliz',
            url: 'https://www.akliz.net/',
            description: descriptionTemplates.forwardingOption
        },
        {
            name: 'Aquatis',
            url: 'https://aquatis.host/',
            description: translate({
                id: 'providers.provider.aquatis.description',
                message: "Need to open a support ticket to get a UDP port, then use that as the `bedrock port`."
            })
        },
        {
            name: 'BisectHosting',
            url: 'https://www.bisecthosting.com/',
            description: translate({
                id: 'providers.provider.bisecthosting.description',
                message: "You must have a plan with a dedicated IP. In Geyser's config, uncomment the `bedrock address` and set it to the public IP of your server (e.g. `address: 51.79.129.18`). Leave the port as `19132`. Under the home tab, select 'Enable UDP Network' and restart the server. See Bisect's [article](https://www.bisecthosting.com/clients/index.php?rp=/knowledgebase/193/How-to-install-Geyser-and-Floodgate-on-a-Minecraft-Java-server.html) for full instructions. If you still cannot connect after following these instructions, contact Bisect Support as they reportedly have UDP disabled on some nodes."
            })
        },
        {
            name: 'Birdflop',
            url: 'https://birdflop.com/',
            description: translate({
                id: 'providers.provider.birdflop.description',
                message: "Open an allocation in the networks tab. If you have a dedicated IP, you can open a ticket to request allocation of the default Bedrock port (19132). Update the config to use the allocated port and restart the server."
            })
        },
        {
            name: 'Bloom.Host',
            url: 'https://www.bloom.host/',
            description: translate({
                id: 'providers.provider.bloomhost.description',
                message: "See [Bloom's documentation](https://docs.bloom.host/plugins/geysermc/) for setup instructions."
            })
        },
        {
            name: 'Clovux',
            url: 'https://clovux.net/',
            description: descriptionTemplates.javaIp
        },
        {
            name: 'Consulhosting',
            url: 'https://consulhosting.nl/',
            description: descriptionTemplates.default
        },
        {
            name: 'Craft-Hosting',
            url: 'https://craft-hosting.ru/',
            description: translate({
                id: 'providers.provider.craft-hosting.description',
                message: "Set the Bedrock port to the Java server's port and connect with that port; note that this provider appears to only provide service in Russia."
            })
        },
        {
            name: 'DedicatedMC',
            url: 'https://dedicatedmc.io/',
            description: translate({
                id: 'providers.provider.dedicatedmc.description',
                message: "Check [DedicatedMC's documentation](https://docs.dedicatedmc.io/plugins-mods/how-to-install-geysermc/) for specific instructions."
            })
        },
        {
            name: 'ElfIDC',
            url: 'https://www.elfidc.com/',
            description: translate({
                id: 'providers.provider.elfidc.description',
                message: "When placing an order, choose Paper/Spigot + Geyser, which will automatically install the Geyser plugin. Connect with the Java server's IP and port. Note: This provider only provides service in China."
            })
        },
        {
            name: 'EnviroMC',
            url: 'https://enviromc.host/',
            description: descriptionTemplates.default
        },
        {
            name: 'ExtraVM',
            url: 'https://extravm.com/',
            description: descriptionTemplates.javaIp
        },
        {
            name: 'FadeHost',
            url: 'https://fadehost.com/',
            description: translate({
                id: 'providers.provider.fadehost.description',
                message: "Set the Bedrock port to the Java server's port and connect with that port. Alternatively, buy a dedicated IP address to support a different port."
            })
        },
        {
            name: 'FakaHeda',
            url: 'https://fakaheda.eu/',
            description: translate({
                id: 'providers.provider.fakaheda.description',
                message: "Set the `bedrock port` in the config to the Java server's port or use one of the available ports allocated to your server, and connect with that port."
            })
        },
        {
            name: 'FalixNodes',
            url: 'https://falixnodes.net/',
            description: translate({
                id: 'providers.provider.falixnodes.description',
                message: "Open a port yourself on the network page in the game panel, then use that port in the bedrock section of the Geyser config."
            })
        },
        {
            name: 'Ferox Hosting',
            url: 'https://feroxhosting.nl',
            description: translate({
                id: 'providers.provider.ferox_hosting.description',
                message: "Open a port yourself in their panel and check out the [knowledgebase article](https://feroxhosting.nl/kb/) for how to install and configure Geyser."
            })
        },
        {
            name: 'Fluctis Hosting',
            url: 'https://fluctishosting.com',
            description: descriptionTemplates.default
        },
        {
            name: 'FREAKHOSTING',
            url: 'https://freakhosting.com/',
            description: descriptionTemplates.default
        },
        {
            name: 'FreeMcServer.net',
            url: 'https://freemcserver.net',
            description: descriptionTemplates.default
        },
        {
            name: 'Fusion Hosting',
            url: 'https://fusionhostingltd.co.uk',
            description: translate({
                id: 'providers.provider.fusion_hosting.description',
                message: "Get Geyser as a plugin. Use the same port as your Java server for the Bedrock port in your config (either by setting it yourself, or enabling “clone-remote-port”) and connect with the same IP and port as you would on Java or create a port in the Network tab on the panel & use this for Geyser."
            })
        },
        {
            name: 'GameHosting.it',
            url: 'https://www.gamehosting.it/',
            description: descriptionTemplates.default
        },
        {
            name: 'GameProHost',
            url: 'https://gameprohost.com/',
            description: descriptionTemplates.default
        },
        {
            name: 'GPortal',
            url: 'https://www.g-portal.com/',
            description: translate({
                id: 'providers.provider.gportal.description',
                message: "You have to adjust the port according to your query port. Scheme: Query port: xxx65. The ports from xxx66 to xxx70 are available. For example, if your query port is 12365, then Geyser can only run under the port range 12366-12370. Furthermore, you have to change the 'Bedrock' 'address' in the Geyser config to your IP address. You can find it above your query port. Don't forget to delete the # in front of `address'."
            })
        },
        {
            name: 'Heavynode',
            url: 'https://www.heavynode.com/',
            description: translate({
                id: 'providers.provider.heavynode.description',
                message: "Open a port yourself in the networking section of the control panel. Port `19132` is only available with a dedicated IP (contact support), otherwise you will need to use a randomly assigned port. To resolve further connection issues for servers located in Canada and the UK, contact their support with the info found [here](https://wiki.geysermc.org/geyser/port-forwarding/#ovh-and-soyoustart)."
            })
        },
        {
            name: 'Hicoria',
            url: 'https://hicoria.com/en/',
            description: translate({
                id: 'providers.provider.hicoria.description',
                message: "Use one of the available ports allocated for your server for the Bedrock port in your config and connect with that port."
            })
        },
        {
            name: 'Hosterfy',
            url: 'https://www.hosterfy.com/',
            description: translate({
                id: 'providers.provider.hosterfy.description',
                message: "Use the same port as your Java server for the Bedrock port in your config (either by setting it yourself, or enabling `clone-remote-port`) and connect with the same IP and port as you would on Java. You can also ask for a new port."
            })
        },
        {
            name: 'HostEZ',
            url: 'https://hostez.io/minecraft',
            description: translate({
                id: 'providers.provider.hostez.description',
                message: "Geyser plugin supported with self-install or installed on request with its own port."
            })
        },
        {
            name: 'Host Havoc',
            url: 'https://hosthavoc.com/minecraft',
            description: descriptionTemplates.default
        },
        {
            name: 'Hosting-Minecraft',
            url: 'https://hosting-minecraft.pro/',
            description: translate({
                id: 'providers.provider.hosting-minecraft.description',
                message: 'Create a new port in the "Allocations" tab and use that port in the config.'
            })
        },
        {
            name: 'HumbleServers',
            url: 'https://humbleservers.com/',
            description: translate({
                id: 'providers.provider.humbleservers.description',
                message: "Set the Bedrock port to the Java server's port, or to one of the two extra ports, and connect with that port. If the subdomain doesn't work, use your regular numbered IP address."
            })
        },
        {
            name: 'KeKsHost',
            url: 'https://kekshost.com/en/',
            description: translate({
                id: 'providers.provider.kekshost.description',
                message: "Use the default bedrock port (19132) and the server ip to connect on Bedrock edition. No changes to the Geyser config are needed. You can also ask for a new port and use it instead."
            })
        },
        {
            name: 'Kinetic Hosting',
            url: 'https://kinetichosting.net/',
            description: translate({
                id: 'providers.provider.kinetic_hosting.description',
                message: "Open a port in the Network and Ports page, and set that port as the `bedrock port` in the Geyser config. Alternatively, use the Java server's port by enabling the `clone-remote-port` option in the config. Connect with the same IP as on Java, and the port that you have chosen. For more info see the hosts [support article](https://www.kinetichosting.net/articles/minecraft-java/plugins/geyser)."
            })
        },
        {
            name: 'MC-HOST24.de',
            url: 'https://mc-host24.de/',
            description: descriptionTemplates.ipAndPort
        },
        {
            name: 'MCFORFREE.DE',
            url: 'https://mcforfree.de/',
            description: translate({
                id: 'providers.provider.mcforfree.de.description',
                message: 'Create an extra port in the game panel, then change the `port` in the `bedrock` section to the newly created port. To connect on Bedrock edition, use the Java server\'s IP and the port you\'ve created. It may take a few minutes for the port to become active.'
            })
        },
        {
            name: 'MCPEhost.ru',
            url: 'https://mcpehost.ru',
            description: translate({
                id: 'providers.provider.mcpehost.ru.description',
                message: "Create an additional port in the server settings and enable UDP protocol, then use that as the `bedrock port` in the config. Connect with the Java IP and that new port."
            })
        },
        {
            name: 'Meloncube',
            url: 'https://www.meloncube.net/',
            description: translate({
                id: 'providers.provider.meloncube.description',
                message: "Contact the support for a UDP port to use for Geyser. Set that port as the `bedrock port`, and connect with it."
            })
        },
        {
            name: 'MineStrator',
            url: 'https://minestrator.com/',
            description: descriptionTemplates.default
        },
        {
            name: 'Minecraft-Hosting.pro',
            url: 'https://www.minecraft-hosting.pro/',
            description: descriptionTemplates.default
        },
        {
            name: 'Netbela',
            url: 'https://netbela.nl/store/minecraft',
            description: translate({
                id: 'providers.provider.netbela.description',
                message: "Install Geyser with the dedicated Plugin installer. Use the same port as your Java server in your config. Connect with the same address and port as your Java server."
            })
        },
        {
            name: 'NFOservers',
            url: 'https://nfoservers.com/',
            description: translate({
                id: 'providers.provider.nfoservers.description',
                message: "Uncomment and set `bedrock address` to the server IP in the Geyser config file. As an alternative, you can run Geyser standalone separately on an Unmanaged VDS."
            })
        },
        {
            name: 'Nitrado',
            url: 'https://nitrado.net',
            description: translate({
                id: 'providers.provider.nitrado.description',
                message: "Get Geyser as a plugin. Add 4 to the Port of the Java server. See [here](https://wiki.nitrado.net/en/How_to_install_GeyserMC_and_Floodgate) for specific instructions."
            })
        },
        {
            name: 'Nodecraft',
            url: 'https://nodecraft.com',
            description: translate({
                id: 'providers.provider.nodecraft.description',
                message: "Use the default server port and `0.0.0.0` or your server IP as the host address."
            })
        },
        {
            name: 'PaperNodes',
            url: 'https://papernodes.com/',
            description: translate({
                id: 'providers.provider.papernodes.description',
                message: 'Enable clone-remote-port (or manually set the Bedrock port to the Java port), and connect with the Java IP and port. Alternatively, you can contact the host to request an additional port or a dedicated IP.'
            })
        },
        {
            name: 'Pebblehost',
            url: 'https://pebblehost.com/',
            description: translate({
                id: 'providers.provider.pebblehost.description',
                message: "Enable `clone-remote-port` (or manually set `bedrock port` to the Java port), and connect with the Java IP and port. See [this video](https://youtu.be/v9lC80UBZF4) for a PebbleHost-specific tutorial."
            })
        },
        {
            name: 'PlanetNode',
            url: 'https://planetnode.net',
            description: descriptionTemplates.default
        },
        {
            name: 'PUBCS',
            url: 'https://pubcs.com',
            description: translate({
                id: 'providers.provider.pubcs.description',
                message: "Set the Bedrock port to the Java server's port and connect with that port, or upgrade to a plan that includes dedicated IP address to support a different port."
            })
        },
        {
            name: 'RamShard',
            url: 'https://ramshard.com/',
            description: descriptionTemplates.default
        },
        {
            name: 'Redline Hosting',
            url: 'https://redlinehosting.net/',
            description: descriptionTemplates.default
        },
        {
            name: 'Revivenode',
            url: 'https://revivenode.com/',
            description: translate({
                id: 'providers.provider.revivenode.description',
                message: "Set `bedrock port` to the Java server's port (either by setting it yourself, or enabling `clone-remote-port`). You can also create a secondary port in the `network tab` and use that. To fix random `Unable to Connect` issues, see [here](https://wiki.geysermc.org/geyser/port-forwarding/#ovh-and-soyoustart)."
            })
        },
        {
            name: 'ScalaCube',
            url: 'https://scalacube.com/',
            description: descriptionTemplates.ipAndPort
        },
        {
            name: 'Shockbyte',
            url: 'https://shockbyte.com/',
            description: translate({
                id: 'providers.provider.shockbyte.description',
                message: "The port will be automatically set after you download Geyser and restart the server. Connect with the same IP and port as on Java. For Geyser Standalone installation instructions, see [here](https://shockbyte.com/billing/knowledgebase/173/Introduction-to-GeyserMCorDragonProxy-How-GeyserMC-Works.html)."
            })
        },
        {
            name: 'Skynode.pro',
            url: 'https://skynode.pro/',
            description: translate({
                id: 'providers.provider.skynode.pro.description',
                message: "Go to 'Server Details', add a new port, and set the `bedrock port` in your config to that port. Connect with it and the Java server's address."
            })
        },
        {
            name: 'Sparked Host',
            url: 'https://sparkedhost.com',
            description: descriptionTemplates.default
        },
        {
            name: 'STIPE',
            url: 'https://stipe.com.au/',
            description: translate({
                id: 'providers.provider.stipe.description',
                message: "Set the Bedrock port to the Java server's port and connect with that port; note that this provider only provides service in Australia."
            })
        },
        {
            name: 'SyntexHosting',
            url: 'https://syntexhosting.com/',
            description: translate({
                id: 'providers.provider.syntexhosting.description',
                message: "Set the Bedrock port to the Java server's port and connect with that port, or request a (free) additional port."
            })
        },
        {
            name: 'The Minecraft Hosting',
            url: 'https://theminecrafthosting.com/',
            description: translate({
                id: 'providers.provider.the_minecraft hosting.description',
                message: "Try using `19132` as the Bedrock port, if that does not work, use the same Java server's port for the `bedrock port` in your config and connect with that port and the Java server's IP."
            })
        },
        {
            name: 'TNAHosting',
            url: 'https://tnahosting.net/',
            description: descriptionTemplates.default
        },
        {
            name: 'TurboHost',
            url: 'https://turbohost.nl/',
            description: descriptionTemplates.default
        },
        {
            name: 'UltimateSRV',
            url: 'https://ultimatesrv.com/',
            description: descriptionTemplates.default
        },
        {
            name: 'VexyHost',
            url: 'https://vexyhost.com/',
            description: descriptionTemplates.default
        },
        {
            name: 'Volcano Hosting',
            url: 'https://www.volcanohosting.net/',
            description: descriptionTemplates.default
        },
        {
            name: 'VoltHosting',
            url: 'https://www.volthosting.co.uk/',
            description: translate({
                id: 'providers.provider.volthosting.description',
                message: "Enable clone-remote-port (or manually set bedrock port to the Java port), and connect with the Java IP and port. Alternatively, request an additional port, or buy a dedicated IP address. If you continue to have issues, please [contact VoltHosting support](https://volthosting.co.uk/contact.html) for further assistance."
            })
        },
        {
            name: 'Vultam',
            url: 'https://vultam.net/',
            description: translate({
                id: 'providers.provider.vultam.description',
                message: "Enable `clone-remote-port` in the Geyser config, and connect with the Java IP and port. Alternatively, allocate an additional port to your server from the Network section of the control panel and set it as the `bedrock.port` in the Geyser config. Use that port to connect from Bedrock. Please contact [Vultam support](https://clients.vultam.net/submitticket.php?step=2&deptid=1) if you need assistance."
            })
        },
        {
            name: 'Wasabi Hosting',
            url: 'https://wasabihosting.com',
            description: translate({
                id: 'providers.provider.wasabihosting.description',
                message: "Install Geyser with the plugin installer. Use the same port as your Java server in the Geyser config. Connect with the same address and port as your Java server."
            })
        },
        {
            name: "Wepwawet",
            url: "https://wepwawet.net/",
            description: translate({
                id: 'providers.provider.wepwawet.description',
                message: "Add a new port in the Network tab. Use this new port as the bedrock port."
            })
        },
        {
            name: 'WinterNode',
            url: 'https://winternode.com',
            description: translate({
                id: 'providers.provider.winternode.description',
                message: "Set the Bedrock port to the Java server's port and connect with that port. Alternatively, request an additional port, or buy a dedicated IP address."
            })
        },
        {
            name: 'WitherHosting',
            url: 'https://witherhosting.com/',
            description: translate({
                id: 'providers.provider.witherhosting.description',
                message: "Either use the Java server's port, or create a port in the ports manager on the panel and use that for Bedrock. Refer to the hosts [support article](https://support.witherhosting.com/en/article/how-to-install-and-use-geysermc-1xn5l6v/) for further info."
            })
        }
    ],
    no_support: [
        {
            name: 'MyArena',
            url: 'https://www.myarena.ru/',
            description: translate({
                id: 'providers.provider.myarena.description',
                message: "Does seem to be working, but the Java version is too old in order for Geyser to run properly."
            })
        },
        {
            name: 'NiCraft',
            url: 'https://www.ni-host.com/',
            description: translate({
                id: 'providers.provider.nicraft.description',
                message: "Does not provide Bedrock support, and are affected by a [firewall configuration issue](https://wiki.geysermc.org/geyser/port-forwarding/#ovh-and-soyoustart), which prohibits most players from joining."
            })
        },
        {
            name: 'Feather',
            url: 'https://feathermc.com/',
            description: translate({
                id: 'providers.provider.feather.description',
                message: "Their proxy network does not support UDP. Therefore, Geyser is not supported. As an alternative, set up a paper server with e.g. playit.gg instead of port forwarding."
            })
        }
    ]
}
