const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    entry: ["./src/index.js"],
    devtool: 'inline-source-map',
    devServer: { contentBase: './movie' },
    output: {
        filename: '[name].js',
        path: __dirname + '/movie'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }, plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new CopyPlugin(
            [{ from: './public/assets', to: './assets' }]
        )
    ]
};