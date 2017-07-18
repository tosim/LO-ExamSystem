'use strict';

module.exports = app => {
    class ProfessionController extends app.Controller {
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
        * index(){
            const { ctx, service } = this;
            const curr = parseInt(ctx.query.page);
            const pagesize = 8;
            const currnum = (curr - 1) * pagesize;
            const professionnum = (yield service.v1.profession.getprofessionnum())[0].pnum;
            const ProfessionList = yield service.v1.profession.index(currnum);
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
    }
    return ProfessionController;
}