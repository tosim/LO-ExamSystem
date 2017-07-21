'use strict';

module.exports = app => {
    class TagService extends app.Service{
       * create(tag_name){
          const result = yield this.app.mysql.insert('tag',{tag_name:tag_name});
          const insertSuccess = result.affectedRows === 1;
          return insertSuccess;
    }
        * index(currnum){
           const result = yield this.app.mysql.query('select * from tag limit ?,8',currnum);
           return result;
        }
        * getalltag(){
            const result = yield this.app.mysql.query('select * from tag');
            return result;
        }
        * gettagnum(){
            const result = yield this.app.mysql.query('select count(*) as tnum from tag');
            return result;
        }
        * deletetagbyid(p_id){
            const result = yield this.app.mysql.delete('pro_tag',{p_id:p_id});
            return result;
        }
        * insertprotag(p_id,params){
            const result = yield this.app.mysql.insert('pro_tag',{p_id:p_id,tag_id:params.tag_id,pt_rate:params.pt_rate});
            return result;
        }
    }
    return TagService;
}