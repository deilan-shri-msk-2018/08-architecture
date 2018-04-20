const config = require('./webpack.config');

module.exports = {
  ...config,
  mode: 'development',
  devServer: {
    port: 3000,
    open: true
  }
};
