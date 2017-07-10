'use strict';

module.exports = app => {
  class UserController extends app.Controller {
    * show() {

    }
    //用户注册
    * create() {
      const {ctx} = this;
      console.log(ctx.request.body);
      
      ctx.body = {
        success:1,
        data:{},
        msg:""
      }
    }

    //用户修改资料，put/：id
    * update() {
        
    }
  }
  return UserController;
};