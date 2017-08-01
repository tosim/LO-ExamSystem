'use strict';

module.exports = app => {
  class UserController extends app.Controller {
      * show(){
     
      }
      
    //用户注册
    * create() {
      const {ctx} = this;
      console.log(ctx.request.body);
      ctx.validate({
        u_name:'string',
        u_email:'email',
        u_pass:{
          type:'password',
          compare:'re_pass'//两个密码相同才验证通过
        },
        p_id:'id'
      });
      const req = ctx.request.body;
      const check = yield app.mysql.get('user',{u_email:req.u_email});
      if(check == null){
        const result = yield app.mysql.insert('user',{
          u_name:req.u_name,
          u_email:req.u_email,
          u_pass:req.u_pass,
          p_id:parseInt(req.p_id),
          u_point:0
        });
        req.u_id = result.insertId;
        delete req.re_pass;
        req.u_level = 1;
        ctx.session.user = req;
        delete req.u_pass;
        ctx.body = {
          success:1,
          data:req,
          msg:''
        }
      }else{
        ctx.body = {
          success:0,
          data:null,
          msg:'duplicated user in email field'
        }
      }
      
    }

    //用户修改资料，put/：id
    * update() {
      const {ctx} = this;
      console.log(ctx.request.body);
      ctx.validate({
        u_id:'int',
        enterprise:'array',
        p_id:'int',
        u_name:'string'
      });

      const row = {
        u_name: ctx.request.body.u_name,
        p_id:ctx.request.body.p_id
      };
      var result = yield app.mysql.update('user', row,{
        where:{ u_id: ctx.request.body.u_id}
      });
      console.log(result);
      result = yield app.mysql.delete('u_e',{u_id:ctx.request.body.u_id});
      for(let i = 0;i < ctx.request.body.enterprise.length;i++){
        result = yield app.mysql.insert('u_e',{u_id:ctx.request.body.u_id,e_id:ctx.request.body.enterprise[i].e_id});
      }
      ctx.body = {
        success:1,
        data:'update ok',
        msg:''
      }
    }
    
  }
  return UserController;
};