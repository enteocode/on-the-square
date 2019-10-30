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

const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotenvPlugin = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');

// Definitions

const isDevelopment = process.env.NODE_ENV !== 'production';

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
 * @param {string} isDevelopment
 * @return {string}
 */
const getLocalIdentName = (isDevelopment) => {
    return isDevelopment ? '[local]__[md5:hash:4]' : '[md5:hash:6]';
};

/**
 * @type {Object}
 */
module.exports = {
    devtool : isDevelopment ? 'inline-source-map' : void 0,
    stats : {
        children : false
    },
    entry : {
        app : [ 'react-hot-loader/patch', 'whatwg-fetch', './src/bootstrap.tsx' ]
    },
    output : {
        filename : '[name].js',
        path : resolve('docs/static'),
        publicPath : '/static/'
    },
    optimization : {
        minimizer : [
            new TerserPlugin({
                parallel : true,
                cache : true,
                terserOptions : {
                    parse : {
                        ecma : 8
                    },
                    compress : {
                        drop_console : true,
                        passes : 3,
                        warnings : false
                    },
                    mangle : {
                        safari10 : true
                    },
                    output : {
                        ascii_only : false,
                        ecma : 3,
                        comments : false
                    }
                },
            })
        ],
        splitChunks : {
            cacheGroups : {
                name : false,
                vendor : {
                    test : /node_modules/,
                    name : 'vendor',
                    chunks : 'all'
                }
            }
        }
    },
    devServer : {
        disableHostCheck : true,
        inline : true,
        contentBase : resolve('docs'),
        clientLogLevel : 'warning',
        host : HOST,
        port : PORT,
        historyApiFallback : true,
        https : true,
        hot : true,
        headers : {
            'P3P' : 'CP="ALL IND DSP COR ADM CONo CUR CUSo IVAo IVDo PSA PSD TAI TELo OUR SAMo CNT COM INT NAV ONL PHY PRE PUR UNI"',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Credentials' : 'true'
        },
        stats : 'errors-only'
    },
    externals : {
        'mapbox-gl' : 'mapboxgl'
    },
    node : {
        fs : 'empty'
    },
    resolve : {
        alias : {
            'react-dom' : '@hot-loader/react-dom'
        },
        extensions : [
            '.js',
            '.json',
            '.ts',
            '.tsx'
        ]
    },
    plugins : [
        new DotenvPlugin({ safe : true, systemvars : true }),
        new MiniCssExtractPlugin({ filename : '[name].css' })
    ],
    module : {
        strictExportPresence : true,
        rules : [
            {
                test : /\.[tj]sx?$/,
                exclude : /node_modules/,
                use : [
                    {
                        loader : 'babel-loader',
                        options : {
                            cacheDirectory : true
                        }
                    },
                    {
                        loader : 'eslint-loader',
                        options : {
                            failOnWarning : isDevelopment,
                            cache : false
                        }
                    }
                ]
            },
            {
                test : /\.s?css$/,
                use : [
                    ! isDevelopment ? MiniCssExtractPlugin.loader : {
                        loader : 'style-loader'
                    },
                    {
                        loader : 'css-modules-typescript-loader'
                    },
                    {
                        loader : 'css-loader',
                        options : {
                            importLoaders : 3,
                            modules : {
                                localIdentName : getLocalIdentName(isDevelopment)
                            }
                        }
                    },
                    {
                        loader : 'resolve-url-loader'
                    },
                    {
                        loader : 'postcss-loader',
                        options : {
                            sourceMap : true,
                            plugins : [
                                require('autoprefixer'),
                                require('cssnano')({ preset : 'default' })
                            ]
                        }
                    },
                    {
                        loader : 'sass-loader',
                        options : {
                            sourceMap : isDevelopment
                        }
                    }
                ]
            },
            {
                test : /\.(jpe?g|png|gif|svg|ttf|eot|otf|woff2?)$/,
                use : [
                    {
                        loader : 'file-loader',
                        options : {
                            name : '[name].[ext]?v=[hash:8]'
                        }
                    }
                ]
            }
        ]
    }
};
