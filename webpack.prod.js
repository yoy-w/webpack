const { merge } = require('webpack-merge')
const commonConfig = require('webpack.common.js')
// Tree Shaking 只支持 ES Module 

const prodConfig = {
  mode: 'production',         //打包模式
  devtool: 'cheap-module-source-map',  // source-map 的映射
}

module.exports = merge(commonConfig, prodConfig)