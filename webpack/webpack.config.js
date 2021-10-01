var path = require('path');
var webpack = require('webpack');
var pkg = require('../package.json');
var format = require('string-template');
var TerserPlugin = require('terser-webpack-plugin');
var SaveHashPlugin = require('./webpack-savehash-plugin');

var today = new Date();
var banner = format('{name} - v{version} - {today} \n    Author: {author} - vxthu.hanu@gmail.com', {
    name: pkg.name,
    version: pkg.version,
    today: today.toLocaleString(),
    author: pkg.author,
});

var config = {
    mode: 'production',
    entry: {
        c: './src/client/',
        r: ['react', 'react-dom', 'react-router'],
        l: ['underscore', 'store'],
    },
    output: {
        path: path.join(__dirname, '../build/temp'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js',
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.css'],
        alias: {
            actions: path.resolve('./src/client/actions'),
            api: path.resolve('./src/client/api'),
            components: path.resolve('./src/client/components'),
            elements: path.resolve('./src/client/elements'),
            core: path.resolve('./src/client/core'),
            utils: path.resolve('./src/client/utils'),
        },
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: { banner },
            }),
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                BASE_URL: JSON.stringify('http://localhost:8080/'),
            },
        }),
        new SaveHashPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js|\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css|\.scss?$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
                use: 'file-loader?limit=100000',
            },
        ],
    },
};

module.exports = config;
