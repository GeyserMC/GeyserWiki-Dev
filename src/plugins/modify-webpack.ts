import {Plugin, LoadContext, PluginOptions} from '@docusaurus/types';
const PLUGIN_NAME = 'docusaurus-modify-webpack';

const modifyWebpackPlugin = (_context: LoadContext, _options: PluginOptions): Plugin => {
    return {
        name: PLUGIN_NAME,
        configureWebpack() {
            return {
                infrastructureLogging: {
                    level: 'error'
                }
            }
        }
    }
}

export default modifyWebpackPlugin;