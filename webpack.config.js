'use strict';

/*
 * Webpack configuration
 *
 * This is the main configuration file for Webpack 4.
 *
 * To keep this file in the root with the exact same name can be essential
 * for different parallel processes like JEST, which can support ES6+ if this
 * file is present.
 *
 * @private
 */

const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const autoprefixer = require('autoprefixer');

// Constants

const MODE_PRODUCTION  = 'production';
const MODE_DEVELOPMENT = 'development';
const HOST = 'localhost';
const PORT = 3000;

/**
 * Resolves the given path by the current directory root
 *
 * @private
 * @param {...string} localPath
 * @return {string}
 */
const resolve = (... localPath) => path.resolve(__dirname, ... localPath);

/**
 * Returns the proper hashing format of CSS Module classes
 *
 * @private
 * @param {string} mode
 * @return {string}
 */
const getLocalClassName = (mode) => {
    return mode === MODE_DEVELOPMENT ? '[local]__[md5:hash:base62:4]' : '[sha256:hash:base62:6]';
};

/**
 * Returns with the mode-enhanced list of Babel plugins
 *
 * @private
 * @param {boolean} isDevelopment
 * @return {string[]}
 */
const getBabelPlugins = (isDevelopment) => {
    const file = fs.readFileSync('./.babelrc', 'utf-8');
    const json = JSON.parse(file);
    const data = json.plugins || [];

    if (isDevelopment) {
        return ['react-hot-loader/babel'].concat(data);
    }
    return data;
};

/**
 * Configurator
 *
 * We're returning with a function instead of a plain Object
 * to get the mode for actual runtime.
 *
 * @param {string} env
 * @param {string} mode
 * @return {Object}
 */
module.exports = (env, { mode = MODE_DEVELOPMENT }) => {
    const isDevelopment = mode === MODE_DEVELOPMENT;

    const config = {
        devtool : isDevelopment ? 'inline-source-map' : void 0,

        mode,

        entry : {
            app : [ 'whatwg-fetch', './src/bootstrap.js' ]
        },
        output : {
            filename : '[name].js',
            chunkFilename : '[name].js?v=[chunkhash]',
            path : resolve('docs/static'),
            publicPath : '/static/'
        },
        optimization : {
            splitChunks : {
                cacheGroups : {
                    vendor : {
                        test : /node_modules/,
                        name : 'vendor',
                        chunks : 'all'
                    }
                }
            }
        },
        devServer : {
            contentBase : resolve('docs'),
            clientLogLevel : 'warning',
            host : HOST,
            port : PORT,
            historyApiFallback : true,
            hot : true,
            stats : {
                chunks : false
            }
        },
        externals : {
            'mapbox-gl' : 'mapboxgl'
        },
        node : {
            fs : 'empty'
        },
        resolve : {
            // To make the traversing easier, we creating aliases for all of the logical groups

            alias : {
                action    : resolve('src/action'),
                component : resolve('src/component'),
                lib       : resolve('src/lib'),
                reducer   : resolve('src/reducer')
            }
        },
        plugins : [
            // We want to force compilation targets by the mode given instead of the environmental variables,
            // so we can't use EnvironmentPlugin

            new webpack.DefinePlugin({
                'process.env.NODE_ENV' : JSON.stringify(isDevelopment ? MODE_DEVELOPMENT : MODE_PRODUCTION),
                'DEBUG' : JSON.stringify(isDevelopment)
            })
        ],
        module : {
            rules : [
                {
                    test : /\.jsx?$/,
                    exclude : /node_modules/,
                    use : [
                        {
                            loader : 'babel-loader',
                            options : {
                                cacheDirectory : true,
                                plugins : getBabelPlugins(isDevelopment)
                            }
                        },
                        {
                            loader : 'eslint-loader'
                        }
                    ]
                },
                {
                    test : /\.s?css$/,
                    use : [
                        {
                            loader : 'style-loader',
                            options : {
                                hmr : isDevelopment,
                                sourceMap : isDevelopment
                            }
                        },
                        {
                            loader : 'css-loader',
                            options : {
                                localIdentName : getLocalClassName(mode),
                                importLoaders : 2,
                                modules : true,
                                minimize : true
                            }
                        },
                        {
                            loader : 'sass-loader',
                            options : {
                                sourceMap : true
                            }
                        },
                        {
                            loader : 'postcss-loader',
                            options : {
                                sourceMap : true,
                                plugins : [
                                    autoprefixer({ browsers : [ '> 5%', 'Firefox ESR' ] })
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    };

    // Hot Module Replacement

    if (isDevelopment) {
        config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
    }

    return config;
};
