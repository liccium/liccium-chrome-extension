const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const EnvironmentPlugin = require('webpack').EnvironmentPlugin;
// dotenv

const dotenv = require('dotenv');
dotenv.config();

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    plugins:[
        new EnvironmentPlugin({
            API_URL: process.env.API_URL,
            API_KEY: process.env.API_KEY,
        })
    ]
});

