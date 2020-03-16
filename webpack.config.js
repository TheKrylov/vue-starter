const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const modeConfig = env => require(`${path.resolve(__dirname, './')}/webpack.${env}`)(env);

module.exports = ({mode} = {mode: 'production'}) => {
    return webpackMerge(
        {
            mode,
            devtool: 'none',
            entry: './src/index.js',
            output: {
                path: path.resolve(__dirname, './public'),
                publicPath: '',
                filename: './static/js/[name].[contenthash].js'
            },
            optimization: {
                splitChunks: {
                    chunks: 'all'
                }
            },
            stats: {
              entrypoints: false,
              children: false
            },
            module: {
                rules: [
                    {
                      test: /\.vue$/,
                      loader: 'vue-loader'
                    },
                    {
                        test: /\.(js)$/,
                        use: ['babel-loader'],
                        resolve: {
                          alias: {
                            '$http' : path.resolve(__dirname, './src/http.js'),
                            'Helpers' : path.resolve(__dirname, './src/helpers/'),
                            'Pages' : path.resolve(__dirname, './src/pages/'),
                            'Components' : path.resolve(__dirname, './src/components/'),
                          },
                          extensions: ['.js', '.vue']
                        }
                    },
                    {
                        test: /\.(png|jpe?g|gif|svg|webp)$/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: 'static/media/[name].[contenthash].[ext]'
                                }
                            }
                        ]
                    }
                    
                    
                ]
            },
            devServer: {
                historyApiFallback: true,
                hot: true,
                contentBase: path.join(__dirname, '/public')
            },
            plugins: [
                new VueLoaderPlugin(),
                new HtmlWebpackPlugin({
                    template: './src/templates/index.html',
                    filename: 'index.html',
                    inject: 'body',
                    preload: ['*.css'],
                    minify: {
                        //html5: true,
                        //removeComments: true,
                        //collapseWhitespace: true
                    },
                    templateParameters: {
                        PUBLIC_URL: ''
                    }
                }),
                new WebpackShellPlugin({
                  onBuildStart:['echo "Webpack Start"'], 
                  onBuildEnd:['echo "Webpack End"'],
                }),
                new webpack.ProgressPlugin()
            ]
        },
        modeConfig(mode)
    );
};



