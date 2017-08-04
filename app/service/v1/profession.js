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
            const result = yield this.app.mysql.query('select * from profession order by p_id asc limit ?,8',currnum);
            return result;
        }
        * getallprofession(){
            const result = yield this.app.mysql.query('select * from profession order by p_id');
            return result;
        }
        * getpaperbyid(p_id){
            const result = yield this.app.mysql.query('select t_id,t_ochoose_num,t_mchoose_num,t_judge_num,t_fill_num,t_squestion_num,t_code_num,t_ochoose_score,t_mchoose_score,t_judge_score,t_fill_score,t_squestion_score,t_code_score from testpaper where p_id=?',p_id);
            return result;
        }
        * gettagbyid(p_id){
            const result = yield this.app.mysql.query('select tag.tag_id,tag.tag_name,pro_tag.pt_rate from tag,pro_tag where tag.tag_id = pro_tag.tag_id and pro_tag.p_id=?',p_id);
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
        * updateprofession(params) {
            // console.log(params.p_id);
            // console.log(params.testpaper);
            const p_id = params.p_id;
            var arr = [];
            const t_idlist = yield this.app.mysql.query('select t_id from testpaper where p_id = ?', p_id);
            for (let item of t_idlist) {
                arr.push(item.t_id);
            }
            
            const success1 = yield this.app.mysql.query("update profession set p_name=? where p_id=?", [params.p_name, p_id]);
            for (let item of params.testpaper) {
                console.log(typeof item.t_id);
                if (typeof item.t_id === "undefined") {
                    console.log("11111");
                    const success = yield this.insertpaper(p_id, item);
                } else {
                    console.log("222222");
                    const row = {
                        p_id: p_id,
                        t_id: item.t_id,
                        t_ochoose_num: item.t_ochoose_num,
                        t_mchoose_num: item.t_mchoose_num,
                        t_judge_num: item.t_judge_num,
                        t_fill_num: item.t_fill_num,
                        t_squestion_num: item.t_squestion_num,
                        t_code_num: item.t_code_num,
                        t_ochoose_score: item.t_ochoose_score,
                        t_mchoose_score: item.t_mchoose_score,
                        t_judge_score: item.t_judge_score,
                        t_fill_score: item.t_fill_score,
                        t_squestion_score: item.t_squestion_score,
                        t_code_score: item.t_code_score
                    };

                    console.log(arr);
                    let index = arr.indexOf(item.t_id);
                    console.log(index);
                    const success2 = yield this.app.mysql.update('testpaper', row, { where: { p_id: p_id, t_id: item.t_id } });
                    arr.splice(index,1);
                     }
            }
                     if (arr.length > 0) {
                            for (let t of arr) {
                                console.log("剩余id"+t);
                             const deleteSuccess2 = yield this.app.mysql.delete('testpaper', { p_id: p_id, t_id: t });
                            }
                        }
            const success3 = yield this.service.v1.tag.deletetagbyid(p_id);
            for (let item of params.tag) {
                const success4 = yield this.service.v1.tag.insertprotag(p_id, item);
            }
            if (success1 && success3) {
                return true;
            } else {
                return false;
            }

        }
        * deleteprofession(p_id){
            const deleteSuccess = yield this.app.mysql.delete('profession',{p_id:p_id});
            console.log(deleteSuccess);
            return deleteSuccess;
        }
        * deletetestpaperbyid(p_id){
            const deleteSuccess = yield extend-this.app.mysql.delete('testpaper',{p_id:p_id});
            return deleteSuccess;
        }
       * contains(arr, obj) {
            var i = arr.length;
            while (i--) {
                if (arr[i] === obj) {
                return true;
                }
            }
            return false;
            }
                }
    return ProfessionService;
}