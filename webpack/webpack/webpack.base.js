const path = require('path')
const projectDir = path.resolve(__dirname, '../')
const distDir = path.resolve(__dirname, '../dist/resources')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const isProduction = process.env.NODE_ENV === 'production'
const cssStyles = [
  { loader: isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader' },
  { loader: 'css-loader' },
  { loader: 'postcss-loader' },
]
const scssStyles = cssStyles.slice()
scssStyles.push({ loader: 'sass-loader' })

module.exports = {
  mode: 'development',
  context: projectDir,
  entry: {
    main: './src/app.js'
  },
  output: {
    path: distDir,
    filename: '[name].js',
    /**
     * path：文件打包后存放的位置
     * publicPath: 文件发布后存放的位置
     * 如值为'/dev', 生成的html内容为：
     * <script type="text/javascript" src="/dev/vendor.js"></script>
     * 引用的asset资源也会变成/dev开头
     * 如图片变成:/dev/[md5].png
     * 为'/'时：<script type="text/javascript" src="/vendor.js"></script>
     * /与''的区别不大，默认为''
     *
     * 在开发环境publicPath可以不配
     * 在生产环境配成vendor.js所在的具体目录，如/dev
     * index.html
     * dev
     *  vendor.js
     *
     * 这里配成/resources，即所有的文件都打到了dist/resources下面，
     * dev server也必须将publicPath配成/resources才能访问到index.html
     */
    publicPath: '/resources'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.vue', '.js']
  },
  optimization: {
    /**
     * 生成一个每个chunk都需要的运行时公共块，比如它里面定义了webpackJsonp，
     * 每个模块都需要用它来加载依赖模块
     */
    runtimeChunk: { name : 'runtime' },
    /**
     * 根据模块的大小、被引用次数来决定是否将该模块生成一个公共的块
     * 如
     * a.js 引用utils.js, help.js
     * b.js 引用utils.js
     * 那么utils.js被引用了两次，可以为它生成一个公共的块
     *
     * chunks: 'all'  all、async、initial  async处理异步加载的块、all处理所有情况的块
     * minSize:30000  默认情况，一个模块超过30k就会生成一个块
     * minChunks： 1  代码块被引用的最小次数
     *
     * splitChunks的作用感觉就是合并文件，如下面将node_modules下的js合并成vendor.js
     * 将所有的css合并到styles.css
     *
     * 如果vendor.test = /node_modules/的话，会生成vendor.css，
     * 它会将node_modules的样式文件合成一个
     */
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules.*\.js$/,
          name: 'vendor',
          chunks: 'all'
        },
        /**
         * 如果vendor.test=/node_modules.*\.js$/js，它可以将所有的css生成一个文件,
         * 如果vendor.test=/node_modules/会生成两个css文件
         * vendor.css
         * main.css,此时配不配styles都一样
         * 生成css文件靠的是MiniCssExtractPlugin
         */
        styles: {
          test: /\.(scss|css)/,
          name: 'styles',
          chunks: 'all'
        }
      }
    }
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
        use: scssStyles
      },
      {
        test: /\.css$/,
        use: cssStyles
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
            loader: 'file-loader',
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
    new ManifestPlugin(),
    /**
     * 在编译时先清除dist目录
     */
    new cleanWebpackPlugin(['dist'], { root: projectDir }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      /**
       * 默认相对于output.path对应的目录，../index.html可以向上一级
       * 在这里就是dist/index.html
       */
      filename: 'index.html'
    })
  ]
}
