// app/service/api/question.js
'use strict';

module.exports = app => {
    class QuestionService extends app.Service {
        * create(params) {
            const result = yield this.app.mysql.insert('question', { q_type: params.q_type,q_content:params.q_content,q_answer: params.q_answer, q_analysis: params.q_analysis,q_difficulty:params.q_difficulty,e_id:params.e_id});
            const insertSuccess = result.affectedRows === 1;
                return result.insertId;
        }
        * getquestionnum() {
            const result = yield this.app.mysql.query('select count(*) as qnum from question');
            // console.log(result[0].qnum);
            return result;
        }
        * getquestionnumbytag(tag_id) {
            const result = yield this.app.mysql.query('select count(*) as qnum from que_tag where tag_id=?', tag_id);
            return result;
        }
        * getquestionnumbytype(q_type) {
            const result = yield this.app.mysql.query('select count(*) as qnum from question where q_type=?', q_type);
            return result;
        }
        * list(currnum) {
            const result = yield this.app.mysql.query('select * from question order by q_id asc limit ?,8 ', currnum);
            return result;
        }
        * getlistbykey(currnum,key,tag){
            console.log("12378")
            console.log(tag);
            key = '%'+key+'%';
            const result = yield this.app.mysql.query('select * from question where q_content like ? order by q_id asc  limit ?,8',[key,currnum]);
            return result;
        }
        * gettagbyid(q_id){
            console.log(q_id)
            const result = yield this.app.mysql.query('select tag.tag_id,tag.tag_name from tag,que_tag where que_tag.tag_id = tag.tag_id and que_tag.q_id=?',q_id);
            return result;
        }
        * getlistbytag(tag_id, currnum) {
            const result = yield this.app.mysql.query('select question.q_id,question.q_type,question.q_content,question.q_answer,question.q_analysis,question.q_right,question.q_wrong,question.q_zan,question.q_cai from question,que_tag where question.q_id=que_tag.q_id and que_tag.tag_id=?', [tag_id, currnum]);
            return result;
        }
        * getlistbytype(q_type, currnum) {
            const result = yield this.app.mysql.query('select * from question where q_type=? limit ?,8', [q_type, currnum]);
            return result;
        }
        * getquestionbyid(q_id){
            const result = yield this.app.mysql.query('select * from question where q_id = ?',q_id);
            return result;
        }
        * updatequestion(q_id,params){
          const row = {
           q_id:q_id,
           q_content:params.q_content,
           q_answer:params.q_answer,
           q_analysis:params.q_analysis,
           q_right:params.q_right,
           q_wrong:params.q_wrong,
        };
         const updateSuccess = yield this.app.mysql.update('question',row,{where:{q_id:q_id}});
         const deleteSuccess = yield this.app.mysql.delete('que_tag',{q_id:q_id});
         for(let item of params.tag_id){
            const insertSuccess = yield this.app.mysql.insert('que_tag',{q_id:q_id,tag_id:tag_id});
         }
        console.log(updateSuccess);
        if(updateSuccess&&deleteSuccess&&insertSuccess){
            return true;
        }else{
            return false;
        }
        }
        * deletequestion(q_id){
         const deleteSuccess = yield this.app.mysql.delete('question',{q_id:q_id});
         return deleteSuccess;
        }
        * insertquetag(q_id,tag_id){
            const result = yield this.app.mysql.insert('que_tag',{q_id:q_id,tag_id:tag_id});
            console.log(result);
            const insertSuccess =  result.affectedRows === 1;
            return insertSuccess;
        }

    }
    return QuestionService;
}