const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                        ]
                    }
                }
            },
            {
                test: /\.ts$/,
                exclude: /node-modules/,
                use: 'ts-loader'
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: 'asset/resource',
                use: 'file-loader',
            },
            {
                test: /\.(css)$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devServer: {
        static: './dist',
        compress: true,
        hot: true,
        port: 5000
    },
    devtool: "eval-source-map",
    plugins: [
        new HtmlWebpackPlugin({template: 'src/index.html'}),
        new CopyWebpackPlugin({
            patterns: [{from: "./src/assets", to: "assets"}],
        })
    ]
}