'use strict';

module.exports = app => {
  class QuestionController extends app.Controller {
    //1.随机考试 根据用户段位，感兴趣的公司，用户职业
    //将考试信息存放在session中
    * index(){
        const {ctx,service} = this;
        ctx.validate({
            time:['30','60','90'],
        },ctx.request.query);

        console.log("get query");
        console.log(ctx.session.user);
        console.log("end");
        this.ctx.session.user = yield this.service.v1.user.show('82415327@qq.com','056210');
        //没有登录直接返回
        if(ctx.session.hasOwnProperty('user') === false){
            console.log('not login,21');
            ctx.body = {
                success:0,
                data: null,
                msg:'not login'
            };
            return;
        }
        //正在考试直接返回考试信息
        if(ctx.session.hasOwnProperty('exam')){
            if(ctx.session.exam.isEnd === false){
                console.log('already examing,27');
                var promiseList = [];
                for(let i = 0;i < ctx.session.exam.queList.length;i++){
                    promiseList.push(app.mysql.get('question',{q_id:ctx.session.exam.queList[i]}));
                }
                const queList = yield Promise.all(promiseList);
                ctx.session.exam.isEnd = true;
                
                ctx.body = {
                    success:1,
                    data:{
                        leftTime:ctx.session.exam.time + ctx.session.exam.beginTime - new Date().getTime(),
                        queList:queList
                    },
                    msg:'already examing'
                }
                return;
            }
        }
        //没有考试抽完题目再考试
        const req = ctx.request.query;
        req.u_id = ctx.session.user.u_id;
        req.time = parseInt(req.time);//考试时间
        req.p_id = ctx.session.user.p_id;//职业 
        req.u_level = ctx.session.user.u_level;//等级
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
        // console.log(req.select);
        const queList = yield service.v1.question.index(req);
        //将考试信息存放在session中
        
        if(queList != null){
            console.log('quesList ok ,length = ' + queList.length);
            ctx.session.exam = {};
            ctx.session.exam.isEnd = false;
            ctx.session.exam.beginTime = new Date().getTime();
            ctx.session.exam.time = req.time*60*1000;
            ctx.session.exam.queList = [];
            for(let i = 0;i < queList.length;i++){
                ctx.session.exam.queList.push(queList[i].q_id);
            }
            ctx.body = {
                success:1,
                data:{
                    leftTime:ctx.session.exam.time,
                    queList:queList
                },
                msg:'init exam infomation'
            }
        }else{
            ctx.body = {
                success:0,
                data:null,
                msg:'choose questions Error!'
            }
        }
    }

    * topic(){
        const {ctx,service} = this;
        ctx.validate({
            time:['30','60','90'],
            tag:{
                type:'string',
                required:false
            },
            enterprise:{
                type:'id',
                required:false
            }
        },ctx.request.query);
        const req = ctx.request.query;
        if(req.tag == null && req.enterprise == null){
            ctx.status = 422;
            return;
        }
        ctx.session.user = yield app.mysql.get('user',{u_id:11});
        
        if(ctx.session.user == null){
            ctx.body = {
                success:0,
                data: null,
                msg:'not login'
            };
            return;
        }
        
        req.u_id = ctx.session.user.u_id;
        req.time = parseInt(req.time);//考试时间
        req.u_level = (yield app.mysql.query('select lv_id from user,level where u_id=? and u_point >= lv_need order by lv_id desc limit 1',[req.u_id]))[0].lv_id;// 等级
        console.log(req);
        ctx.body = {
            success:1,
            data:req,
            msg:''
        }
    }
    
    * createBash(){
        const {ctx,service} = this;
        // console.log(ctx.request.body.questions);
        var questions =  ctx.request.body.questions;
        var insertCount = 0;
        for(let i = 0;i < questions.length;i++){
            // const isExist = (yield app.mysql.query('select count(*) as count from question where q_answer like "%' + questions[i].question.q_answer.replace(/(["'])/g,'\\$1') + '%"'))[0].count;
            // console.log(isExist);
            // if(isExist != 0){
            //     continue;
            // }
            const q_id = (yield app.mysql.insert('question',questions[i].question)).insertId;
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
            insertCount++;
        }
        ctx.body = {
            success:1,
            data:'insertCount = ' + insertCount,
            msg:''
        };
    }
    * create() {
        const { ctx, service } = this;
        const createRule = {
            question:'object',
            tag:'object',
        };
        ctx.validate(createRule);
        console.log(ctx.request.body);
        const tag = ctx.request.body.tag;
        const question = ctx.request.body.question;
        // console.log(question.q_content);
        const insertId = yield service.v1.question.create(question);
        console.log(typeof insertId);
        if (typeof insertId === 'number') {

            for(let value of tag){
                console.log(value.tag_id);
                var insertSuccess = yield service.v1.question.insertquetag(insertId,value.tag_id);
                console.log(insertSuccess);
            }

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
        } else {
            ctx.response.body = {
                success: 0,
                data: '',
                msg: '添加题目失败',
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