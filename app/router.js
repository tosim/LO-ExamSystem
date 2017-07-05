
module.exports = app => {
  app.get('/', app.controller.about.index);
  app.get('/about', app.controller.about.index);
  app.get('/user',app.controller.user.index);
};
