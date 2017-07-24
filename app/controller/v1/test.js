'use strict';

module.exports = app => {
  class TestController extends app.Controller {
    * index() {
      this.ctx.validate({
        id:'id'
      });
      console.log(this.ctx.request.body);

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
  return TestController;
};