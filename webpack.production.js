const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = () => ({
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader', 'sass-loader',
                { loader: 'sass-resources-loader',
                    options: {
                      resources: [
                        path.resolve(__dirname, 'src/styles/variables.scss'),
                      ]
                    }
                }
            ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash].css'
        }),
        new OptimizeCSSAssetsPlugin(),
    ]
});
