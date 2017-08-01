'use strict';

module.exports = app => {
  class ProfessionController extends app.Controller {
    * index() {
        const {ctx} = this;
        const result = yield app.mysql.select('profession');
        console.log(result);
        if(result !== null && result.length != 0){
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
  return ProfessionController;
};