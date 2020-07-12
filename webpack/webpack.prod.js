const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CopyPlugin([
            { from: './icon.png' },
            { from: './manifest.prod.json', to: './manifest.json' }
        ],
            { context: 'public' }
        ),
    ]
});