'use strict';

module.exports = app => {
  class QuestionController extends app.Controller {
    //1.随机考试，2.专项训练;返回试题列表？type='random' or 'taged'
    * index(){
        const {ctx} = this;
        ctx.validate({
            type:['random','taged'],
            time:['1','2','3'],
            difficulty:['1','2','3']
        },ctx.request.query);

        
        const req = ctx.request.query;
        ctx.body = {
            success:1,
            data:req,
            msg:''
        }
    }




  }
  return QuestionController;
};