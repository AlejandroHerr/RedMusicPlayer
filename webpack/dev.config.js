const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('assets/[name].css', { allChunks: true }),
  ],
};
