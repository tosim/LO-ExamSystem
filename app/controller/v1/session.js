'use strict';

module.exports = app => {
  class SessionController extends app.Controller {
    * create(){
        const{ctx} = this;
        ctx.validate({
            u_email:'email',
            u_pass:'password'
        });

        const req = ctx.request.body;
        const result = yield app.mysql.get('user',{u_email:req.u_email,u_pass:req.u_pass});
        
        if(result == null){
            ctx.body={
                success:0,
                data:null,
                msg:'user not exists'
            }
        }else{
            const result = yield app.mysql.get('user',{u_email:req.u_email});
            console.dir(result);
            ctx.session.user = result;
            delete result.u_pass;//不将密码传回客户端
            ctx.body={
                success:1,
                data:result,
                msg:''
            }
        }
    }





  }
  return SessionController;
};