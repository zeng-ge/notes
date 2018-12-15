const path = require('path')
const projectDir = path.resolve(__dirname, '../')
const distDir = path.resolve(__dirname, '../dist')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
console.error(projectDir)
module.exports = {
  mode: 'development',
  context: projectDir,
  entry: {
    main: './src/app.js'
  },
  output: {
    path: distDir,
    filename: '[name].js',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.vue', '.js']
  },
  module: {
    rules: [
      /**
       * 对于webpack4, vue-loader的版本需要>14，否则会指错，说vue找不到
       *
       * vue-loader在编译本地vue模板时，要依赖vue-template-compiler
       *
       * vue-loader 15又有大的改动，必须和VueLoaderPlugin结合使用
       */
      {
        test: /\.vue$/,
        use: [
          { loader: 'vue-loader' }
        ]
      },
      {
        test: /\.js$/,
        use: [
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'vue-style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ]
      },
      /***
       *
       */
      {
        test: /\.png|\.jpg/,
        use: [
          {
            /***
             * 当文件小于8192时，会返回base64的DataURL
             * 当文件大于8192时会使用file-loader作为fallback
             * file-loader的作用是将对应文件复制到dist, 但是文件名会变成md5
             * 即
             * options: {
             *  limit: 8192,
             *  fallback: 'file-loader
             * }
             */
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    /**
     * 在编译时先清除dist目录
     */
    new cleanWebpackPlugin(['dist'], { root: projectDir }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
