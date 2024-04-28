const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        index: './src/index.js'
    },
    mode: 'production',
    output: {
        filename: '[name].js',
        library: 'hfbcast',
        libraryTarget: 'umd'
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    },
    resolve: {
        fallback: {path: false, fs: false, crypto: false}
    },
    devServer: {
        port: 3333,
        client: {
            overlay: {
                warnings: false,
                errors: true
            }
        },
        static: [
            {
                directory: path.join(__dirname, 'doc'),
                publicPath: '/doc',
            }
        ],
        proxy: {
            '/api': {
                target: 'http://localhost:8080/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api':''
                  }
            }
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['index'],
            template: "./src/index.html",
        })
    ],
    devtool: 'eval-cheap-source-map',
}

module.exports = async (env) => {

    if (process.env.WEBPACK_SERVE) {
        if (env.server) {
            config.devtool = 'eval-cheap-source-map';
            config.stats = {warnings: false};
    
            const {server} = require("./server.js");
    
            server({}, false)
                .then(message => {
                    console.log(message);
                })
                .catch(message => {
                    console.error(message);
                });
        }
    }
    else {
        config.devtool = 'source-map';
    }

    return config;
}