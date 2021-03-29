const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
    return {
        entry: {
            app: './src/index.js'
        },
        output: {
            filename: '[name]-[hash].bundle.js',
            path: path.resolve(__dirname, 'public'),
            publicPath: '/'
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        babelrc: true
                    }
                }
            ]
        },
        devServer: {
            contentBase: './dist',
            port: 3001,
            historyApiFallback: true,
            publicPath: '/'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './src/index.template.ejs'),
                inject: 'body'
            }),
        ]
    }
}
