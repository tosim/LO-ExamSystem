
module.exports = app => {
  app.post('/v1/users',app.controller.v1.user.create);//新建用户
  app.post('/v1/sessions',app.controller.v1.session.create)//新建session，用户登录
  app.get('/v1/sessions',app.controller.v1.session.show)//判断用户是否登录
  app.get('/v1/testpapers',app.controller.v1.testpaper.show);

  app.get('/v1/questions',app.controller.v1.question.index);//考试抽题，random，taged，返回试题列表
  app.post('/v1/questions',app.controller.v1.question.create);//录入题目

  app.get('/', app.controller.home.index);
  app.get('/v1/test',app.controller.v1.test.index);
  app.get('/test/count',app.controller.test.count);
  app.post('/v1/test',app.controller.v1.test.index);
  app.get('/test/select',app.controller.test.select);
  app.get('/test/asyncFunc',app.controller.test.asyncFunc);
  app.get('/test/randomSelect',app.controller.test.randomSelect);
  app.get('/test/randomTest',app.controller.v1.question.index);//
  app.get('/test/testapp',app.controller.test.testapp);
  app.post('/v1/upload',app.controller.v1.upload);
  //题目相关
  app.get('/v1/questions/index',app.controller.v1.question.index);//随机抽题
  app.get('/v1/questions/topic',app.controller.v1.question.topic);//专题抽题
  app.post('/v1/questions/bash',app.controller.v1.question.createBash);//批量导入
  app.post('/addquestion', app.controller.v1.question.create);  //单题录入
  app.get('/getquestionlist', app.controller.v1.question.list); 
  app.get('/getquestionlistorderbyzan', app.controller.v1.question.listorderbyzan);
  app.get('/getquestionlistorderbycai', app.controller.v1.question.listorderbycai);
  app.get('/getquestionlistbytag',app.controller.v1.question.getlistbytag);
  app.get('/getquestionlistbytype',app.controller.v1.question.getlistbytype);
  app.get('/getquestionbyid',app.controller.v1.question.getquestionbyid);
  app.get('/updatequestion',app.controller.v1.question.updatequestion);
  app.get('/deletequestion',app.controller.v1.question.deletequestion);


  //职业相关
  // app.post('/addprofession',app.controller.v1.profession.create); //添加职业
  // app.get('/getprofessionlist',app.controller.v1.profession.index);
  // app.post('/addtag',app.controller.v1.tag.create); //添加标签
  // app.get('/gettaglist',app.controller.v1.tag.index);
};



