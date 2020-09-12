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
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "build")
    },
    mode: "production",
    stats: "normal",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
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
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            publicPath: 'images',
                            outputPath: 'images',
                            name: '[name].[contenthash].[ext]'
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
                            name: '[name].[contenthash].[ext]'
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
            filename: "[name].[contenthash].css"
        }),
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin(),
        new Notifier()

    ]
};