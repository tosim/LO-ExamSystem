'use strict';

module.exports = app => {
  class OthersController extends app.Controller {
    * index() {
        const {ctx} = this;
        ctx.validate({
            u_id:'id'
        },ctx.request.query);
        const result = yield app.mysql.select('others',{
            where:{u_id:ctx.request.query.u_id}
        });

        console.log("-----------------------------");
        for(let i of result){
            // console.log(i);
            var time = new Date(i.o_time);
            // console.log(time.getFullYear());
            i.o_time = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate();
            // console.dir(i.o_time);
            console.log("end");
        }
        console.log("-----------------------------");
        if(result.length != 0){
            ctx.body = {
                success:1,
                data:result,
                msg:''
            }
        }else{
            ctx.body = {
                success:0,
                data:null,
                msg:'no records'
            }
        }
    }
    
    * create(){
        const {ctx} = this;
        ctx.validate({
            u_id:'int',
            o_time:'string',
            o_title:'string',
            o_href:'string',
            o_remark:'string'
        });
        var row = {
            u_id:ctx.request.body.u_id,
            o_time:ctx.request.body.o_time,
            o_title:ctx.request.body.o_title,
            o_href:ctx.request.body.o_href,
            o_remark:ctx.request.body.o_remark
        };
        console.log(row);
        const result = yield app.mysql.insert('others',row);
        console.log(result.insertId);
        ctx.body = {
            success:1,
            data:result.insertId,
            msg:''
        };
    }

    * update(){
        const {ctx} = this;
        ctx.validate({
            o_id:'int',
            u_id:'int',
            o_time:'string',
            o_title:'string',
            o_href:'string',
            o_remark:'string'
        });
        var row = {
            u_id:ctx.request.body.u_id,
            o_time:ctx.request.body.o_time,
            o_title:ctx.request.body.o_title,
            o_href:ctx.request.body.o_href,
            o_remark:ctx.request.body.o_remark
        };
        console.log(ctx.request.body);
        var result = yield app.mysql.update('others',row,{
            where:{o_id:ctx.request.body.o_id}
        });
        result = yield app.mysql.get('others',{o_id:ctx.request.body.o_id});
        console.log('update');
        var time = new Date(result.o_time);
        // console.log(time.getFullYear());
        result.o_time = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate();
        console.log(result);
        ctx.body = {
            success:1,
            data:result,
            msg:''
        }
    }

    * destory(){
        const {ctx} = this;
        ctx.validate({
            o_id:'id'
        },ctx.params);
        console.log(ctx.params);
        const result = yield app.mysql.delete('others',{o_id:ctx.params.o_id});
        ctx.body = {
            success:1,
            data:ctx.params.o_id,
            msg:''
        }
    }
  }
  return OthersController;
};