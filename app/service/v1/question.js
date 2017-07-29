// app/service/api/question.js
'use strict';

module.exports = app => {
    class QuestionService extends app.Service {
        * create(params) {
            const result = yield this.app.mysql.insert('question', { q_type: params.q_type,q_content:params.q_content,q_answer: params.q_answer, q_analysis: params.q_analysis,q_difficulty:params.q_difficulty,q_right:params.q_right,q_wrong:params.q_wrong,q_reportnum:params.q_reportnum,e_id:params.e_id});
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
            // console.log(q_id)
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
         for(let item of params.tag){
            var insertSuccess = yield this.app.mysql.insert('que_tag',{q_id:q_id,tag_id:item});
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
        // * querybydifficulty(startdiff,enddiff){
        //     const result = yield this.app.mysql.query('select * from question where ');
        //     return result;
        // }
        * query(params,currnum) {
            console.log(params);
            var questionarray = [];
            var key = params.firs;
            const taglist = params.serd;
            // console.log((params.thre).split("-"))
            const difficulity = (params.thre).split('-');
             console.log(difficulity);
            const startdiff = difficulity[0];
            const enddiff = difficulity[1];
            if (key === '' && taglist.length === 0) {
                console.log("11111111");
                var qnum = (yield this.app.mysql.query('select count(*) as qnum from question where q_difficulty >= ? and q_difficulty <= ?',[startdiff,enddiff]))[0].qnum;
                console.log(qnum)
                var questionlist = yield this.app.mysql.query('select * from question where q_difficulty >= ? and q_difficulty <= ? order by q_id asc limit ?,8', [startdiff, enddiff,currnum]);
            } else if (key !== '' && taglist.length === 0) {
                console.log("2222222");
                key = '%'+key+'%';
                var qnum = (yield this.app.mysql.query('select count(*) as qnum from question where q_difficulty >= ? and q_difficulty <= ? and q_content like ?',[startdiff,enddiff,key]))[0].qnum;
                var questionlist = yield this.app.mysql.query('select * from question where q_difficulty >= ? and q_difficulty <= ? and q_content like ? order by q_id asc  limit ?,8',[startdiff, enddiff,key,currnum]);
            }else if(key === '' && taglist.length > 0){
                var templist =[];
                console.log("333333333");
                  var orignlist = yield this.app.mysql.query('select group_concat(que_tag.tag_id) as tarray,question.q_id,question.q_type,question.q_content,question.q_answer,question.q_analysis,question.q_right,question.q_wrong,question.q_difficulty,question.q_reportnum from question,que_tag where question.q_difficulty >= ? and question.q_difficulty <= ? and question.q_id=que_tag.q_id group by question.q_id',[startdiff,enddiff]);
                  for(let item of orignlist){
                      var tarray = item.tarray.split(',');
                      console.log(tarray);
                    if(tarray.sort().toString() == taglist.sort().toString()){
                        templist.push(item);
                        var qnum=templist.length;
                    }
                  }
                     var questionlist = templist.slice(currnum,currnum+8);
                  console.log(questionlist)
            }else{
                console.log("444444444");
                key = '%'+key+'%';
                var templist =[];
                  var orignlist = yield this.app.mysql.query('select group_concat(que_tag.tag_id) as tarray,question.q_id,question.q_type,question.q_content,question.q_answer,question.q_analysis,question.q_right,question.q_wrong,question.q_difficulty,question.q_reportnum from question,que_tag where question.q_difficulty >= ? and question.q_difficulty <= ? and question.q_content like ? and question.q_id=que_tag.q_id group by question.q_id',[startdiff,enddiff,key]);
                  for(let item of orignlist){
                      var tarray = item.tarray.split(',');
                      console.log(tarray);
                    if(tarray.sort().toString() == taglist.sort().toString()){
                        templist.push(item);
                        var qnum=templist.length;
                    }
                  }
                     var questionlist = templist.slice(currnum,currnum+8);
            }
            const result = {
                questionlist:questionlist,
                qnum:qnum,
            }
            return result;

        }
        // * unique(arr) {
        //     console.log("55555")
        //     console.log(arr.length);
        //     var result = [], isRepeated;
        //     outerloop:
        //     for (var i = 0, len = arr.length; i < len; i++) {
        //         console.log("66666")
        //         isRepeated = false;
        //         innerlooper:
        //         for (var j = 0, len = result.length; j < len; j++) {
        //             console.log("77777")
        //             if (arr[i].q_id === result[j].q_id) {
        //                 isRepeated = true;
        //                 break innerlooper;
        //             }
        //         }
        //             if (!isRepeated) {
        //                 result.push(arr[i]);
        //                 console.log(result.length)
        //             }
        //     }
        //         return result;
        // }
    //     * unique(arr) {     
    //     // 遍历arr，把元素分别放入tmp数组(不存在才放)
    //     var q_idlist = new Array();
    //     var tmp = new Array();
    //     for (var i in arr) {
    //         //该元素在tmp内部不存在才允许追加
    //         if (q_idlist.indexOf(arr[i].q_id) === -1) {
    //             q_idlist.push(arr[i].q_id);
    //         }else{
    //             var tmpq_id = new Array();
    //           if(tmpq_id.indexOf(arr[i].q_id) === -1 ){
    //               tmpq_id.push(arr[i].q_id);
    //                tmp.push(arr[i]);
    //           }
               
    //             var tmpq_idlist = new Array();

    //         }
    //     }
    //     return tmp;
    // }
    * GetRepeatFwxmmc(ary1){
    // console.log(ary1.length)
　　var ary = ary1.sort(yield this.compare('q_id'));//数组排序
    // console.log(ary);
　　var cffwxmsAry = new Array();
　　//所有重复元素添加进新数组内

　　for(var i=0;i<ary.length-1;i++){

　　　　if (ary[i].q_id === ary[i+1].q_id){

　　　　　　cffwxmsAry.push(ary[i]);

　　　　}

　　}
   console.log(cffwxmsAry)

　　var result = [], isRepeated;

　　//对重复元素数组进行元素去重

　　for (var k = 0; k < cffwxmsAry.length; k++) {

　　　　isRepeated = false;

　　　　for (var j = 0;j < result.length; j++) {

　　　　　　if (cffwxmsAry[k].q_id === result[j].q_id) {

　　　　　　　　isRepeated = true; break;

　　　　　　}

　　　　}

　　　　if (!isRepeated) {

　　　　　　result.push(cffwxmsAry[k]);

　　　　}

　　}

　　return result;

}

* compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}

//     * common(arr) {  
//     var q_idlist = new Array();
//     var tmp = [];  
//     for(let item of arr){
//        q_idlist.push(item.q_id);
//     }
//     q_idlist.concat().sort().sort(function(a,b){  
//         if(a==b && tmp.indexOf(a) === -1) tmp.push(a);  
//     });  
//     return tmp;  
//   }  
  
    }
    return QuestionService;
}