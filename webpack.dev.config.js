'use strict'
const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const autoprefixer = require('autoprefixer')

const config = {
  mode: 'development',
  entry: './src/main.js',
  resolve: {
    // 配置别名，在项目中可缩减引用路径
    alias: {
      src: join(__dirname, '/src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(less|scss|css)$/,
        use: [{
          loader: 'vue-style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: [
              autoprefixer,
            ],
          }
        }, {
          loader: 'less-loader',
        }, {
          loader: 'sass-loader',
        }],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    })
  ],
  devServer: {
    host: '127.0.0.1',
    port: 8020,
    historyApiFallback: false,
    noInfo: true,
    open: true
  },
  devtool: '#eval-source-map'
}

module.exports = config
