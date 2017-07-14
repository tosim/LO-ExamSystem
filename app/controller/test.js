'use strict';

var EventProxy = require('eventproxy');

module.exports = app => {
  class TestController extends app.Controller {
    * count(){
        const results = yield app.mysql.query('select count(*) from user');
        this.ctx.body = results[0]['count(*)'];
    }

    * select(){
      const results = yield app.mysql.select('user');
      this.ctx.body = results;
    }
    * asyncFunc(){
        const len = 50000;
        var pending = [];
        for(let i = 0;i < len;i++){
          pending.push(app.mysql.get('user',{u_id:999}));
        }
        pending.push(app.mysql.get('user',{u_name:'test5'}));
        pending.push(app.mysql.get('user',{u_name:'test5'}));
        // console.log(pending);
        const results = yield Promise.all(pending);
        this.ctx.body = results;
    }
    * addTestPaper(){
      this.ctx.body = yield app.mysql.insert('');
    }
    * randomSelect(){
      // this.ctx.body = yield app.mysql.query('SELECT * FROM user AS t1  JOIN (SELECT ROUND(RAND() * ((SELECT MAX(u_id) FROM `user`)-(SELECT MIN(u_id) FROM user))+(SELECT MIN(u_id) FROM user)) AS u_id) AS t2 WHERE t1.u_id >= t2.u_id ORDER BY t1.u_id LIMIT 1');
      // this.ctx.body = yield app.mysql.query('SELECT * FROM user WHERE u_id >= ((SELECT MAX(u_id) FROM user)-(SELECT MIN(u_id) FROM user)) * RAND() + (SELECT MIN(u_id) FROM user)  LIMIT 5');
      var sql = 'SELECT * FROM question,que_tag WHERE tag_id=? OR tag_id=? AND que_tag.q_id=question.q_id AND question.q_type=? '
      // +'AND q_right/(q_right+q_wrong) >= ((?-?) * RAND() + ?) '
      // +'AND q_right/(q_right+q_wrong) <= ? '
      +'AND question.q_id >= ((SELECT MAX(q_id) FROM question)-(SELECT MIN(q_id) FROM question)) * RAND() + (SELECT MIN(q_id) FROM question) '
      +'AND abs(q_difficulty-?) <= 1 '
      +'LIMIT ?';
      // this.ctx.body = yield app.mysql.query('SELECT * FROM question,que_tag'+ 
      // 'WHERE que_tag.tag_id=? AND que_tag.q_id=question.q_id AND question.q_type=?'
      // // 'AND q_right/(q_right+q_wrong) >= ((SELECT MAX(q_right/(q_right+q_wrong)) FROM question)-(SELECT MIN(q_right/(q_right+q_wrong)) FROM question)) * RAND() + (SELECT MIN(q_right/(q_right+q_wrong)) FROM question)  LIMIT 5'
      // ,[1,1]);
      const difficulty = 5,num = 5;
      this.ctx.body = yield app.mysql.query(sql,[1,1,2,difficulty,num]);
  }
  }
  return TestController;
};



// SELECT * FROM question,que_tag WHERE que_tag.tag_id=1 AND que_tag.q_id=question.q_id AND question.q_type=1