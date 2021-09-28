var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    mode: 'development',
    entry: {
        c: './src/client/',
        r: ['react', 'react-router', 'react-dom'],
        l: ['store', 'underscore']
    },
    output: {
        path: __dirname + '/build',
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.css'],
        alias: {
            actions: path.resolve('./src/client/actions'),
            api: path.resolve('./src/client/api'),
            components: path.resolve('./src/client/components'),
            elements: path.resolve('./src/client/elements'),
            core: path.resolve('./src/client/core'),
            utils: path.resolve('./src/client/utils')
        }
    },
    devServer: {
        historyApiFallback: {
            rewrites: [
                { 
                    from: /\..{20}\.js$/, 
                    to: function(context) {
                        var path = context.parsedUrl.pathname;
                        var arr = path.split('/');
                        var fileName = arr.pop();
                        return '/' + fileName;
                    }
                }
            ]
        },
        disableHostCheck: true,
        contentBase: path.join(__dirname, '../public'),
        publicPath: '/',
        compress: true,
        port: 9000,
        hot: false
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':'"localhost"'
        }),
        new HtmlWebpackPlugin({
            template: './src/client/template.index.html',
            inject: true
        }),
        /*new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()*/
    ],
    module: {
        rules: [{
            test: /\.js|\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },{
            test: /\.css|\.scss?$/,
            loader: 'style-loader!css-loader'
        },{ 
            test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/, 
            loader: 'file-loader?limit=100000' 
        }]
    }
};

module.exports = config;
