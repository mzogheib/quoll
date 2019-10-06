const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.config.common.js')

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: path.resolve(__dirname),
        use: ['eslint-loader', 'stylelint-custom-processor-loader'],
      },
    ],
  },
}

module.exports = merge(common, config)
