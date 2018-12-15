process.env.NODE_ENV = 'devlopment'
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpack = require('./webpack.base')

module.exports = merge(baseWebpack, {
  devtool: 'cheap-module-source-map',
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
    /**
     * ouput.path = 'dist/resources'  打包目录
     * output.publicPath = '/resources'  部置目录
     * index.html filename = '../index.html' => dist/index.html
     * 打包后的目录结构：
     * dist
     *  resources
     *    main.js
     *    vendor.js
     *    ...
     *  index.html => 引用/resources/main.js, resources.vendor.js
     * 此时index.html就能正常运行
     *
     * 本想此时devServer.publicPath = '/'应该能直接访问到index.html吧,
     * 结果发现并不行，这个publicPath必须与output.path一样，这样才能在
     * 浏览器以locahost:3000/resources/main.js的方式访问到，而index.html
     * 怎么样都找不到
     *
     * 将index.html打包到resources/下面， devServer.publicPath: '/resources'
     * 才能正常访问到index.html
     *
     * 也就是说devServer.publicPath必须与output.path相同，否则不能正常工作
     * devServer.publicPath默认值为/，即打包目录
     *
     * 也就是说devServer与实际的打包发布方式还是有所不同的
     *
     */
    publicPath: '/resources', //index.html存放的位置
    host: '0.0.0.0',//主机
    port: 3000,//端口
    open: true,
    hot: true,
    overlay: true
  }
})
