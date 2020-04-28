const path = require('path')
const projectDir = __dirname
const distDir = path.resolve(__dirname, 'dist')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const cssStyles = [
  { loader: isProduction ? MiniCssExtractPlugin.loader : 'tyle-loader' },
  { loader: 'css-loader' },
  { loader: 'postcss-loader' }
]
const scssStyles = cssStyles.slice()
scssStyles.push({ loader: 'sass-loader' })

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  context: projectDir,
  entry: {
    main: './src/app.ts'
  },
  output: {
    path: distDir,
    filename: '[name].js'
  },
  resolve: {
    extensions: [ '.ts', '.json'],
  },
  optimization: {
    runtimeChunk: { name: 'runtime' },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules.*\.js$/,
          name: 'vendor',
          chunks: 'all'
        },
        styles: {
          test: /\.(scss|css)/,
          name: 'styles',
          chunks: 'all'
        }
      }
    }
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          { loader: 'ts-loader' }
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
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]
}
