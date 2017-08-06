// app/service/api/question.js
'use strict';

function getResql(basesql,queList,curType){
    var resql = basesql + ') ';
    var flag = 0;
    for(let k = 0;k < queList.length;k++){
        if(queList[k].q_type === curType){
            // console.log("q_id =" + queList[k].q_id);
            if(flag === 0){
                flag = 1;
                resql += 'and question.q_id not in (' + queList[k].q_id;
            }else{
                resql += ',' + queList[k].q_id;
            }
        }
    }
    if(flag === 1){
        resql += ') ';
    }
    resql += 'limit ?';
    return resql;
}

module.exports = app => {
    class QuestionService extends app.Service {
        * enterTest(ctx){
            var exam_id = ctx.request.query.exam_id;
            var queList = [];
            var scores = {};
            var sql = 'select question.*,q_exam.score from question,q_exam where q_exam.exam_id=? and q_exam.q_id=question.q_id';
            var list = yield app.mysql.query(sql,[exam_id]);
            list.forEach(function(value){
                scores[value.q_id] = value.score;
            })
            console.log(scores);
            queList = list.map(function(item){
                delete item.score;
                return item;
            })
            var times = yield app.mysql.get('e_exam',{exam_id:exam_id});
            console.log(times.start_time);
            console.log(times.last_time);
            return {
                queList:queList,
                scores:{
                    type:2,
                    values:scores
                },
                start_time:times.start_time,
                last_time:times.last_time
            };
        }
        * topic(ctx){
            var tag_id = ctx.request.query.tag;
            var queList = [];
            var sql = 'select question.* from question,que_tag where question.q_type=? and que_tag.tag_id=? and que_tag.q_id=question.q_id AND question.q_id >= ((SELECT MAX(q_id) FROM question)-(SELECT MIN(q_id) FROM question)) * RAND() + (SELECT MIN(q_id) FROM question) limit ?';
            for(let i = 1;i <= 6;i++){
                var num;
                if(i <= 3) num = 5;
                else if(i != 6) num = 2;
                else num = 1;
                var tmpList = yield app.mysql.query(sql,[i,tag_id,num]);
                queList = queList.concat(tmpList);
            }
            var scores = [4,4,4,6,6,16];
     
            return {
                queList:queList,
                scores:{
                    type:1,
                    values:scores
                }
            };
        }

        * random(ctx){
            console.log('start random');
            console.log(ctx.session.user);
            //没有考试抽完题目再考试
            const req = ctx.request.query;
            req.u_id = ctx.session.user.u_id;
            req.time = parseInt(req.time);//考试时间
            req.p_id = ctx.session.user.p_id;//职业 
            req.u_level = ctx.session.user.u_level;//等级
            req.u_enterprises = yield app.mysql.query('select e_id from u_e where u_id=?',[req.u_id]);//用户所要申请的企业
            req.testpaper = (yield app.mysql.query('select * from testpaper where p_id=? LIMIT 1',[req.p_id]))[0];//试题类型数量
            var scores = [req.testpaper.t_ochoose_score,req.testpaper.t_mchoose_score,req.testpaper.t_judge_score,req.testpaper.t_fill_score,req.testpaper.t_squestion_score,req.testpaper.t_code_score];
            req.pt_rates = yield app.mysql.query('select tag_id,pt_rate from pro_tag where p_id=?',[req.p_id]);//试题
            var cnt = new Object();
            cnt.ochoose = 0;//1
            cnt.mchoose = 0;//2
            cnt.judge = 0;//3
            cnt.fill = 0;//4
            cnt.squestion = 0;//5
            cnt.code = 0;//6
            
            // console.log(req);
            req.select = [];
            for(let i = 0;i < req.pt_rates.length;i++){
                if(i === req.pt_rates.length - 1){
                    req.select.push({
                        q_type:1,
                        tag_id:req.pt_rates[i].tag_id,
                        num:req.testpaper.t_ochoose_num - cnt.ochoose
                    });
                    req.select.push({
                        q_type:2,
                        tag_id:req.pt_rates[i].tag_id,
                        num:req.testpaper.t_mchoose_num - cnt.mchoose
                    });
                    req.select.push({
                        q_type:3,
                        tag_id:req.pt_rates[i].tag_id,
                        num:req.testpaper.t_judge_num - cnt.judge
                    });
                    req.select.push({
                        q_type:4,
                        tag_id:req.pt_rates[i].tag_id,
                        num:req.testpaper.t_fill_num - cnt.fill
                    });
                    req.select.push({
                        q_type:5,
                        tag_id:req.pt_rates[i].tag_id,
                        num:req.testpaper.t_squestion_num - cnt.squestion
                    });
                    req.select.push({
                        q_type:6,
                        tag_id:req.pt_rates[i].tag_id,
                        num:req.testpaper.t_code_num - cnt.code
                    });
                    break;
                }
                req.select.push({
                    q_type:1,
                    tag_id:req.pt_rates[i].tag_id,
                    num:parseInt(req.testpaper.t_ochoose_num*req.pt_rates[i].pt_rate/100)
                });
                cnt.ochoose += parseInt(req.testpaper.t_ochoose_num*req.pt_rates[i].pt_rate/100);
                req.select.push({
                    q_type:2,
                    tag_id:req.pt_rates[i].tag_id,
                    num:parseInt(req.testpaper.t_mchoose_num*req.pt_rates[i].pt_rate/100)
                });
                cnt.mchoose += parseInt(req.testpaper.t_mchoose_num*req.pt_rates[i].pt_rate/100);
                req.select.push({
                    q_type:3,
                    tag_id:req.pt_rates[i].tag_id,
                    num:parseInt(req.testpaper.t_judge_num*req.pt_rates[i].pt_rate/100)
                });
                cnt.judge += parseInt(req.testpaper.t_judge_num*req.pt_rates[i].pt_rate/100);
                req.select.push({
                    q_type:4,
                    tag_id:req.pt_rates[i].tag_id,
                    num:parseInt(req.testpaper.t_fill_num*req.pt_rates[i].pt_rate/100)
                });
                cnt.fill += parseInt(req.testpaper.t_fill_num*req.pt_rates[i].pt_rate/100);
                req.select.push({
                    q_type:5,
                    tag_id:req.pt_rates[i].tag_id,
                    num:parseInt(req.testpaper.t_squestion_num*req.pt_rates[i].pt_rate/100)
                });
                cnt.squestion += parseInt(req.testpaper.t_squestion_num*req.pt_rates[i].pt_rate/100);
                req.select.push({
                    q_type:6,
                    tag_id:req.pt_rates[i].tag_id,
                    num:parseInt(req.testpaper.t_code_num*req.pt_rates[i].pt_rate/100)
                });
                cnt.code += parseInt(req.testpaper.t_code_num*req.pt_rates[i].pt_rate/100);
            }
            // console.log(req.select);
            var queList = [];
            var basesql = 'SELECT question.* FROM question,que_tag WHERE tag_id=? AND que_tag.q_id=question.q_id AND question.q_type=? AND e_id in (1';
            for(let i = 0;i < req.u_enterprises.length;i++){
                // if(i == 0){
                    // basesql += req.u_enterprises[i].e_id;
                // }else{
                    basesql +=  ',' + req.u_enterprises[i].e_id;
                // }
            }
            var sql = basesql + ') AND question.q_id >= ((SELECT MAX(q_id)-? FROM question)-(SELECT MIN(q_id) FROM question)) * RAND() + (SELECT MIN(q_id) FROM question) ';
            sql = sql + 'AND abs(q_difficulty-'+req.u_level+') <= 2 ';
            sql += 'LIMIT ?';
            
            for(let i = 0;i < req.select.length;i++){
                if(req.select[i].num != 0){
                    var tmpList = yield app.mysql.query(sql,[req.select[i].tag_id,req.select[i].q_type,req.select[i].num,req.select[i].num]);
                    //start 去重
                    var cnt = 0,pushed = 0;//pushed成功抽取的，cnt表示重复的个数
                    for(let p = 0;p < tmpList.length;p++){
                        var flag = 0;
                        for(let q = 0; q < queList.length;q++){
                            if(tmpList[p].q_id === queList[q].q_id){
                                cnt++;
                                flag = 1;
                                break;
                            }
                        }
                        if(flag === 0){
                            pushed++;
                            queList.push(tmpList[p]);
                        }
                    }
                    if(cnt + pushed != req.select[i].num){
                        console.log('pushed = ' + pushed);
                        console.log('cnt = ' + cnt);
                        console.log(tmpList);
                        console.log(sql);
                        var resql = getResql(basesql,queList,req.select[i].q_type);         
                        console.log("resql = " + resql);          
                        tmpList = yield app.mysql.query(resql,[req.select[i].tag_id,req.select[i].q_type,req.select[i].num - pushed - cnt]);
                        if(tmpList.length != req.select[i].num - pushed - cnt){
                            return null;
                        }else{
                            queList = queList.concat(tmpList);
                        }
                    }
                    if(cnt != 0){
                        var resql = getResql(basesql,queList,req.select[i].q_type);
                        tmpList = yield app.mysql.query(resql,[req.select[i].tag_id,req.select[i].q_type,cnt]);
                        if(tmpList.length != cnt){
                            return null;
                        }else{
                            queList = queList.concat(tmpList);
                        }
                    }
                    console.log(`tag[${req.select[i].tag_id}],Allcnt = ${queList.length},q_type=${req.select[i].q_type}`);
                    //end 去重
                }
                
            }
            return {
                queList:queList,
                scores:{
                    type:1,
                    values:scores
                }
            };
        }

        * createBash(questions){
            var insertIds = [];
            for(let i = 0;i < questions.length;i++){
                // const isExist = (yield app.mysql.query('select count(*) as count from question where q_answer like "%' + questions[i].question.q_answer.replace(/(["'])/g,'\\$1') + '%"'))[0].count;
                // console.log(isExist);
                // if(isExist != 0){
                //     continue;
                // }
                const q_id = (yield app.mysql.insert('question',questions[i].question)).insertId;
                insertIds.push(q_id);
                console.log("q_id = " + q_id);
                for(let j = 0;j < questions[i].tags.length;j++){
                    const result = (yield app.mysql.query('select tag_id from tag where tag_name like "%' + questions[i].tags[j] + '%"'))[0];
                    if(typeof result == 'undefined' === false){
                        console.log('adadad');
                        console.log('tag_id = ' + result.tag_id);
                        yield app.mysql.insert('que_tag',{q_id:q_id,tag_id:result.tag_id});
                    }
                    // console.log(tag_id);
                }
                // insertCount++;
            }
            return insertIds;
        }

        * readTemplate(filePath){
            const shelljs = require('shelljs');
            const cheerio = require('cheerio');
            var request = require('request');
            var path = require('path');

            var data = '';
            var promise = new Promise(function(resolve,reject){
                shelljs.exec('unoconv --stdout --format=html ' + path.join(app.baseDir,filePath), {silent: true}, function (code, result) {
                    if (code) {
                        console.log('Error code: ' + code);
                        return;
                    }
                    const $ = cheerio.load(result);
                    $('p').each(function (i) {
                        var text = $(this).text();
                        // 这里一行一行读取文本，可以根据需要自己解析文本
                        data += text;
                        // console.log(text);
                    });
                    // console.log(data);
                    var reg = /\(题型[:：]([\s\S]*?)\)\n?\(标准答案[:：]([\s\S]*?)\)\n?\(难度[:：]([\s\S]*?)\)\n?\(试题分析[:：]([\s\S]*?)\)\n?\(标签[:：]([\s\S]*?)\)\n((?:.+\n)+)/g;

                    var res = data.match(reg);
                    var insertDatas = [];
                    for(let i = 0;i < res.length;i++){
                        reg.lastIndex=0;
                        var data = {};
                        data.question = {};
                        var queParam = reg.exec(res[i]);
                        // console.log(queParam);
                        //ok
                        if(queParam[1] === '单选题'){
                            data.question.q_type = 1;
                        }else if(queParam[1] === '多选题'){
                            data.question.q_type = 2;
                        }else if(queParam[1] === '判断题'){
                            data.question.q_type = 3;
                        }else if(queParam[1] === '填空题'){
                            data.question.q_type = 4;
                        }else if(queParam[1] === '简答题'){
                            data.question.q_type = 5;
                        }else if(queParam[1] === '编程题'){
                            data.question.q_type = 6;
                        }
                        data.question.q_answer = queParam[2];//
                        data.question.q_difficulty = queParam[3];//ok
                        data.question.q_analysis = queParam[4];//ok
                        data.tags = queParam[5].split(/[,， ]/);//ok   
                        data.question.q_content = queParam[6];


                        if(data.question.q_type === 1 || data.question.q_type === 2){
                            data.question.q_content = data.question.q_content.replace(/\n([A-Za-z])([\.,， 、])(.*)/g,';;$1.$3');//替换选择题各个选项的格式，以符合存入数据库的条件
                            data.question.q_answer = data.question.q_answer.split(/[,， ]/).join('&');//替换答案的格式以存入数据库
                            
                            //test
                            if(/.*(;[A-Za-z]\..+){2,}/.test(data.question.q_content) === false){
                                //content fail
                                continue;
                            }
                            if(/[A-Za-z](&[A-Za-z])*/.test(data.question.q_answer) === false){
                                //answer fail
                                continue;
                            }            
                        }else if(data.question.q_type === 3){//判断题
                            data.question.q_content = data.question.q_content.replace(/\n([A-Za-zTFtf])([\.,， 、]?)(正确|对|错误|错*)/g,'');//删除判断题的对错选项
                            data.question.q_answer = data.question.q_answer.replace(/[Aa1]/g,'T');
                            data.question.q_answer = data.question.q_answer.replace(/[Bb2]/g,'F');

                            if(/[TF]/.test(data.question.q_answer) === false){
                                //answer fail
                                continue;
                            }
                        }else if(data.question.q_type === 4){//填空题
                            let t = data.question.q_answer.match(/\|/g);
                            t = t == null ? 0 : t.length;
                            var answer_num = t + 1;
                            var blank_num = data.question.q_content.match(/_{3,}/g).length;
                            data.question.q_content = data.question.q_content.replace(/_{3,}/g,'___');
                            if(answer_num != blank_num){
                                //答案和空格数量不匹配 fail
                                continue;
                            }
                            if(/.*(_{3})*.*/.test(data.question.q_content) === false){
                                //content fail
                                continue;
                            }
                            
                        }
                        // data.question.q_content = data.question.q_content.replace(/\n/g,'');
                        var mark = data.question.q_content.search(/;;(?!;)/);
                        if(mark != -1){
                            //不去除题目描述中的\n
                            data.question.q_content = data.question.q_content.substring(0,mark) + data.question.q_content.substring(mark).replace(/\n/g,'');
                        }
                        // console.log(question);
                        data.question.e_id = 1;
                        data.question.q_right = 0;
                        data.question.q_wrong = 0;
                        data.question.q_reportnum = 0;
                        insertDatas.push(data);
                    }
                    console.log(res.length);
                    // insertDatas = insertDatas.slice(0,1);
                    // console.log(insertDatas);
                    
                    // request.post({url:'http://127.0.0.1:7001/v1/questions/bash', form:{questions:insertDatas}}, function (err, res, body) {
                    //     if (err) {
                    //         return console.error('upload failed:', err);
                    //     }
                    //     console.log('Upload successful!  Server responded with:', body);
                    // });

                    // console.log(insertDatas.length);
                    // console.log(insertDatas);
                    resolve(insertDatas);
                });
            });
            const result = yield promise;
            return result;
        }
        
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
                    if((yield this.isContained(tarray,taglist))){
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
                    if((yield this.isContained(tarray,taglist))){
                        console.log("777777")
                        templist.push(item);
                        var qnum=templist.length;
                    }
                  }
                     console.log(templist)
                     var questionlist = templist.slice(currnum,currnum+8);
            }
            const result = {
                questionlist:questionlist,
                qnum:qnum,
            }
            return result;

        }
        * addexamquestion(params){
            const questionlist = params.questionlist
            const exam = params.exam;
            let examdata = {
                e_id : exam.e_id,
                p_id : exam.p_id,
                start_time : exam.start_time,
                last_time : exam.last_time
            }
            const examId = yield this.insertexam(examdata);
            console.log("考试id")
            console.log(examId)
            for(let item of questionlist){
                let data = {
                 question : {
                   q_type:item.q_type,
                   q_content:item.q_content,
                   q_answer:item.q_answer,
                   q_analysis:item.q_analysis,
                   q_difficulty:item.q_difficulty,
                   q_right:0,
                   q_wrong:0,
                   q_reportnum:0,
                   e_id:exam.e_id,
                },
                tag :  item.tag,
               }
                const insertId  = yield this.create(data.question);
                console.log(insertId);
                if (typeof insertId === 'number') {
                for(let value of data.tag){
                        var insertSuccess = yield this.insertquetag(insertId,value);
                    }
                    
                const insertSuccess2 = yield this.insertq_exam(insertId,examId)
                    return true;
                }else{
                    return false;
                }
            }
        }
        * getquestlistbyexamid(examId){
           const result = yield this.app.mysql.query('select  question.q_id,question.q_type,question.q_content,question.q_answer,question.q_analysis,question.q_right,question.q_wrong,question.q_reportnum,question.q_difficulty,question.e_id,q_exam.score from question,q_exam where question.q_id = q_exam.q_id and q_exam.exam_id = ?',examId);
           return result;
        }
        * insertexam(params){
            const result = yield this.app.mysql.insert('e_exam',{e_id:params.e_id,p_id:params.p_id,start_time:params.start_time,last_time:params.last_time})
            return result.insertId;
        }
        

        * insertq_exam(q_id,exam_id,score){
            const result = yield this.app.mysql.insert('q_exam', {q_id:q_id,exam_id:exam_id,score:score});
            return result.insertId;
        }

        * updateexamquestion(q_id,params){
          const question = params.question;
          const row = {
           q_id:q_id,
           q_content:question.q_content,
           q_answer:question.q_answer,
           q_analysis:question.q_analysis,
           q_right:question.q_right,
           q_wrong:question.q_wrong,
            };
            const updateSuccess = yield this.app.mysql.update('question',row,{where:{q_id:q_id}});
            const deleteSuccess = yield this.app.mysql.delete('que_tag',{q_id:q_id});
            for(let item of question.tag){
                var insertSuccess = yield this.app.mysql.insert('que_tag',{q_id:q_id,tag_id:item});
            }
            const updateSuccess2 = yield this.app.mysql.update('q_exam',{score:params.score},{where:{exam_id:params.examId,q_id:q_id}})
            if(updateSuccess&&deleteSuccess&&insertSuccess&&updateSuccess2){
                return true;
            }else{
                return false;
            }    
        }
        *  isContained(a, b){
            console.log("8888888888")
            if(!(a instanceof Array) || !(b instanceof Array)) return false;
            if(a.length < b.length) return false;
            var aStr = a.toString();
            console.info(aStr);
            for(var i = 0, len = b.length; i < len; i++){
            console.info(aStr.indexOf(b[i]));
            if(aStr.indexOf(b[i]) == -1) return false;
            }
            return true;
            }
    }
    return QuestionService;
}

// select question.* from question,que_tag where question.q_type=3 and que_tag.tag_id=1 and que_tag.q_id=question.q_id AND question.q_id >= ((SELECT MAX(q_id) FROM question)-(SELECT MIN(q_id) FROM question)) * RAND() + (SELECT MIN(q_id) FROM question) limit 5