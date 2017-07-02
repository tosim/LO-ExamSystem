'use strict';

module.exports = app => {
  app.get('/users/create',app.controller.test.createUser);
  app.get('/', 'home.index');
  app.resources('user','/api/users',app.controller.users);
  app.get('/ceshi',app.controller.ceshi.ceshi);
};
