const merge = require('webpack-merge');
const ExtensionReloader = require('webpack-extension-reloader');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const common = require('./webpack.common.js');
const srcDir = '../src/';

module.exports = merge(common, {
    devtool: 'inline-source-map',
    mode: 'development',
    entry: {
        background: path.join(__dirname, srcDir + 'background.ts')
    },
    plugins: [
        new ExtensionReloader({
            reloadPage: true,
            entries: {
                contentScript: "content_script",
                background: 'background'
            }
        }),
        new CopyPlugin([
            { from: './icon.png', to: '../' },
            { from: './manifest.dev.json', to: '../manifest.json' }
        ],
            { context: 'public' }
        ),
    ]
});