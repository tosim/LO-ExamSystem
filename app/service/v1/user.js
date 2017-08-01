'use strict';

module.exports = app => {
    class UserService extends app.Service {
        * show(u_email,u_pass){
            const result = yield app.mysql.get('user',{u_email:u_email,u_pass:u_pass});
            
            if(result == null){
                return null;
            }else{
                delete result.u_pass;//不将密码传回客户端
                // delete result.u_point;
                result.u_level = (yield app.mysql.query('select lv_id from user,level where u_id=? and u_point >= lv_need order by lv_id desc limit 1',[result.u_id]))// 等级
                // console.log('----------------------------u_level');
                // console.log(result.u_level);
                // console.log('----------------------------');
                if(result.u_level.length === 0){
                    result.u_level = 1;
                }else{
                    result.u_level = result.u_level[0].u_level;
                }
                result.enterprise = yield app.mysql.query('select u_e.e_id,e_name from u_e,enterprise where u_id=? and u_e.e_id=enterprise.e_id',[result.u_id]);
                result.p_name = (yield app.mysql.query('select p_name from profession where p_id=?',[result.p_id]))[0].p_name;
                return result;
            }
            
            
        }

    }
    return UserService;
}