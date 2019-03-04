const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const sassVars = require('/src/theme.js')
const sass = require('node-sass')
const sassUtils = require('node-sass-utils')(sass)

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      { test: /\.s(a|c)ss$/, use: [
        {loader: 'style-loader'},
        {loader: 'css-loader'},
        {
          loader: 'sass-loader',
          options: {
            functions: {
              'get($keys)': function(keys) {
                keys = keys.getValue().split('.')
                let result = sassVars
                let i
                for (i = 0; i < keys.length; i++) {
                  result = result[keys[i]]
                }
                result = sassUtils.castToSass(result)
                return result
              }
            }
          }
        }
      ]}
    ]
  },
  devServer: {
    contentBase: path.resolve('src'),
    hot: true,
    open: true,
    port: 8000,
    watchContentBase: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        secure: false
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'assets' }
    ])
  ]
}
