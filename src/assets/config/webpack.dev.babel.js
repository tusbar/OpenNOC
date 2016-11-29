const fs                = require('fs');
const path              = require('path');
const webpack           = require('webpack');
const base              = require('./webpack.base.babel');

const BundleTracker     = require('webpack-bundle-tracker')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// ## //

const css = {
    global: new ExtractTextPlugin('styles/global.css'),
    vendor: new ExtractTextPlugin('styles/vendor.css')
};

module.exports = base({
    entry: [
        path.join(base.PATHS.app, 'index')
    ],

    output: {
        filename: 'scripts/bundle.js',
        chunkFilename: 'scripts/[name].chunk.js'
    },

    plugins: [
        new webpack.NoErrorsPlugin(),

        new BundleTracker({
            filename: './src/assets/config/webpack.dev.stats.json'
        }),

        css.vendor,
        css.global
    ],

    globalLessLoader: css.global.extract([
        'css',
        'resolve-url',
        'postcss',
        'less'
    ]),

    vendorLessLoader: css.vendor.extract([
        'css',
        'resolve-url',
        'postcss',
        'less'
    ]),

    postcssPlugins: [
        require('postcss-focus')(),
        require('postcss-cssnext')({
            browsers: ['last 2 versions', 'IE > 10']
        }),
        require('postcss-reporter')({
            clearMessages: true
        })
    ]
});
