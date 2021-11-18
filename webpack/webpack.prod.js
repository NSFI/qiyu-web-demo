const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

/**
 * 测试环境和线上配置
 */
module.exports = env => {
    console.log('[PROD ENV]', env);

    // 项目id，正式发布时注入
    var id = env.id ? (env.id + '/') : '';

    // 先用本地nginx进行测试
    let publicPath = '/';

    if (env.test) {
        // 优先判断测试环境
        publicPath = '//xx/' + id;
    } else if (env.prod) {
        publicPath = '//xx/' + id;
    }

    return merge(common(env), {
        output: {
            path: path.resolve(__dirname, '../public'),
            filename: '[name].[chunkhash:8].js',
            publicPath: publicPath
        },
        module: {
            rules: [
                {
                    test: /\.(less|css)$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [{
                                loader: 'css-loader',
                                options: {
                                    minimize: true
                                }
                            }, {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: () => [require('autoprefixer')({ browsers: ['Android >= 4', 'iOS >=7'] })]
                                }
                            }, 'less-loader']
                    })
                },
                {
                    test: /\.(png|jpg|gif|mp3|json|dae)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[hash].[ext]'
                            }  
                        }
                    ]
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin({
                filename: '[name].[contenthash:8].css'
            }),
            new InlineManifestWebpackPlugin({
                name: 'webpackManifest'
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    })
}