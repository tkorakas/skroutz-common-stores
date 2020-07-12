const webpack = require("webpack");
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const srcDir = '../src/';
const ExtensionReloader = require('webpack-extension-reloader');

module.exports = {
    entry: {
        content_script: path.join(__dirname, srcDir + 'content_script.ts')
    },
    output: {
        path: path.join(__dirname, '../dist/js'),
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: "initial"
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new ExtensionReloader(),
        new CopyPlugin([
            { from: '.', to: '../' }
        ],
            { context: 'public' }
        ),
    ]
};
