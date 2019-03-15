const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let apiHost
let publicPath

setupEnv = () => {
    console.log(process.env.NODE_ENV)
    switch (process.env.NODE_ENV) {
        case 'development':
            apiHost = "'http://localhost:3005/'"
            publicPath = '/'
            break
        default:
            apiHost = "'http://how-we-got-here.travisbumgarner.com'"
            publicPath = '/'
    }
    console.log(apiHost)
}
setupEnv()

module.exports = env => {
    return {
        entry: {
            app: './src/frontend/index.js'
        },
        output: {
            filename: 'app.bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath
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
                template: path.resolve(__dirname, './src/frontend/index.template.ejs'),
                inject: 'body'
            }),
            new webpack.DefinePlugin({ __API__: apiHost })
        ]
    }
}
