const path    = require('path');
const webpack = require('webpack');

// ## //

const BASE = path.join(process.cwd(), 'src');
const ASSETS = path.join(BASE, 'assets');

const PATHS = {
    app: ASSETS,
    style: path.join(ASSETS, 'styles'),
    build: path.join(BASE, 'static')
};

module.exports = options => ({
    entry: options.entry,

    output: Object.assign({
        path: PATHS.build,
        publicPath: '/static/'
    }, options.output),

    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: [
                'babel?cacheDirectory'
            ],
            include: PATHS.app
        }, {
            test: /\.json$/,
            loaders: [
                'json'
            ]
        }, {
            test: /\.less$/,
            loader: options.globalLessLoader,
            include: path.join(PATHS.style, 'global')
        }, {
            test: /\.less$/,
            loader: options.vendorLessLoader,
            include: path.join(PATHS.style, 'vendor')
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?.*$|$)/,
            loaders: [
                'url'
            ]
        }, {
            test: /\.(jpg|png|gif)(\?.*$|$)/,
            loaders: [
                'url'
            ]
        }]
    },

    plugins: options.plugins.concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]),

    postcss: () => options.postcssPlugins,

    resolve: {
        alias: {
            '~': PATHS.app
        },
        modules: [
            PATHS.app,
            'node_modules'
        ],
        extensions: [
            '',
            '.js',
            '.jsx'
        ]
    },

    target: 'web',

    stats: options.stats,

    progress: true
});

module.exports.PATHS = PATHS;
