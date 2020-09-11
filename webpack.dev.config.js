const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Notifier = require('./plugins/Notifier');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "build")
    },
    mode: "development",
    stats: "normal",
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        index: 'index.html',
        compress: true,
        port: 8080
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            publicPath: 'images',
                            outputPath: 'images',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            publicPath: 'fonts',
                            outputPath: 'fonts',
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [

        new HtmlWebpackPlugin({
            title: "Index Page",
            template: "./src/index.html",
            filename: "index.html",
            chunks: ['app']
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin(),
        new Notifier()

    ]
};