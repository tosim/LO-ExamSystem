'use strict';

module.exports = app => {
  class TestController extends app.Controller {
    * index() {
      this.ctx.body = {
          success:1,
          data:{
              name:'yyc',
              age:21
          },
          code:0
      };
      
      this.ctx.status = 200;

    }
  }
  return TestController;
};