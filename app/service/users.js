// app/service/topics.js
module.exports = app => {
  class UserService extends app.Service {
    * create(params) {
        console.dir(params);
        // 返回创建的 user 的 id
        delete params.re_password;
        delete params._csrf;
        //insert('table_name',字段对应值，需要符合表的约束)
        const result = yield app.mysql.insert('user', {u_name:params.u_name,u_email:params.u_email,u_pass:params.u_pass});
        const insertSuccess = result.affectedRows === 1;
        return insertSuccess;
    }

    * index(){
        //select 查询多个元组
        const userList = yield app.mysql.select('user',{
            where: { u_name:'test' },
            orders: [['u_id','desc']],
            limit: 10,
            offset: 0
            });
        return userList;
    }
    
    * show(id){
        //get 获取单个元组，第二个参数为查询条件
        const user = yield app.mysql.get('user',{u_id:id});
        return user;
    }

    * update(id,params){
        // 修改数据，将会根据主键 ID 查找，并更新
        const row = {
            u_id: id,
            u_name: params.u_name,
            u_email:params.u_email,
            u_pass:params.u_pass
        };
        console.dir(row);
        //update("table_name",newRow,options)
        const updateSuccess = yield app.mysql.update('user',row,{where:{u_id:id}});
        return updateSuccess;
    }

    * destroy(id){
        const destorySuccess = yield app.mysql.delete('user',{u_id:id});
        return destorySuccess;
    }
    // 封装统一的调用检查函数，可以在查询、创建和更新等 service 中复用
  }
  return UserService;
};