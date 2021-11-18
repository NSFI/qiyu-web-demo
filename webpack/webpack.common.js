const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
    return {
        entry: {
            // 第三方库，按需添加
            vendor: ['babel-polyfill', 'react', 'react-dom', 'prop-types', 'querystring'],
            // 业务逻辑
            bundle: path.resolve(__dirname, '../client/module/index')
        },
        module: {
            rules: [
                { 
                    test: /\.js$/, 
                    use: ['babel-loader'], 
                    exclude: /(node_modules|\/lib\/)/
                },
                {
                    test: /\.(glsl|frag|vert)$/, 
                    exclude: /node_modules/,
                    loader: 'raw-loader' 
                },
                {
                    test: /\.(glsl|frag|vert)$/, 
                    exclude: /node_modules/,
                    loader: 'glslify-loader' 
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: "babel-loader"
                        },
                        {
                            loader: "react-svg-loader",
                            options: {
                                jsx: true,
                                svgo: {
                                    plugins: [
                                        {
                                            removeTitle: true
                                        },{
                                            cleanupIDs: false
                                        }
                                    ],
                                    floatPrecision: 2
                                }
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: ['vendor', 'manifest'],
                minChunks: Infinity
            }),
    
            new HtmlWebpackPlugin({
                template: path.join(__dirname, '../client/view/index.html'),
                filename: 'index.html',
                chunks: ['vendor', 'manifest', 'bundle']
            })
        ],
        resolve: {
            extensions: ['.js', '.jsx', '.json', '.less', '.css'],
            alias: {
                'CLIENT': path.resolve(__dirname, '../client'),
                'MODULE': path.resolve(__dirname, '../client/module'),
                'CSS':    path.resolve(__dirname, '../client/css'),
                'IMG':    path.resolve(__dirname, '../client/img'),
                'UTIL':   path.resolve(__dirname, '../client/module/util'),
            }
        }
    };
}