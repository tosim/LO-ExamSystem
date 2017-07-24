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
            // console.dir(result);
            ctx.session.user = result;
            delete result.u_pass;//不将密码传回客户端
            delete result.u_point;
            // console.log(result.u_id);
            result.u_level = (yield app.mysql.query('select lv_id from user,level where u_id=? and u_point >= lv_need order by lv_id desc limit 1',[result.u_id]))[0].lv_id// 等级
            // console.log(result.u_level);
            ctx.body={
                success:1,
                data:result,
                msg:''
            }
        }
    }

    * show(){
        this.ctx.session.user = yield app.mysql.get('user',{u_id:12});
        const{ctx} = this;
        // if(ctx.session)
        // console.log(ctx.session.user);
        if(ctx.session.hasOwnProperty('user')){
            ctx.body = {
                success:1,
                data:ctx.session.user,
                msg:''
            }
        }else{
            ctx.body = {
                success:0,
                data:null,
                msg:'not login'
            }
        }
        
    }



  }
  return SessionController;
};