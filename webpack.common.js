const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // html 打包的模板
const { CleanWebpackPlugin } = require('clean-webpack-plugin') //清除打包文件的插件

// 第一种方式
// main.js 2mb
// 打包文件大，加载时间长
// main.js 2mb
// 重新访问页面，又需要加载2mb

// 第二种方式
// main.js 被拆分2部分， lodash.js (1MB), main.js(1MB)
// 当页面业务逻辑发生变化时,只需要加载main.js即可(1MB)

// Code splitting  代码分割
// webpack 中实现代码分割，两种方式
// 1.同步代码 只需要在wbepack.common.js 中 optimization 中配置
// 2.异步代码(import),无需做配置，会自动进行代码分割



module.exports = {
  entry: './src/index.js',    //入口文件 
  output: {                   //出口文件
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    // loader
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      }
    ]
  },
  //  plugins
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: './index.html'
      }
    ),
    new CleanWebpackPlugin()
  ],
} 