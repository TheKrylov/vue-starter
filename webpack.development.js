const path = require('path');

module.exports = () => ({
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  'style-loader', 
                  'css-loader',
                  'resolve-url-loader',
                  'sass-loader',
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
    }
});

