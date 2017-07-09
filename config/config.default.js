'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1499517575542_5800';

  // add your config here

  exports.static = {
    prefix: '/static/',
    dir: path.join(appInfo.baseDir, 'app/static')
  };
  return config;
};
