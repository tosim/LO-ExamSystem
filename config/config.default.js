const path = require('path');
const fs = require('fs');
module.exports = app => {
  const exports = {};
  exports.keys = app.name + '_1499517575542_5800';
  exports.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/favicon.ico'))
  };
  exports.view = {
    cache: false
  };
  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs')
  };
  exports.static = {
    prefix: '/public/',//   '/public/'
    dir: path.join(app.baseDir, 'public')
  };

  //add my config
  exports.middleware = [
    'access','saveSession'
  ];


  exports.security = {
    csrf: false,
    ctoken: false
  }

  exports.mysql = {
    // database configuration
    client: {
      // host
      host: '127.0.0.1',
      // port
      port: '3307',
      // username
      user: 'root',
      // password
      password: '',
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
