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
        const len = 5;
        var pending = [];
        // for(let i = 0;i < len;i++){
          pending.push(app.mysql.get('user',{u_id:999}));
        // }
        pending.push(app.mysql.get('user',{u_name:'test5'}));
        pending.push(app.mysql.get('user',{u_name:'test5'}));
        console.log(pending);
        const results = yield Promise.all(pending);
        // this.ctx.body = results;
    }
  }
  return TestController;
};
