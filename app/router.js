
module.exports = app => {
  app.post('/v1/users',app.controller.v1.user.create);//新建用户
  app.post('/v1/sessions',app.controller.v1.session.create)//新建session，用户登录
  app.get('/v1/sessions',app.controller.v1.session.show)//判断用户是否登录
  app.get('/v1/testpapers',app.controller.v1.testpaper.show);//获取不同职业的考试试卷分布
  app.get('/v1/enterprises',app.controller.v1.enterprise.index);//获取所有的入驻企业
  app.get('/v1/professions',app.controller.v1.profession.index);//获取所有的职业
  app.put('/v1/users',app.controller.v1.user.update);//更新用户
  app.get('/v1/others',app.controller.v1.others.index);//获取个人履历
  app.post('/v1/others',app.controller.v1.others.create);//创建一条履历
  app.put('/v1/others',app.controller.v1.others.update);//创建一条履历
  app.del('/v1/others/:o_id',app.controller.v1.others.destory);//删除一条履历记录
  app.get('/v1/u_que/tags',app.controller.v1.uque.getTags);//获取用户错题中的tags
  app.post('/v1/u_que',app.controller.v1.uque.index);//根据筛选条件获取错题
  app.get('/v1/quecollection/tags',app.controller.v1.quecollection.getTags);//获取用户收藏题中的tags
  app.post('/v1/quecollection',app.controller.v1.quecollection.index);//根据筛选条件获取收藏的题目
  app.post('/v1/judge',app.controller.v1.judge.index);//判题
  app.get('/v1/examhistory',app.controller.v1.examhistory.index);//获取用户考试记录列表
  app.get('/v1/examhistory/:h_id',app.controller.v1.examhistory.show);//获取单场考试记录
  app.get('/v1/examhistory/upoints/:u_id',app.controller.v1.examhistory.u_pointChanges);//获取单场考试记录
  app.get('/v1/examhistory/utags/:u_id',app.controller.v1.examhistory.u_tagsRatio);//获取单场考试记录
  app.get('/v1/rank',app.controller.v1.rank.index);//获取榜单数据
  app.get('/v1/rank/list',app.controller.v1.rank.list);//获取榜单数据
  app.get('/v1/rank/single',app.controller.v1.rank.show);//获取榜单数据


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



