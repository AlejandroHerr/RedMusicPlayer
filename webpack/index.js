const merge = require('webpack-merge');
const base = require('./base.config');
const dev = require('./dev.config');
const prod = require('./prod.config');

const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

if (ENV === 'development') {
  module.exports = merge(base, dev);
}
else {
  module.exports = merge(base, prod);
}
