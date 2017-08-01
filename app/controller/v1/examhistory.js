'use strict';

module.exports = app => {
  class ExamHistoryController extends app.Controller {
    * index() {
      const {ctx} = this;
      this.ctx.validate({
        u_id:'id'
      },ctx.request.query);
    //   console.log(this.ctx.request.body);

      const result = yield app.mysql.select('examhistory',{
          where:{u_id:ctx.request.query.u_id}
      });
      this.ctx.body = {
          success:1,
          data:result,
          msg:''
      }
    }
    
    * show(){
        const {ctx} = this;
        const h_id = ctx.params.h_id;
        console.log(h_id);
        var result = yield app.mysql.get('examhistory',{
            h_id:h_id
        });
        result = JSON.parse(result.h_data);
        ctx.body = {
            success:1,
            data:result,
            msg:''
        }
    }

    * u_pointChanges(){
        const {ctx} = this;
        const u_id = ctx.params.u_id;
        const result = yield app.mysql.query('select h_date,u_point from examhistory where u_id=? order by h_date',[u_id]);

        ctx.body = {
            success:1,
            data:result,
            msg:''
        }
    }

    * u_tagsRatio(){
        const {ctx} = this;
        const u_id = ctx.params.u_id;
        const result = yield app.mysql.query('select tag_name,ut_right,ut_wrong from u_tag,tag where u_id=? and u_tag.tag_id=tag.tag_id',[u_id]);

        ctx.body = {
            success:1,
            data:result,
            msg:''
        }
    }
  }
  return ExamHistoryController;
};