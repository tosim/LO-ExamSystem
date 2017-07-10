'use strict';

module.exports = app => {
  class SessionController extends app.Controller {
    * index() {
      this.ctx.body = {
          success:1,
          data:{
              name:'yyc',
              age:21
          },
          msg:''
      };
      
      this.ctx.status = 200;

    }
  }
  return SessionController;
};