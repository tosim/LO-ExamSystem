'use strict';

module.exports = app => {
  class JudgeController extends app.Controller {
    
    * index() {
        this.ctx.session.user = yield this.service.v1.user.show('82415327@qq.com','056210');
        ///

        const {ctx} = this;
        // console.log(ctx.request.body);
        var score = 0;
        var req = ctx.request.body.allAnswers;
        const u_id = ctx.session.user.u_id ? ctx.session.user.u_id : ctx.request.body.u_id;
        var tagsRatio = {};
        for(let i in req){
            // console.log(ctx.request.body[i]);
            yield judge(req[i]);
        }

        var tmpdata = {
            score:score,
            tagsRatio:tagsRatio,
            quesList:req
        };
        yield app.mysql.query('update user set u_point=u_point + ? where u_id=?',[score - 70,u_id]);
        const u_point = (yield app.mysql.query('select u_point from user where u_id = ?',[u_id]))[0].u_point;
        // console.log('u_point = ' + u_point);
        const h_id = (yield app.mysql.insert('examhistory',{
            h_date:new Date(),
            u_id:u_id,
            h_grade:score,
            h_title:ctx.request.body.title,
            h_tag:ctx.request.body.tag ? ctx.request.body.tag : '',
            h_data:JSON.stringify(tmpdata),
            u_point:u_point
        })).insertId;
        // for(let i in req){
        //     yield app.mysql.insert('h_que',{
        //         h_id:h_id,
        //         q_id:req[i].q_id,
        //         hq_answer:req[i].answer,
        //     });
        // }
        console.log(req);
        console.log(tagsRatio);
        console.log(score);
        
        ctx.body = {
            success:1,
            data:{
                h_id:h_id
            },
            msg:''
        }
        function* judge(ans){
            // console.log(ans);
            var result = (yield app.mysql.query('select q_answer from question where q_id=?',[ans.q_id]))[0];
            var tags = yield app.mysql.query('select tag_name,tag.tag_id from tag,que_tag where que_tag.q_id=? and tag.tag_id=que_tag.tag_id',[ans.q_id]);
            var tag_ids = tags.map(function(item){
                return item.tag_id;
            });
            console.log('tag_ids------------------------------------');
            console.log(tag_ids);
            tags = tags.map(function(item){
                return item.tag_name;
            });
            ans.tags = tags.join('/');
            var isRight = 0;
            // tags = tags.join('/');
            // console.log(tags);
            result = result.q_answer;
            ans.trueAnswer = result;
            // console.log(result);
            if(ans.answer && (ans.answer === -1 || ans.answer === '')){
                isRight = 0;
                ans.answer = '空';
            }else if(ans.answers && ans.answers.length === 0){
                isRight = 0;
                ans.answer = '空';
            }
            else if(ans.q_type === 1){
                result = result.charCodeAt() - 65;
                if(ans.answer === result){
                    score += ans.score;
                    isRight = 1;
                }
                // ans.trueAnswer = result;
                ans.answer = String.fromCharCode(ans.answer+65);
                // ans.trueAnswer = String.fromCharCode(ans.trueAnswer+65);
                // console.log('end');
            }else if(ans.q_type === 2){
                result = result.split('&');
                if(ans.answers.length != result.length){
                }
                result.sort();
                ans.answers.sort();
                // console.log(ans.answers);
                // console.log(result);
                var flag = 0;
                for(let t = 0;t < result.length;t++){
                    // if(result[t])
                    result[t] = result[t].charCodeAt() - 65;
                    if(result[t] !== ans.answers[t]){
                        flag = 1;
                        // break;
                    }    
                }
                if(flag === 0){
                    score += ans.score;
                    isRight = 1;
                }
                // ans.trueAnswers = result;
                // ans.trueAnswer = ans.trueAnswers.map(function(item){
                //     return String.fromCharCode(item+65);
                // }).join('&');
                ans.answer = ans.answers.map(function(item){
                    return String.fromCharCode(item+65);
                }).join('&');
            }else if(ans.q_type === 3){
                console.log('判断题！--------------------------------');
                console.log('result = ' + result);
                console.log('answer = ' + ans.answer);
                if(result === 'T'){
                    // console.log('ans is T');
                    if(ans.answer === 0){
                        score += ans.score;
                        isRight = 1;
                        ans.answer = 'T'
                    }else{
                        ans.answer = 'F'
                    }
                    // ans.trueAnswer = 'T';
                }else if(result === 'F'){
                    // console.log('ans is F');
                    if(ans.answer === 1){
                        score += ans.score;
                        isRight = 1;
                        ans.answer = 'F'
                    }else{
                        ans.answer = 'T'
                    }
                    // ans.trueAnswer = 'F';
                }
                console.log('判断题！--------------------------------');
            }else if(ans.q_type === 4){
                result = result.split('|');
                ans.trueAnswers = result;
                // console.log(result);
                var oscore = parseInt(ans.score / result.length);
                var allscore = 0;
                // console.log('oscore = ' + oscore);
                for(let t = 0;t < result.length;t++){
                    result[t] = result[t].split('&');
                    // console.log(result[t]);
                    for(let p = 0;p < result[t].length;p++){
                        if(result[t][p] === ans.answers[t]){
                            if(t != result.length - 1){
                                score += oscore;
                                allscore += oscore;
                                // console.log('加了' + oscore + '分');
                            }else{
                                score += (ans.score - (result.length - 1) * oscore);
                                allscore += (ans.score - (result.length - 1) * oscore);
                                // console.log('加了' + (ans.score - (result.length - 1) * oscore) + '分');
                            }
                            // console.log(result[t][p],ans.answers[t]);
                            // console.log(t + 'right');
                            break;
                        }
                    }
                }
                if(allscore === ans.score){
                    isRight = 1;
                }
                ans.answer = ans.answers.join('|');
                // ans.trueAnswer = ans.trueAnswers.join('|');
            }else if(ans.q_type === 5){
                // ans.trueAnswer = result;
                isRight = 1;
            }else if(ans.q_type === 6){
                // ans.trueAnswer = result;
                isRight = 1;
            }
            
            ans.isRight = isRight;
            console.log('start');
            console.log(tags);
            for(let t = 0;t < tags.length;t++){
                const isExist = (yield app.mysql.query('select count(*) from u_tag where u_id=? and tag_id=?',[u_id,tag_ids[t]]))[0]['count(*)'];
                console.log('isExit!');
                console.log(isExist)
                // console.log(tag_ids[t]);
                if(tagsRatio[tags[t]]){
                    if(isRight){
                        tagsRatio[tags[t]].right++;
                    }else{
                        tagsRatio[tags[t]].wrong++;
                    }
                }else{
                    tagsRatio[tags[t]] = {};
                    tagsRatio[tags[t]].wrong = 0
                    tagsRatio[tags[t]].right = 0;
                    if(isRight){
                        tagsRatio[tags[t]].right++;
                    }else{
                        tagsRatio[tags[t]].wrong++;
                    }
                }
                if(isExist === 0){
                    console.log('insert into u_tag!');
                    yield app.mysql.insert('u_tag',{
                        u_id:u_id,
                        tag_id:tag_ids[t],
                        ut_right:isRight,
                        ut_wrong:1-isRight
                    });
                }else{
                    console.log('update u_tag!');
                    yield app.mysql.query('update u_tag set ut_right=ut_right + ?,ut_wrong = ut_wrong+? where u_id=? and tag_id=?',[isRight,1-isRight,u_id,tag_ids[t]]);
                }
            }
            
        }
    }
    
  }
  return JudgeController;
};