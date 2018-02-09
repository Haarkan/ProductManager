"use strict";
var path = require('path');
module.exports = {
    entry: "./index.ts",
    output: {
        path: path.resolve(__dirname, './out'),
        filename: "index.js"
    },
    resolve: {
        extensions: [".js", ".ts", ".html"]
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "babel-loader!ts-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader" 
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: "html-loader?exportAsEs6Default"
            }
        ]
    }
};