'use strict';

module.exports = app => {
    class QuestionController extends app.Controller {
        //1.随机考试，2.专项训练;返回试题列表？type='random' or 'taged'
        * index() {
            const { ctx } = this;
            ctx.validate({
                type: ['random', 'taged'],
                time: ['30', '60', '90'],
                difficulty: ['1', '2', '3']
            }, ctx.request.query);
            if (ctx.session.user == null) {
                ctx.body = {
                    success: 0,
                    data: null,
                    msg: 'not login'
                };
                return;
            }

            const req = ctx.request.query;
            req.time = parseInt(req.time);
            req.p_id = ctx.session.user.p_id;

            var data = {
                success: 1,
                msg: ''
            };
            if (type === 'random') {

            } else if (type === 'taged') {
                data.data = yield app.mysql.select('question', {
                    // where
                });
            }


            ctx.body = {
                success: 1,
                data: req,
                msg: ''
            }
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