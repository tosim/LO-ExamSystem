'use strict';

module.exports = app => {
    class ProfessionService extends app.Service {
        * create(p_name){
           const result = yield this.app.mysql.insert('profession',{p_name:p_name});
           console.log(result);
           return result.insertId;
       }
        * getprofessionnum(){
          const result = yield this.app.mysql.query('select count(*) as pnum from profession');
          return result; 
        }
        * index(currnum){
            const result = yield this.app.mysql.query('select * from profession limit ?,8',currnum);
            return result;
        }
        * insertpaper(p_id,params) {
            const result = yield this.app.mysql.insert('testpaper', { p_id: p_id, t_ochoose_num: params.t_ochoose_num, t_mchoose_num: params.t_mchoose_num, t_judge_num: params.t_judge_num, t_fill_num: params.t_fill_num, t_squestion_num:params.t_squestion_num, t_code_num:params.t_code_num, t_ochoose_score:params.t_ochoose_score, t_mchoose_score:params.t_mchoose_score, t_judge_score:params.t_judge_score, t_fill_score:params.t_fill_score, t_squestion_score:params.t_squestion_score, t_code_score:params.t_code_score });
            const insertSuccess = result.affectedRows === 1;
            // console.log(insertSuccess);
            return insertSuccess;
        }
        * insertprotag(p_id,params) {
            const result = yield this.app.mysql.insert('pro_tag',{p_id:p_id, tag_id:params.tag_id, pt_rate:params.pt_rate});
            const insertSuccess = result.affectedRows === 1;
            return insertSuccess;
        }
        * deleteprofession(p_id){
            const deleteSuccess = yield this.app.mysql.delete('profession',{p_id:p_id});
            console.log(deleteSuccess);
            return deleteSuccess;
            
        }

    }
    return ProfessionService;
}