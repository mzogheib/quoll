const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.config.common.js')

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    stats: 'minimal',
    port: process.env.PORT || 3000,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: path.resolve(__dirname),
        use: ['eslint-loader', 'stylelint-custom-processor-loader'],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
}

module.exports = merge(common, config)
