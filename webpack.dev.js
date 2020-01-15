const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');


module.exports = merge(common, {
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: '/',
    },
    // build files aren't uglified
    mode: "development",
    module: {
        rules: [
            {
                test: /\.scss$/,
                // Order matters
                use: [
                    "style-loader",// 3. inject css to DOM
                    "css-loader",  // 2. css -> js
                    "sass-loader", // 1. scss -> css
                ]
            },
        ]
    }
    // devtool: "none",
});