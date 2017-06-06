var webpack = require('webpack');
var path = require('path');
var env = process.env.WEBPACK_ENV;

var library = 'ngpdf';

var fileName = library;
if(env == 'prod') {
    fileName += ".min";
}
fileName += '.js'

var config = {
    entry: __dirname + '/index.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/build',
        filename: fileName,
        library: library,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /(\.js)$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/
            }
        ]
    },
    externals: {
        'angular': 'angular',
        'pdfjs-dist': 'pdfjs-dist'
    }
};

module.exports = config;