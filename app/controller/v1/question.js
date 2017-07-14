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
  class QuestionController extends app.Controller {
    

    //1.随机考试，2.专项训练;返回试题列表？type='random' or 'taged'
    * index(){
        const {ctx} = this;
        ctx.validate({
            time:['30','60','90'],
        },ctx.request.query);
        ctx.body = ctx.session.user;

        // ctx.session.user = yield app.mysql.get('user',{u_id:11});
        
        if(ctx.session.user == null){
            ctx.body = {
                success:0,
                data: null,
                msg:'not login'
            };
            return;
        }
        
        const req = ctx.request.query;
        req.u_id = ctx.session.user.u_id;
        req.time = parseInt(req.time);//考试时间
        req.p_id = ctx.session.user.p_id;//职业 
        req.u_level = (yield app.mysql.query('select lv_id from user,level where u_id=? and u_point >= lv_need order by lv_id desc limit 1',[req.u_id]))[0].lv_id;// 等级
        req.u_enterprises = yield app.mysql.query('select e_id from u_e where u_id=?',[req.u_id]);//用户所要申请的企业
        req.testpaper = (yield app.mysql.query('select * from testpaper where p_id=? LIMIT 1',[req.p_id]))[0];//试题类型数量
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
        var basesql = 'SELECT * FROM question,que_tag WHERE tag_id=? AND que_tag.q_id=question.q_id AND question.q_type=? AND e_id in (';
        for(let i = 0;i < req.u_enterprises.length;i++){
            if(i == 0){
                basesql += req.u_enterprises[i].e_id;
            }else{
                basesql +=  ',' + req.u_enterprises[i].e_id;
            }
        }
        var sql = basesql + ') AND question.q_id >= ((SELECT MAX(q_id)-? FROM question)-(SELECT MIN(q_id) FROM question)) * RAND() + (SELECT MIN(q_id) FROM question) ';
        sql = sql + 'AND abs(q_difficulty-'+req.u_level+') <= 1 ';
        sql += 'LIMIT ?';
        
        var queList = [];
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
                    var resql = getResql(basesql,queList,req.select[i].q_type);                   
                    tmpList = yield app.mysql.query(resql,[req.select[i].tag_id,req.select[i].q_type,req.select[i].num - pushed - cnt]);
                    if(tmpList.length != req.select[i].num - pushed - cnt){
                        ctx.body = {
                            success:0,
                            data:null,
                            msg:'no enough question to show'
                        }
                        return;
                    }else{
                        queList = queList.concat(tmpList);
                    }
                }
                if(cnt != 0){
                    var resql = getResql(basesql,queList,req.select[i].q_type);
                    tmpList = yield app.mysql.query(resql,[req.select[i].tag_id,req.select[i].q_type,cnt]);
                    if(tmpList.length != cnt){
                        ctx.body = {
                            success:0,
                            data:null,
                            msg:'no enough question to show'
                        }
                        return;
                    }else{
                        queList = queList.concat(tmpList);
                    }
                }
                console.log(`tag[${req.select[i].tag_id}],cnt = ${queList.length}`);
                //end 去重
            }
            
        }
        ctx.body = {
            success:1,
            data:queList,
            msg:''
        };
    }

    * create() {
            const { ctx, service } = this;
            const createRule = {
                q_type: { type: 'id' },
                q_content: { type: 'string' },
                q_answer: { type: 'string' },
                q_analysis: { type: 'string' },
            };
            ctx.validate(createRule);
            console.log(ctx.request.body);
            const insertSuccess = yield service.v1.question.create(ctx.request.body);
            if (insertSuccess) {
                ctx.response.body = {
                    success: 1,
                    data: '',
                    msg: '添加成功',
                }
            } else {
                ctx.response.body = {
                    success: 0,
                    data: '',
                    msg: '添加失败',
                }
            }
        }
        * list() {
            const { ctx, service } = this;
            const curr = parseInt(ctx.query.page);
            console.log(typeof curr);
            const pagesize = 8;
            // console.log(pagesize);
            const currnum = (curr - 1) * pagesize;
            const questionnum = (yield service.v1.question.getquestionnum())[0].qnum;
            console.log(questionnum);
            const QuestionList = yield service.v1.question.list(currnum);
            // console.log(QuestionList[0].q_id);
            const totalnum = Math.ceil(questionnum / pagesize);
            // console.log(typeof QuestionList);
            yield this.myresponse(ctx, QuestionList, totalnum);
        }
        * listorderbyzan(){
            const { ctx, service } = this;
            const curr = parseInt(ctx.query.page);
            const pagesize = 8;
            const currnum = (curr - 1) * pagesize;
            const questionnum = (yield service.v1.question.getquestionnum())[0].qnum;
            const QuestionList = yield service.v1.question.listorderbyzan(currnum);;
            const totalnum = Math.ceil(questionnum / pagesize);
            yield this.myresponse(ctx, QuestionList, totalnum);
        }
        * listorderbycai(){
            const { ctx, service } = this;
            const curr = parseInt(ctx.query.page);
            const pagesize = 8;
            const currnum = (curr - 1) * pagesize;
            const questionnum = (yield service.v1.question.getquestionnum())[0].qnum;
            const QuestionList = yield service.v1.question.listorderbycai(currnum);;
            const totalnum = Math.ceil(questionnum / pagesize);
            yield this.myresponse(ctx, QuestionList, totalnum);
        }
        * getlistbytag() {
            const { ctx, service } = this;
            const tag_id = ctx.query.tag_id;
            const curr = parseInt(ctx.query.page);
            const pagesize = 8;
            const currnum = (curr - 1) * pagesize;
            const questionnum = (yield service.v1.question.getquestionnumbytag(tag_id))[0].qnum;
            const QuestionList = yield service.v1.question.getlistbytag(tag_id, currnum);
            const totalnum = Math.ceil(questionnum / pagesize);
            yield this.myresponse(ctx, QuestionList, totalnum);
        }
        * getlistbytype() {
            const { ctx, service } = this;
            const q_type = ctx.query.q_type;
            const curr = parseInt(ctx.query.page);
            const pagesize = 8;
            const currnum = (curr - 1) * pagesize;
            const questionnum = (yield service.v1.question.getquestionnumbytype(q_type))[0].qnum;
            const QuestionList = yield service.v1.question.getlistbytype(q_type, currnum);
            const totalnum = Math.ceil(questionnum / pagesize);
            yield this.myresponse(ctx, QuestionList, totalnum);
        } 

        * getquestionbyid() {
            const { ctx, service } = this;
            const q_id = ctx.query.q_id;
            const question = yield service.v1.question.getquestionbyid(q_id);
            if (question.length == 0) {
                ctx.response.body = {
                    success: 0,
                    data: '',
                    msg: '取出题目失败',
                };
            } else {
                ctx.response.body = {
                    success: 1,
                    data: {Question:question
                    },
                    msg: '取出题目成功',
                }
            }
        }
        * updatequestion(){
             const { ctx, service } = this;
             const updateSuccess = yield service.v1.question.updatequestion(ctx.query.q_id,ctx.request.body);
             if (updateSuccess) {
                ctx.response.body = {
                    success: 1,
                    data: '',
                    msg: '添加成功',
                }
            } else {
                ctx.response.body = {
                    success: 0,
                    data: '',
                    msg: '添加失败',
                }
            }

        }
        * deletequestion(){
            const {ctx, service } = this;
            const deleteSuccess = yield service.v1.question.deletequestion(ctx.query.q_id);
            if (deleteSuccess) {
                ctx.response.body = {
                    success: 1,
                    data: '',
                    msg: '删除成功',
                }
            } else {
                ctx.response.body = {
                    success: 0,
                    data: '',
                    msg: '删除失败',
                }
            }
        } 
        * myresponse(ctx, QuestionList, totalnum) {
            if (QuestionList.length == 0) {
                ctx.response.body = {
                    success: 0,
                    data: '',
                    msg: '列出题目失败',
                };
            } else {
                ctx.response.body = {
                    success: 1,
                    data: {
                        questionlist: QuestionList,
                        totalnum: totalnum
                    },
                    msg: '列出题目成功',
                };
            }
        }


  }
  return QuestionController;
};