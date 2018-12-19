process.env.NODE_ENV = 'production'
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpack = require('./webpack.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(baseWebpack, {
  // mode: 'production',
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
      环境变量process.env.abc的值只能是字符串，如果要传对象请先用JSON.stringify({})处理，
      在src代码里面再用JSON.parse解析成对象

      process.env里面的数据只能在nodejs里面用，webpack要打包的内容里面是取不到process.env里面的值，
      如process.env.abc = 'abc'
      在文件里面：const abc = process.env.abc是得不到值的，
      只能通过EnvironmentPlugin或DefinePlugin定义的值，才能在打包文件里面取到
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
     * 压缩css，就算是production, 样式也是没压缩的,只是合并
     */
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        safe: true
      }
    })
  ]
})
