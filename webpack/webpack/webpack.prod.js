process.env.NODE_ENV = 'production'
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpack = require('./webpack.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(baseWebpack, {
  mode: 'production',
  plugins: [
    /***
     * EnvironmentPlugin是在process.env上变义变量，
     * 等效于下面的DefinePlugin:
     * DefinePlugin的使用就更广了，如{ VERSION: 1 }
     * new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': '"production"',
        },
      })
     */
    new webpack.EnvironmentPlugin({
      'NODE_ENV': '"production"',
    }),
    /**
     * 将css提取到文件，文件数量要看splitChunks的配置
     */
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    /**
     * 压缩css
     */
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        safe: true
      }
    })
  ]
})
