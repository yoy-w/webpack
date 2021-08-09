const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // html 打包的模板
const { CleanWebpackPlugin } = require('clean-webpack-plugin') //清除打包文件的插件
const webpack = require('webpack')

// Tree Shaking 只支持 ES Module 

module.exports = {
  // publicPath: './',
  mode: 'production',         //打包模式
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
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    // publicPath: './',
    contentBase: './dist',
    port: 9000, //端口
    open: true, //自动打开浏览器
    hot: true, // 热更新
    hotOnly: true
  },
  optimization: {
    // 配置 tree shaking
    useExports: true
  }

}