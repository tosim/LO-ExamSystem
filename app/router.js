
module.exports = app => {
  app.post('/v1/users',app.controller.v1.user.create);//新建用户
  app.post('/v1/sessions',app.controller.v1.session.create)//新建session，用户登录
  app.get('/v1/questions',app.controller.v1.question.index);//考试抽题，random，taged，返回试题列表

  app.get('/', 'home.index');
  app.get('/v1/test',app.controller.v1.test.index);
  app.get('/test/count',app.controller.test.count);
  app.post('/v1/test',app.controller.v1.test.index);
};
