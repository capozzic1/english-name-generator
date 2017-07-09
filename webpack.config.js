var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');
var STYLES_DIR = path.resolve(__dirname, 'src/client/styles');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }, {
        test : /\.scss$/,
        include: STYLES_DIR,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
      test: /\.css$/,
      use: ["style-loader", "css-loader", "postcss-loader"]
      }

      ]
  }
};

module.exports = config;
