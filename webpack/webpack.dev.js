const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * 本地开发配置
 */
module.exports = env => {
    console.log('[DEV ENV]', env);
    return merge(common(env), {
        devtool: 'cheap-module-source-map',
        watch: true,
        devServer: {
            contentBase: path.resolve(__dirname, '../public'),
            host: '0.0.0.0',
            port: '8217',
            disableHostCheck: true
        },
        output: {
            path: path.resolve(__dirname, '../public'),
            pathinfo: true,
            filename: '[name].js',
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.(less|css)$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', {
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
                                name: '[path][name].[ext]'
                            }  
                        }
                    ]
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin({
                filename: '[name].css'
            })
        ]
    })
}