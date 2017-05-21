const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  output: {
    filename: 'assets/[name].[hash].js',
    chunkFilename: 'assets/[id].[hash].js',
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        'drop_console': true,
      },
    }),
    new ExtractTextPlugin('assets/[name].[hash].css', { allChunks: true }),
  ],
};
