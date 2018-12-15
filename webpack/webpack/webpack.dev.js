const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpack = require('./webpack.base')

module.exports = merge(baseWebpack, {
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    /**
     * 开启模块的热替换，HMR，和devServer的hot: true 一起使用才行
     */
    new webpack.HotModuleReplacementPlugin(),
    /**
     * 模块热替换开启时，显示更新module的相对路径
     */
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    publicPath: '/',//决定bundle文件位置
    host: '0.0.0.0',//主机
    port: 3000,//端口
    open: true,
    hot: true,
    overlay: true
  }
})
