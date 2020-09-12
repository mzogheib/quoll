const { merge } = require('webpack-merge')
const common = require('./webpack.config.common.js')

const config = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'static/[name].[hash].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}

module.exports = merge(common, config)
