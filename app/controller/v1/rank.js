
'use strict';

module.exports = app => {
  class RankController extends app.Controller {
    * list(){
        const {ctx} = this;
        const professions = yield app.mysql.select('profession',{limit:3});
        const tags = yield app.mysql.select('tag',{limit:2});
        const e_exams = yield app.mysql.query('select enterprise.e_name,profession.p_name,e_exam.exam_id from enterprise,profession,e_exam where enterprise.e_id=e_exam.e_id and profession.p_id=e_exam.p_id limit 5');

        var list = professions.concat(tags);
        list = list.concat(e_exams);
        // console.log(list);
        ctx.body = {
            success:1,
            data:list,
            msg:''
        }
    }
    * index() {
        this.ctx.session.user = yield this.service.v1.user.show('82415327@qq.com','056210');

        const {ctx} = this;
        const professions = yield app.mysql.select('profession');
        const tags = yield app.mysql.select('tag');
        const e_exams = yield app.mysql.select('e_exam');

        // console.log(professions);

        var rankList = [];
        for(let i = 0;i < professions.length;i++){
            var myRank = (yield app.mysql.query('select count(*)+1 as cnt from user where p_id=? and u_point>?',[professions[i].p_id,ctx.session.user.u_point]))[0].cnt;
            var rankData = yield app.mysql.query('select u_img,u_name,u_point from user where p_id=? order by u_point desc limit ?',[professions[i].p_id,10]);
            for(let j in rankData){
                rankData[j].attribute = rankData[j].u_point;
                delete rankData[j].u_point;
            }
            var rank = {
                rankName:professions[i].p_name,
                rankAttribute:'rank点',
                myAttribute:ctx.session.user.u_point ? ctx.session.user.u_point : '无',
                myImg: ctx.session.user.u_img,
                myName: ctx.session.user.u_name,
                myRank:myRank ? myRank : '无',
                rankData:rankData
            }
            if(rankData.length != 0){
                rankList.push(rank);
            }
        }
        for(let i = 0;i < tags.length;i++){
            var myRatio = yield app.mysql.query('select (ut_right/(ut_right+ut_wrong))*100 as ratio from u_tag where u_id=? and tag_id=?',[ctx.session.user.u_id,tags[i].tag_id]);
            // if(myRatio.length === 0){
            //     continue;
            // }
            // console.log('~~~~~~~~~~~~~~');
            // console.log(myRatio);
            // console.log(tags[i].tag_name+'\n');
            var myRank = '无';
            if(myRatio.length !== 0){
                myRank = (yield app.mysql.query('select count(*)+1 as cnt from u_tag where tag_id=? and (ut_right/(ut_right+ut_wrong))>?',[tags[i].tag_id,myRatio[0].ratio]))[0].cnt;
            }
            var rankData = yield app.mysql.query('select u_img,u_name,(ut_right/(ut_right+ut_wrong))*100 as attribute from u_tag,user where tag_id=? and u_tag.u_id=user.u_id order by attribute desc',[tags[i].tag_id]);
            for(let j in rankData){
                rankData[j].attribute = rankData[j].attribute.toFixed(2);
            }
            var rank = {
                rankName:tags[i].tag_name,
                rankAttribute:'正确率',
                myAttribute:myRatio.length !==0 ? myRatio[0].ratio.toFixed(2):'无',
                myImg: ctx.session.user.u_img,
                myName: ctx.session.user.u_name,
                myRank:myRank ? myRank : '无',
                rankData:rankData
            }
            if(rankData.length != 0){
                rankList.push(rank);
            }
        }
        for(let i = 0;i < e_exams.length;i++){
            var myRank = (yield app.mysql.query('select count(*)+1 as cnt from u_exam where exam_id=? and score>(select score from u_exam where u_id=? and exam_id=?) ',[e_exams[i].exam_id,ctx.session.user.u_id,e_exams[i].exam_id]))[0].cnt;
            var rankData = yield app.mysql.query('select u_img,u_name,score as attribute from user,u_exam where exam_id=? and u_exam.u_id=user.u_id order by score desc limit ?',[e_exams[i].exam_id,10]);
            var myScore = yield app.mysql.get('u_exam',{
                u_id:ctx.session.user.u_id,
                exam_id:e_exams[i].exam_id
            });
            // console.log("myscore = " + myScore);
            var rankName = yield app.mysql.query('select enterprise.e_name,profession.p_name from enterprise,profession,e_exam where e_exam.exam_id=? and enterprise.e_id=e_exam.e_id and profession.p_id=e_exam.p_id',[e_exams[i].exam_id]);
            rankName = rankName[0];
            var rank = {
                rankName:rankName.e_name+rankName.p_name+'_'+e_exams[i].exam_id,//
                rankAttribute:'分数',
                myAttribute:myScore ? myScore.score : '无',
                myImg: ctx.session.user.u_img,
                myName: ctx.session.user.u_name,
                myRank:myRank ? myRank : '无',
                rankData:rankData
            }
            if(rankData.length != 0){
                rankList.push(rank);
            }
        }
        ctx.body = {
            success:1,
            data:rankList,
            msg:''
        }
    }
    
    * show(){
        this.ctx.session.user = yield this.service.v1.user.show('82415327@qq.com','056210');
        const {ctx} = this;
        const tag_id = ctx.request.query.tag_id;
        const p_id = ctx.request.query.p_id;
        const exam_id = ctx.request.query.exam_id;
        // console.log('tag_id = ' + tag_id);
        // console.log('p_id = ' + p_id);
        var rank;
        if(p_id){
            var p_name = (yield app.mysql.query('select p_name from profession where p_id=?',[p_id]))[0].p_name;
            var myRank = (yield app.mysql.query('select count(*)+1 as cnt from user where p_id=? and u_point>?',[p_id,ctx.session.user.u_point]))[0].cnt;
            
            var rankData = yield app.mysql.query('select u_img,u_name,u_point as attribute from user where p_id=? order by u_point desc limit ?',[p_id,10]);
            rank = {
                rankName:p_name,
                rankAttribute:'rank点',
                myAttribute:ctx.session.user.u_point ? ctx.session.user.u_point : '无',
                myImg: ctx.session.user.u_img,
                myName: ctx.session.user.u_name,
                myRank:myRank ? myRank : '无',
                rankData:rankData
            }
            
        }else if(tag_id){
            console.log('want get tag_id ');
            var tag_name = (yield app.mysql.query('select tag_name from tag where tag_id=?',[tag_id]))[0].tag_name;
            var myRatio = yield app.mysql.query('select (ut_right/(ut_right+ut_wrong))*100 as ratio from u_tag where u_id=? and tag_id=?',[ctx.session.user.u_id,tag_id]);
            console.log(myRatio);
            var myRank;
            if(myRatio.length !== 0){
                myRank = (yield app.mysql.query('select count(*)+1 as cnt from u_tag where tag_id=? and (ut_right/(ut_right+ut_wrong))>?',[tag_id,myRatio[0].ratio]))[0].cnt;
            }else{
                myRank = '无';
            }
            var rankData = yield app.mysql.query('select u_img,u_name,(ut_right/(ut_right+ut_wrong))*100 as attribute from u_tag,user where tag_id=? and u_tag.u_id=user.u_id order by attribute desc',[tag_id]);
            for(let j in rankData){
                rankData[j].attribute = rankData[j].attribute.toFixed(2);
            }
            rank = {
                rankName:tag_name,
                rankAttribute:'正确率',
                myAttribute:myRatio.length!==0 ? myRatio[0].ratio.toFixed(2) : '无',
                myImg: ctx.session.user.u_img,
                myName: ctx.session.user.u_name,
                myRank:myRank ? myRank : '无',
                rankData:rankData
            }
        }else if(exam_id){
            var myRank = (yield app.mysql.query('select count(*)+1 as cnt from u_exam where exam_id=? and score>(select score from u_exam where u_id=? and exam_id=?) ',[exam_id,ctx.session.user.u_id,exam_id]))[0].cnt;
            var rankData = yield app.mysql.query('select u_img,u_name,score as attribute from user,u_exam where exam_id=? and u_exam.u_id=user.u_id order by score desc limit ?',[exam_id,10]);
            var myScore = yield app.mysql.get('u_exam',{
                u_id:ctx.session.user.u_id,
                exam_id:exam_id
            });
            // console.log("myscore = " + myScore);
            var rankName = yield app.mysql.query('select enterprise.e_name,profession.p_name from enterprise,profession,e_exam where e_exam.exam_id=? and enterprise.e_id=e_exam.e_id and profession.p_id=e_exam.p_id',[exam_id]);
            rankName = rankName[0];
            var rank = {
                rankName:rankName.e_name+rankName.p_name+'_'+exam_id,//
                rankAttribute:'分数',
                myAttribute:myScore ? myScore.score : '无',
                myImg: ctx.session.user.u_img,
                myName: ctx.session.user.u_name,
                myRank:myRank ? myRank : '无',
                rankData:rankData
            }
        }
        console.log(rank);
        ctx.body = {
            success:1,
            data:rank,
            msg:''
        }
    }
  }
  return RankController;
};
