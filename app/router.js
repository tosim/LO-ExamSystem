'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/api/test',app.controller.api.test.index);
};
