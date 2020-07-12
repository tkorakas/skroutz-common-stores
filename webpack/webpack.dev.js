const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtensionReloader = require('webpack-extension-reloader');
const path = require('path');
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
    ]
});