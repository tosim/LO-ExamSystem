'use strict';

module.exports = app => {
  class QuestionController extends app.Controller {
    //1.随机考试 根据用户段位，感兴趣的公司，用户职业
    //将考试信息存放在session中
    * index(){
        this.ctx.session.user = yield this.service.v1.user.show('82415327@qq.com','056210');
        
        const {ctx,service} = this;
        ctx.validate({
            time:{
                type:"enum",
                values:['30','60','90'],
                required:false
            },
            type:['1','2','3']
        },ctx.request.query);
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
        var queData;
        if(ctx.query.type == 1){
            queData = yield service.v1.question.random(ctx);
        }else if(ctx.query.type == 2){
            queData = yield service.v1.question.topic(ctx);
        }else if(ctx.query.type == 3){
            console.log('企业考试');

            queData = yield service.v1.question.enterTest(ctx);
        }
        //将考试信息存放在session中
        
        if(queData != null){
            console.log('quesList ok ,length = ' + queData.queList.length);
            ctx.session.exam = {};
            ctx.session.exam.isEnd = false;
            if(ctx.query.type != 3){
                ctx.session.exam.beginTime = new Date().getTime();
                ctx.session.exam.time = (parseInt(ctx.request.query.time))*60*1000;
            }else{
                ctx.session.exam.beginTime = queData.start_time;
                ctx.session.exam.time = queData.last_time*60*1000;
            }
            ctx.session.exam.queList = [];
            ctx.session.exam.scores = queData.scores;
            for(let i = 0;i < queData.queList.length;i++){
                ctx.session.exam.queList.push(queData.queList[i].q_id);
            }
            ctx.body = {
                success:1,
                data:{
                    leftTime:ctx.session.exam.time,
                    queList:queData.queList,
                    scores:queData.scores
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

    
    * createBash(){
        const {ctx,service} = this;
        // console.log(ctx.request.body.questions);
        var questions =  ctx.request.body.questions;
        // var insertCount = 0;
        // for(let i = 0;i < questions.length;i++){
        //     // const isExist = (yield app.mysql.query('select count(*) as count from question where q_answer like "%' + questions[i].question.q_answer.replace(/(["'])/g,'\\$1') + '%"'))[0].count;
        //     // console.log(isExist);
        //     // if(isExist != 0){
        //     //     continue;
        //     // }
        //     const q_id = (yield app.mysql.insert('question',questions[i].question)).insertId;
        //     console.log("q_id = " + q_id);
        //     for(let j = 0;j < questions[i].tags.length;j++){
        //         const result = (yield app.mysql.query('select tag_id from tag where tag_name like "%' + questions[i].tags[j] + '%"'))[0];
        //         if(typeof result == 'undefined' === false){
        //             console.log('adadad');
        //             console.log('tag_id = ' + result.tag_id);
        //             yield app.mysql.insert('que_tag',{q_id:q_id,tag_id:result.tag_id});
        //         }
        //         // console.log(tag_id);
        //     }
        //     insertCount++;
        // }
        const insertIds = yield this.service.v1.question.createBash(result);

        ctx.body = {
            success:1,
            data:{insertIds:insertIds},
            msg:''
        };
    }

    //------------

    * getexamquestionlist(){
        const {ctx, service} = this;
        const QuestionList = yield service.v1.question.getquestlistbyexamid(ctx.request.query.examid);
        for (let item of QuestionList){
            const tag = yield service.v1.question.gettagbyid(item.q_id);
            item.tag =tag; 
        }
            if (QuestionList.length == 0) {
            ctx.response.body = {
                success: 0,
                data: '',
                msg: '取出题目失败',
            };
        } else {
            ctx.response.body = {
                success: 1,
                data: {questionlist:QuestionList
                },
                msg: '取出题目成功',
            }
        }
    }

    * examjudge(){
            const {ctx, service} = this;
            const params = ctx.request.body;
            const q_id = params.q_id;
            console.log(q_id);
            if(q_id === -1){
                console.log("11111")
               let data = {
                 question : {
                   q_type:params.q_type,
                   q_content:params.q_content,
                   q_answer:params.q_answer,
                   q_analysis:params.q_analysis,
                   q_difficulty:params.q_difficulty,
                   q_right:0,
                   q_wrong:0,
                   q_reportnum:0,
                   e_id:params.e_id,
                },
                tag :  params.tag,
                score:params.score,
                examId:params.examId,
               }
            console.log(data);
              yield this.insertexamquestion(ctx,service,data);
            }else{
              let data = {
              question : {
                   q_type:params.q_type,
                   q_content:params.q_content,
                   q_answer:params.q_answer,
                   q_analysis:params.q_analysis,
                   q_difficulty:params.q_difficulty,
                   q_right:0,
                   q_wrong:0,
                   q_reportnum:0,
                   e_id:1,
                   tag: params.tag,
                   
              },
                score:params.score,
                examId:params.examId,
            }
            yield this.updateexamquestion(ctx,service,q_id,data);
         }
          }
        * insertexamquestion(ctx,service,data){
            console.log("插入插入")
             const insertId = yield service.v1.question.create(data.question);
            console.log(typeof insertId);
            if (typeof insertId === 'number') {

                for(let value of data.tag){
                    console.log(value);
                    var insertSuccess = yield service.v1.question.insertquetag(insertId,value);
                    console.log(insertSuccess);
                }
                yield service.v1.question.insertq_exam (insertId,data.examId,data.score)
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
         * updateexamquestion(ctx,service,q_id,data){
            const updateSuccess = yield service.v1.question.updateexamquestion(q_id,data);
             if (updateSuccess) {
                ctx.response.body = {
                    success: 1,
                    data: '',
                    msg: '修改成功',
                }
            } else {
                ctx.response.body = {
                    success: 0,
                    data: '',
                    msg: '修改失败',
                }
            }
        
        }
             * judge(){
            const {ctx,service} = this;
            // const createRule = {
            // q_analysis:"string",
            // q_answer:"string",
            // q_content:"string",
            // q_difficulty:"id",
            // q_id:"object",
            // q_type:"id",
            // tag:"object",
            // };
            // ctx.validate(createRule);
            const params = ctx.request.body;
            console.log(params);
            const q_id = params.q_id;
            console.log(q_id);
            if(q_id === -1){
                console.log("11111")
               let data = {
                 question : {
                   q_type:params.q_type,
                   q_content:params.q_content,
                   q_answer:params.q_answer,
                   q_analysis:params.q_analysis,
                   q_difficulty:params.q_difficulty,
                   q_right:0,
                   q_wrong:0,
                   q_reportnum:0,
                   e_id:1,
                },
                tag :  params.tag,
               }
            console.log(data);
              yield this.create(ctx,service,data);
            }else{
              let data = {
              question : {
                   q_type:params.q_type,
                   q_content:params.q_content,
                   q_answer:params.q_answer,
                   q_analysis:params.q_analysis,
                   q_difficulty:params.q_difficulty,
                   q_right:0,
                   q_wrong:0,
                   q_reportnum:0,
                   e_id:1,
                   tag: params.tag,
                   
              }
            }
            yield this.updatequestion(ctx,service,q_id,data);
        }
         }
        * create(ctx,service,data) {
            // const { ctx, service } = this;
            // const createRule = {
            //     question:'object',
            //     tag:'object',
            // };
            // ctx.validate(createRule);
            // console.log(ctx.request.body);
            // const tag = ctx.request.body.tag;
            // const question = ctx.request.body.question;
            // console.log(question.q_content);
            console.log("insert");
            const insertId = yield service.v1.question.create(data.question);
            console.log(typeof insertId);
            if (typeof insertId === 'number') {

                for(let value of data.tag){
                    console.log(value);
                    var insertSuccess = yield service.v1.question.insertquetag(insertId,value);
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
        * search(){
            const {ctx, service} = this;
            const curr = parseInt(ctx.request.body.page);
             const pagesize = 8;
            // console.log(pagesize);
            const currnum = (curr - 1) * pagesize;
            const result = yield service.v1.question.query(ctx.request.body.query,currnum);
            const QuestionList = result.questionlist;
            for (let item of QuestionList){
                const tag = yield service.v1.question.gettagbyid(item.q_id);
                item.tag =tag; 
            }
            const questionnum = result.qnum;
            const totalnum = Math.ceil(questionnum / pagesize);
            yield this.myresponse(ctx, QuestionList, totalnum);
             
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
            for (let item of QuestionList){
                console.log(item.q_id);
                const tag = yield service.v1.question.gettagbyid(item.q_id);
                item.tag =tag; 
            }
            // console.log(QuestionList[0].q_id);
            const totalnum = Math.ceil(questionnum / pagesize);
            // console.log(typeof QuestionList);
            yield this.myresponse(ctx, QuestionList, totalnum);
        }
        * getlistbykey(){
            const { ctx, service } = this;
            ctx.validate({
                key:{
                  required:false,
                  type:'string',
                },
                tag:{
                    required:false,
                    type:'string',
                }
            }, ctx.request.query);
            const key = (ctx.query.key).toString();
            const curr = parseInt(ctx.query.page);
            console.log(typeof curr);
            const pagesize = 8;
            // console.log(pagesize);
            const currnum = (curr - 1) * pagesize;
            const questionnum = (yield service.v1.question.getquestionnum())[0].qnum;
            console.log(questionnum);
            const QuestionList = yield service.v1.question.getlistbykey(currnum,key);
            for (let item of QuestionList){
                console.log(item.q_id);
                const tag = yield service.v1.question.gettagbyid(item.q_id);
                item.tag =tag; 
            }
            // console.log(QuestionList[0].q_id);
            const totalnum = Math.ceil(questionnum / pagesize);
            // console.log(typeof QuestionList);
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
        // * getquestionbyid() {
        //     const { ctx, service } = this;
        //     const q_id = ctx.query.q_id;
        //     const question = yield service.v1.question.getquestionbyid(q_id);
        //     if (question.length == 0) {
        //         ctx.response.body = {
        //             success: 0,
        //             data: '',
        //             msg: '取出题目失败',
        //         };
        //     } else {
        //         ctx.response.body = {
        //             success: 1,
        //             data: {Question:question
        //             },
        //             msg: '取出题目成功',
        //         }
        //     }
        // }
        * getquestionbyid() {
            const { ctx, service } = this;
            const q_id = ctx.query.q_id;
            const question = (yield service.v1.question.getquestionbyid(q_id))[0];
            console.log(question)
            const tag = yield service.v1.question.gettagbyid(question.q_id);
            question.tag =tag; 
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
        * updatequestion(ctx,service,q_id,data){
            //  const { ctx, service } = this;
             const updateSuccess = yield service.v1.question.updatequestion(q_id,data.question);
             if (updateSuccess) {
                ctx.response.body = {
                    success: 1,
                    data: '',
                    msg: '修改成功',
                }
            } else {
                ctx.response.body = {
                    success: 0,
                    data: '',
                    msg: '修改失败',
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
        * batchdelete(){
            const {ctx, service} = this;
            const q_idlist = ctx.request.body;
            for(let item of q_idlist){
              yield service.v1.question.deletequestion(item);
            };
            ctx.response.body = {
                    success: 1,
                    data: '',
                    msg: '删除成功',
            }
        }
        * addexamquestion() {
            console.log("111111")
            const { ctx, service } = this;
            const result = yield service.v1.question.addexamquestion(ctx.request.body);
            if (result) {
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

        * addexamquestion() {
            // console.log("111111")
            const { ctx, service } = this;
            const result = yield service.v1.question.addexamquestion(ctx.request.body);
            if (result) {
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
        * addexam(){
            const{ctx, service} = this;
            const examId = yield service.v1.question.insertexam(ctx.request.body);
            if (typeof examId === 'number') {
              ctx.response.body = {
                 success: 1,
                 data: {examId:examId},
                 msg: '添加成功',
             }
                }else{
              ctx.response.body = {
                 success: 0,
                 data: '',
                 msg: '添加失败', 
             }
            }
         }

  }
  return QuestionController;
};