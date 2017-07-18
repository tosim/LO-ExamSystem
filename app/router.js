
module.exports = app => {
  app.post('/v1/users',app.controller.v1.user.create);//新建用户
  app.post('/v1/sessions',app.controller.v1.session.create)//新建session，用户登录
  app.get('/v1/questions',app.controller.v1.question.index);//考试抽题，random，taged，返回试题列表
  app.post('/v1/questions',app.controller.v1.question.create);//录入题目

  app.get('/', 'home.index');
  app.get('/v1/test',app.controller.v1.test.index);
  app.get('/test/count',app.controller.test.count);
  app.post('/v1/test',app.controller.v1.test.index);
  app.get('/pager',app.controller.home.home.pager);
  app.get('/test/select',app.controller.test.select);
  app.get('/test/asyncFunc',app.controller.test.asyncFunc);





  app.post('/addquestion', app.controller.v1.question.create);
  app.get('/getquestionlist', app.controller.v1.question.list);
  app.get('/getquestionlistorderbyzan', app.controller.v1.question.listorderbyzan);
  app.get('/getquestionlistorderbycai', app.controller.v1.question.listorderbycai);
  app.get('/getquestionlistbytag',app.controller.v1.question.getlistbytag);
  app.get('/getquestionlistbytype',app.controller.v1.question.getlistbytype);
  app.get('/getquestionbyid',app.controller.v1.question.getquestionbyid);
  app.get('/updatequestion',app.controller.v1.question.updatequestion);
  app.get('/deletequestion',app.controller.v1.question.deletequestion);



  app.post('/addprofession',app.controller.v1.profession.create);
  app.get('/getprofessionlist',app.controller.v1.profession.index);
  app.get('/deleteprofession',app.controller.v1.profession.deleteprofession);
  app.post('/addtag',app.controller.v1.tag.create);
  app.get('/gettaglist',app.controller.v1.tag.index);
  app.get('/getalltag',app.controller.v1.tag.getalltag);
};



