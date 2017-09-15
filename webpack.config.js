var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './js/index.js',
    output: {
        filename: './dist/bundle.js'
    },
    module: {
        loaders: [
        {
            loader: 'babel-loader',
            test: path.join(__dirname, 'js'),
            query: {
                presets: 'es2015',
            }
        }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map'
};