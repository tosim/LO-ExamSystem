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
    
  }
  return EnterpriseController;
};