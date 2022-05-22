const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
        hash: true,
        title: 'wasted potential',
        metaDesc: 'just a weird interactive anagram swapping thingy',
        template: './src/index.html',
        filename: 'index.html',
        inject: 'body'
    })
  ],
  mode: 'development',
  // output: {
  //   clean: true
  // },
  devServer: {
    static: './dist',
    open: true
  }
};