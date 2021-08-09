const webpack = require('webpack')
const { merge } = require('webpack-merge')   // merge 合并配置
const commonConfig = require('./webpack.common.js')

// Tree Shaking 只支持 ES Module 

// code splitting  代码分割

const devConfig = {
  mode: 'production',         //打包模式
  //  plugins
  plugins: [

    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    // publicPath: './',
    contentBase: './dist',
    port: 9000,
    open: true,
    hot: true,
    // hotOnly: true
  },
  optimization: {
    // 配置 tree shaking
    usedExports: true
  }
}

module.exports = merge(commonConfig, devConfig)