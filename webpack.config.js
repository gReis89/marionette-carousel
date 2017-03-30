'use strict'

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const merge = require('webpack-merge')

const webpackCommon = {
  entry: {
    app: ['./app/initialize']
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.jsx$/,
        loader: 'underscore-template-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ]
  },
  output: {
    filename: 'app.js',
    path: path.join(__dirname, './public'),
    publicPath: '/public/'
  },
  plugins: [
    new ExtractTextPlugin('./css/app.css'),
    new CopyWebpackPlugin([
      {from: './app/assets/index.html', to: './index.html'},
      {from: './node_modules/bootstrap/dist/css/bootstrap.css', to: './css/bootstrap.css'},
      {from: './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
       to: './fonts/glyphicons-halflings-regular.eot'},
      {from: './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
       to: './fonts/glyphicons-halflings-regular.svg'},
      {from: './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
       to: './fonts/glyphicons-halflings-regular.ttf'},
      {from: './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
       to: './fonts/glyphicons-halflings-regular.woff'},
      {from: './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2',
       to: './fonts/glyphicons-halflings-regular.woff2'}
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'underscore'
    })
  ],
  resolve: {
    root: path.join(__dirname, './app')
  },
  resolveLoader: {
    root: path.join(__dirname, './node_modules')
  }
}

switch (process.env.npm_lifecycle_event) {
  case 'start':
  case 'dev':
    module.exports = merge(webpackCommon, {
      devtool: '#inline-source-map',
      devServer: {
        inline: true
      }
    })
    break
  default:
    module.exports = merge(webpackCommon, {
      devtool: 'source-map'
    })
    break
}
