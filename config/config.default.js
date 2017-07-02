const path = require('path');

module.exports = app => {
  const exports = {};


  exports.view = {
    cache: false
  };

  exports.vuessr = {
    layout: path.join(app.baseDir, 'app/view/view/layout.html')
  };

  exports.keys = app.name + '_1498971103875_1650';

  exports.middleware = [
    'access'
  ];

  return exports;
};
