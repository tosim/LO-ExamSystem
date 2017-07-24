'use strict';

module.exports = app => {
  class TestPaperController extends app.Controller {
    * show() {
        const {ctx} = this;
        ctx.validate({
            p_id:'id'
        },ctx.request.query);
        const result = yield app.mysql.query('select * from testpaper where p_id=? and t_id >= ((SELECT MAX(t_id) from testpaper)-(SELECT MIN(t_id) FROM testpaper)) * RAND() + (SELECT MIN(t_id) FROM testpaper) limit 1',[ctx.request.query.p_id]);
        if(result.length >= 1){
            const testpaper = result[0];
            ctx.body = {
                success:1,
                data:testpaper,
                msg:''
            }
        }else{
            ctx.body = {
                success:1,
                data:null,
                msg:'no testpaper of '+ ctx.request.query.p_id
            }
        }
    }
    
  }
  return TestPaperController;
};