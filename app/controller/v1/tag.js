'use strict';

module.exports = app => {
    class TagController extends app.Controller{
        * create(){
            const { ctx, service } = this;
            const createRule = {
                tag_name: { type: 'string' },
            };
            ctx.validate(createRule);
            const tag_name = ctx.request.body.tag_name;
            console.log(tag_name);
            const insertSuccess = yield service.v1.tag.create(tag_name);
            if (insertSuccess) {
                    ctx.response.body = {
                        success: 1,
                        data: '',
                        msg: '添加成功',
                    }
                } else {
                    ctx.response.body = {
                        success: 0,
                        data: '',
                        msg: '添加失败',
                    }
                }
        }
       * addtaglist(){
          const {ctx, service} = this;
             ctx.validate({
               tag_namelist:{
                   type: 'object'
               }
            }, ctx.request.body);
            const tag_namelist = ctx.request.body.tag_namelist;
            for(let item of tag_namelist){
                var insertSuccess = yield service.v1.tag.create(item);
            }
            if (insertSuccess) {
                    ctx.response.body = {
                        success: 1,
                        data: '',
                        msg: '添加成功',
                    }
                } else {
                    ctx.response.body = {
                        success: 0,
                        data: '',
                        msg: '添加失败',
                    }
                }
    }
       * index(){
            const { ctx, service } = this;
            const curr = parseInt(ctx.query.page);
            const pagesize = 8;
            const currnum = (curr - 1) * pagesize;
            const tagnum = (yield service.v1.tag.gettagnum())[0].tnum;
            const TagList = yield service.v1.tag.index(currnum);
            const totalnum = Math.ceil(tagnum / pagesize);
             if (TagList.length == 0) {
                ctx.response.body = {
                    success: 0,
                    data: '',
                    msg: '列出标签失败',
                };
            } else {
                ctx.response.body = {
                    success: 1,
                    data: {
                        taglist: TagList,
                        totalnum: totalnum
                    },
                    msg: '列出标签成功',
                };
            }

        }  
    * getalltag(){
        const { ctx, service } = this;
        const TagList = yield service.v1.tag.getalltag();
         if (TagList.length == 0) {
                ctx.response.body = {
                    success: 0,
                    data: '',
                    msg: '列出标签失败',
                };
            } else {
                ctx.response.body = {
                    success: 1,
                    data: {
                        taglist: TagList,
                    },
                    msg: '列出标签成功',
                };
            }
    }   
    * gettaglist(){
        const {ctx,service} = this;
        const curr = parseInt(ctx.query.page);
        const pagesize = 8;
        const currnum = (curr - 1) * pagesize;
        const tagnum = (yield service.v1.tag.gettagnum())[0].tnum;
        const taglist = yield service.v1.tag.index(currnum);
         const totalnum = Math.ceil(tagnum / pagesize);
         if (taglist.length === 0) {
             ctx.response.body = {
                 success: 0,
                 data: '',
                 msg: '列出题目失败',
             }
         } else {
             ctx.response.body = {
                 success: 0,
                 data:  {
                        taglist: tagList,
                        totalnum: totalnum
                    },
                 msg: '列出题目成功',
             }
         }

    }
    * updatetag(){
        const {ctx,service} = this;
        console.log(ctx.request.body);
        const result = yield service.v1.tag.updatetag(ctx.request.body);
         if (result) {
                ctx.response.body = {
                    success: 0,
                    data: '',
                    msg: '更新失败',
                };
            } else {
                ctx.response.body = {
                    success: 1,
                    data: '',
                    msg: '更新成功',
                };
            }

    }
    * deletetaglist(){
       const {ctx,service} = this;
       console.log(ctx.request.body);
       const tag_idlist = ctx.request.body;
       for(let item of tag_idlist){
           yield service.v1.tag.deletebyid(item);
       }
        ctx.response.body = {
                success: 1,
                data:'',
                msg: '删除成功',
            };
    }
    }
    return TagController;
}