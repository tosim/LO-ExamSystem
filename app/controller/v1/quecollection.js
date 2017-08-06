'use strict';

module.exports = app => {
  class QueCollectionController extends app.Controller {
    * create(){
        this.ctx.session.user = yield this.service.v1.user.show('82415327@qq.com','056210');

        const {ctx} = this;
        var q_id = ctx.request.body.q_id;
        const result = yield app.mysql.get('quecollection',{
            q_id:q_id,
            u_id:ctx.session.user.u_id
        });
        // console.log("result === null" ,result );
        if(result === null){
            yield app.mysql.insert('quecollection',{
                q_id:q_id,
                u_id:ctx.session.user.u_id
            });
        }

        ctx.body={
            success:1,
            data:'ok',
            msg:''
        }
    }

    * index() {
        const {ctx} = this;
        // console.log(ctx.request);
        // console.log(ctx.request.query);
        // console.log(ctx.request.body);
        var req = ctx.request.body;
        var sql =  `select distinct question.*
                    from question,quecollection,que_tag 
                    where quecollection.u_id=${req.u_id} 
                    and question.q_id=quecollection.q_id 
                    and que_tag.q_id=quecollection.q_id `
        var typesql = ' and question.q_type in(';
        if(req.q_types.length != 0){
            for(let i = 0;i < req.q_types.length;i++){
                if(i == 0){
                    typesql += req.q_types[i];
                }else{
                    typesql += ',' + req.q_types[i];
                }
            }            
            typesql += ')';
            sql += typesql;
        }
        var tagsql = ' and que_tag.tag_id in(';
        if(req.q_tags.length != 0){
            for(let i = 0;i < req.q_tags.length;i++){
                if(i == 0){
                    tagsql += req.q_tags[i];
                }else{
                    tagsql += ',' + req.q_tags[i];
                }
            }            
            tagsql += ')';
            sql += tagsql;
        }
        console.log('query quecollection');
        console.log(sql);
        var result = yield app.mysql.query(sql);
        for(let i of result){
            i.tags = yield app.mysql.query('select tag_name from tag,que_tag where que_tag.q_id=? and que_tag.tag_id=tag.tag_id',[i.q_id]);
            i.tags = i.tags.map(function(item){
                return item.tag_name;
            })
        }
        console.log(result);
        ctx.body = {
            success:1,
            data:result,
            msg:''
        }
    }

    * getTags(){
        const {ctx} = this;
        ctx.validate({
            u_id:'id'
        },ctx.request.query);

        const result = yield app.mysql.query('select distinct tag.tag_id,tag_name from quecollection,tag,que_tag where quecollection.u_id=? and quecollection.q_id=que_tag.q_id and que_tag.tag_id=tag.tag_id',[ctx.request.query.u_id]);
        for(let i of result){
            i.selected = false;
        }
        ctx.body = {
            success:1,
            data:result,
            msg:''
        }
    }
  }
  return QueCollectionController;
};

