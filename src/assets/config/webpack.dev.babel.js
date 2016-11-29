const fs                = require('fs');
const path              = require('path');
const webpack           = require('webpack');
const base              = require('./webpack.base.babel');

const BundleTracker     = require('webpack-bundle-tracker')

// ## //

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

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),

        new BundleTracker({
            filename: './src/assets/config/webpack.dev.stats.json'
        })
    ],

    localLessLoader: [
        'style',
        'css?modules&importLoaders=1&localIdentName=[folder]__[local]-[hash:base64:5]',
        'resolve-url',
        'postcss',
        'less'
    ].join('!'),

    globalLessLoader: [
        'style',
        'css',
        'resolve-url',
        'postcss',
        'less'
    ].join('!'),

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
