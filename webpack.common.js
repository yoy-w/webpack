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
    // filename: 'bundle.js',
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
  optimization: {
    // 默认配置项
    splitChunks: {
      chunks: 'all',  // [async,initial,all]  all需要配置cacheGroups参数
      minSize: 20000,   // 引入的文件大于20000字节 才做代码分割
      maxSize: 50000,   // 会进行代码拆分 
      minRemainingSize: 0,
      minChunks: 1,     // 最少使用的次数
      maxAsyncRequests: 30, // 同时加载的类库
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,  // 参数的权重
          filename: 'vendors.js',
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20, // 参数的权重
          filename: 'common.js',
          reuseExistingChunk: true, // 如果一个模块已经被打包过了,就忽略这个模块，直接使用之前的模块
        },
      }
    }
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