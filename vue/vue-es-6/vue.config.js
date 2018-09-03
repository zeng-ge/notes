module.exports = {
  configureWebpack: {
    devtool: 'cheap-module-source-map',
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js'
      }
    }
  }
}
