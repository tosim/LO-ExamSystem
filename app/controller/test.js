'use strict';

module.exports = app => {
  class TestController extends app.Controller {
    * count(){
        const results = yield app.mysql.query('select count(*) from user');
        this.ctx.body = results[0]['count(*)'];
    }
  }
  return TestController;
};
