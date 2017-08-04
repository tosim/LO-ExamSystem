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
    
    * create() {
            const { ctx, service } = this;
            const createRule = {
               p_name:'string',
               testpaper:'object',
               tag:'object',
            };
            ctx.validate(createRule);
            console.log(ctx.request.body);
            const p_name = ctx.request.body.p_name;
            console.log(p_name);
            const testpaper = ctx.request.body.testpaper;
            const tag = ctx.request.body.tag;
            // console.log(p_name);
            const insertId = yield service.v1.profession.create(p_name);
            console.log(typeof insertId);
            if (typeof insertId === 'number') {
                for(let value of testpaper){
                    var insertSuccess1 =  yield service.v1.profession.insertpaper(insertId, value);
                };
                for(let value of tag){
                    var insertSuccess2 = yield service.v1.profession.insertprotag(insertId, value);
                };
                if (insertSuccess1 && insertSuccess2) {
                    ctx.response.body = {
                        success: 1,
                        data: '',
                        msg: '添加职业成功',
                    }
                } else {
                    ctx.response.body = {
                        success: 0,
                        data: '',
                        msg: '创建职业失败',
                    }
                }
            } else {
                ctx.response.body = {
                    success: 0,
                    data: '',
                    msg: '创建职业失败',
                }
            }
        }
        * list(){
            const { ctx, service } = this;
            const curr = parseInt(ctx.query.page);
            const pagesize = 8;
            const currnum = (curr - 1) * pagesize;
            const professionnum = (yield service.v1.profession.getprofessionnum())[0].pnum;
            let ProfessionList = yield service.v1.profession.index(currnum);
            for(let item of ProfessionList){
              const testpaper = yield service.v1.profession.getpaperbyid(item.p_id);
              const tag = yield service.v1.profession.gettagbyid(item.p_id);
              item.testpaper = testpaper;
               item.tag = tag; 
            }

            const totalnum = Math.ceil(professionnum / pagesize);
            if (ProfessionList.length == 0) {
                ctx.response.body = {
                    success: 0,
                    data: '',
                    msg: '列出职业失败',
                };
            } else {
                ctx.response.body = {
                    success: 1,
                    data: {
                        professionlist: ProfessionList,
                        totalnum: totalnum
                    },
                    msg: '列出职业成功',
                };
            }
        }

        * updateprofession(){
            const {ctx,service} = this;
            console.log(ctx.request.body);
            const result = yield service.v1.profession.updateprofession(ctx.request.body);
            console.log(result);
            if (result) {
                ctx.response.body = {
                    success: 1,
                    data: '',
                    msg: '更新成功',
                }
            } else {
                ctx.response.body = {
                    success: 0,
                    data: '',
                    msg: '更新失败',
                }
            }
        }
        * deleteprofession(){
            const { ctx, service } = this;
            const deleteSuccess = yield service.v1.profession.deleteprofession(ctx.query.p_id);
            if (deleteSuccess) {
                ctx.response.body = {
                    success: 1,
                    data: '',
                    msg: '删除成功',
                }
            } else {
                ctx.response.body = {
                    success: 0,
                    data: '',
                    msg: '删除失败',
                }
            }
        }
        * parsequestion(){
            if(res.status === 200 && res.data.success === 1){  
                res = res.data.data;
                for (let i = 0; i < res.length; i++) {
                    if (res[i].q_type === 1 || res[i].q_type === 2) {
                        // res[i].q_content = res[i].q_content.replace(/[\r\n]/g,'<br/>');              
                        var tmp = res[i].q_content.split(/;;/g);
                        res[i].q_content = {};
                        res[i].q_content.main = tmp[0];
                        res[i].q_content.items = tmp.slice(1);
                        if (res[i].q_type === 2) {
                            res[i].q_answer = res[i].q_answer.split('&');
                        }
                        // console.log(res[i].q_content);            
                    } else if (res[i].q_type === 3) {
                        //判断题            
                    } else if (res[i].q_type === 4) {
                        var origin = res[i].q_content;
                        res[i].q_content.main = {};
                        res[i].q_content.main = origin;//填空题内容              
                        res[i].q_content.blankNum = origin.match(/_{3}/g);//空格个数            
                    } else if (res[i].q_type === 5) {
                        // 简答题            
                    } else if (res[i].q_type === 6) {
                        // 编程题            
                    }
                }
            }
        }
  }
  return ProfessionController;
};