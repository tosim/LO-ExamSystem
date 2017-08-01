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
        * index(req){
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
            return queList;
        }
        * readTemplate(filePath){
            const shelljs = require('shelljs');
            const cheerio = require('cheerio');
            var request = require('request');
            var path = require('path');

            var data = '';
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
                console.log(insertDatas);
                request.post({url:'http://127.0.0.1:7001/v1/questions/bash', form:{questions:insertDatas}}, function (err, res, body) {
                    if (err) {
                        return console.error('upload failed:', err);
                    }
                    console.log('Upload successful!  Server responded with:', body);
                });
                // console.log(insertDatas.length);
                // console.log(insertDatas);
                return insertDatas;
            });
        }
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
            const result = yield this.app.mysql.query('select * from question limit ?,8', currnum);
            return result;
        }
        * listorderbyzan(currnum){
            const result = yield this.app.mysql.query('select * from question order by q_zan desc limit ?,8 ',currnum);
            return result;
        }
        * listorderbycai(currnum){
            const result = yield this.app.mysql.query('select * from question order by q_cai desc limit ?,8 ',currnum);
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
         console.log(updateSuccess);
         return updateSuccess;
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

// SELECT question.* FROM question,que_tag 
// WHERE tag_id=2 
// AND que_tag.q_id=question.q_id 
// AND question.q_type=6 AND e_id in (1,1) 
// AND question.q_id >= ((SELECT MAX(q_id) FROM question)-(SELECT MIN(q_id) FROM question)) * RAND() + (SELECT MIN(q_id) FROM question) 
// AND abs(q_difficulty-1) <= 2 LIMIT 1