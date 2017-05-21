const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const OUTPUT_PATH = process.env.OUTPUT_PATH ? process.env.OUTPUT_PATH : 'build';

module.exports = {
  entry: {
    main: ['./src/client/index.js'],
    vendor: [
      'immutable',
      'react',
      'react-dom',
      'react-immutable-proptypes',
      'react-redux',
      'redux',
      'redux-thunk',
    ],
  },
  output: {
    path: path.resolve('./', OUTPUT_PATH),
    filename: 'assets/[name].js',
    chunkFilename: 'assets/[id].js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'react-hot!babel-loader?cacheDirectory',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.less$|\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader!postcss-loader'),
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
    ],
  },
  postcss: () => [autoprefixer],
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 2,
    }),
    new HtmlWebpackPlugin({
      template: 'src/client/index.html',
    }),
    //new CleanWebpackPlugin([OUTPUT_PATH], { root: path.resolve('./'), verbose: true }),
  ],
};
