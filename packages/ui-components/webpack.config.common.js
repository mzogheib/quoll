const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    // Required in order to import components like: import { Button } from '@quoll/ui-components'
    libraryTarget: 'commonjs-module',
  },
  externals: [
    function (context, request, callback) {
      if (/^(ui-themes|react|react-dom|styled-components)$/.test(request)) {
        return callback(null, 'commonjs ' + request)
      }
      callback()
    },
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin()],
}
