'use strict';

module.exports = app => {
  class SessionController extends app.Controller {
    * create(){
        const{ctx,service} = this;
        ctx.validate({
            u_email:'email',
            u_pass:'password'
        });
        
        const req = ctx.request.body;

        const result = yield service.v1.user.show(req.u_email,req.u_pass);
        
        ctx.session.user = result;

        ctx.body = {
            success:result == null ? 0 : 1,
            data:result,
            msg:result == null ? 'no such user' : ''
        }
    }

    * show(){
        //test start 模拟已经登录了
        this.ctx.session.user = yield this.service.v1.user.show('82415327@qq.com','056210');
        //test end

        const{ctx} = this;
        const result = ctx.session.hasOwnProperty('user');
        ctx.body = {
            success:result == false ? 0 : 1,
            data:ctx.session.user,
            msg:result == false ? 'no login' : ''
        }
    }



  }
  return SessionController;
};