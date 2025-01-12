import Translate from "@docusaurus/Translate"

export const MDXTranslatable = {
    setup: {
        host_provider: () => <Translate id="mdx.setup.host_provider">Host Provider</Translate>,
        self_host: () => <Translate id="mdx.setup.self_host">Self Host</Translate>,
        paper_spigot: () => <Translate id="mdx.setup.paper_spigot">Paper / Spigot</Translate>,
        modded_servers: () => <Translate id="mdx.setup.modded_servers">Modded Servers</Translate>,
        proxy_servers: () => <Translate id="mdx.setup.proxy_servers">Proxy Servers</Translate>,
        viaproxy: () => <Translate id="mdx.setup.viaproxy">ViaProxy</Translate>,
        standalone: () => <Translate id="mdx.setup.standalone">Standalone</Translate>,
    }
}