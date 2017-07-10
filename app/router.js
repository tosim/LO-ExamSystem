'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/v1/test',app.controller.v1.test.index);

  // app.resources('users','/api/users',app.controller.api.user);
  app.post('/v1/users',app.controller.v1.user.create);
  app.get('/test/count',app.controller.test.count);
};
