const merge = require('webpack-merge')
const common = require('./webpack.config.common.js')

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
}

module.exports = merge(common, config)
