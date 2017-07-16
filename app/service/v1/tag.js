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
        * gettagnum(){
            const result = yield this.app.mysql.query('select count(*) as tnum from tag');
            return result;
        }
    }
    return TagService;
}