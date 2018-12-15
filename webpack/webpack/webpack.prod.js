const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpack = require('./webpack.base')

module.exports = merge(baseWebpack, {
  mode: 'production'
})
