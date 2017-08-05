'use strict';

module.exports = app => {
  class EnterpriseController extends app.Controller {
    * index() {
        const {ctx} = this;
        const result = yield app.mysql.select('enterprise');
        console.log(result);
        if(result !== null && result.length != 0){
            for(let i = 0;i < result.length;i++){
                result[i].isSelect = false;
            }
            ctx.body = {
                success:1,
                data:result,
                msg:''
            }
        }else{
            ctx.body = {
                success:0,
                data:null,
                msg:'no rows'
            }  
        }
    }
    
    * create() {
      const {ctx} = this;
      console.log(ctx.request.body);
      ctx.validate({
        e_name:'string',
        e_email:'email',
        e_pass:{
          type:'password',
          compare:'re_pass'//两个密码相同才验证通过
        },
        e_phone:'string',
        e_address:'string'
      });
      const req = ctx.request.body;
      const check = yield app.mysql.get('enterprise',{e_email:req.e_email});
      if(check == null){
        const result = yield app.mysql.insert('enterprise',{
          e_name:req.e_name,
          e_email:req.e_email,
          e_pass:req.e_pass,
          e_phone:req.e_phone,
          e_address:req.e_address
        });
        req.e_id = result.insertId;
        delete req.re_pass;
        ctx.session.enterprise = req;
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
  }
  return EnterpriseController;
};