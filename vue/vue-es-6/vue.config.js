const merge = require('webpack-merge')
module.exports = {
  /***
   * configureWebpack可以直接是配置信息
   * 也可是是一个函数，参数为默认的配置信息，可以基于此进行修改
   *
   * vue inspect > webpack.js可以得到webpack的配置信息
   */
  configureWebpack: config => {
    const options = {
      devtool: 'cheap-module-source-map',
      resolve: {
        alias: {
          vue$: 'vue/dist/vue.esm.js'
        },
        extensions: ['.vue', '.js', '.jsx','.json']
      },
    }
    config.devtool = options.devtool
    Object.assign(config.resolve, options.resolve)
  }
}
