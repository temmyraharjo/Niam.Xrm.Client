var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist.browser/built');
var APP_DIR = path.resolve(__dirname, 'src');

var configs = [
    {
        entry: APP_DIR + '/lib/xrm-fx-impl.ts',
        output: {
            path: BUILD_DIR,
            filename: 'xrm-fx.js'
        },
        module: {
            rules: [
                { 
                  test: /\.ts?$/, 
                  loader: 'awesome-typescript-loader'
                }
              ]
        },
        resolve: {
            extensions: ['.ts', '.js', '.jsx']
        }
    }
];

module.exports = configs;
