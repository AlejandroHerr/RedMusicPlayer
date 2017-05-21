//const path = require('path');
/*const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');*/
const webpack = require('webpack');

const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const path = require('path');
const fs = require('fs');
const nodeModules = {};

fs.readdir('node_modules', (err, files) => {
  if (err) {
    return console.log(err);
  }

  return files
    .filter((x) => ['.bin'].indexOf(x) === -1)
    .forEach((mod) => {
      nodeModules[mod] = `commonjs ${mod}`;
    });
});

module.exports = {
  entry: './src/server/index.js',
  target: 'node',
  output: {
    filename: './build/server/index.js',
  },
  externals: nodeModules,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: [
      '',
      '.js',
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(ENV),
      '__DEV__': JSON.stringify(ENV === 'development'),
    }),
  ],
};
