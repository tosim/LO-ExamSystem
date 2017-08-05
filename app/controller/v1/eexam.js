'use strict';

module.exports = app => {
  class EExamController extends app.Controller {
    * index() {

    }

    * show(){
        const {ctx} = this;
        var e_id = ctx.params.e_id;
        console.log('e_id = ' + e_id);
        const result = yield app.mysql.query('select e_exam.*,enterprise.e_name,profession.p_name from e_exam,enterprise,profession where profession.p_id=e_exam.p_id and e_exam.e_id=? and e_exam.e_id=enterprise.e_id',[e_id]);
        console.log(result);
        ctx.body = {
          success:1,
          data:result,
          msg:''
        }
    }    
  }
  return EExamController;
};