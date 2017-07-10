'use strict';

const path = require('path');

module.exports = appInfo => {
  const exports = {};

  // should change to your own
  exports.keys = appInfo.name + '_1499517575542_5800';

  // add your config here
  exports.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'public')
  };

  exports.mysql = {
    // database configuration
    client: {
      // host
      host: '127.0.0.1',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: '056210',
      // database
      database: 'lo_examsystem',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  return exports;
};
