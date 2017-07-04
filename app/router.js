
module.exports = app => {
<<<<<<< HEAD
  app.get('/users/create',app.controller.test.createUser);
  app.get('/', 'home.index');
  app.resources('user','/api/users',app.controller.users);
  app.get('/ceshi',app.controller.ceshi.ceshi);
=======
  app.get('/', app.controller.about.index);
  app.get('/about', app.controller.about.index);
>>>>>>> master
};
