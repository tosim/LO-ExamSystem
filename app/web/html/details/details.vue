<template>
  <div class="details_all">
    <div class="gray"></div>
    <lo-head></lo-head>
    <div class="details_body">
      <div class="details_left">
        <div class="detail_l_t">
          <div class="detail_title">
            <i class="layui-icon" style="color:orange;">&#xe635;</i>
            <span v-if="detailType==1">[单选题]</span>
            <span v-else-if="detailType==2">[多选题]</span>
            <span v-else-if="detailType==3">[判断题]</span>
            <span v-else-if="detailType==4">[填空题]</span>
            <span v-else-if="detailType==5">[简答题]</span>
            <span v-else-if="detailType==6">[编程题]</span>
          </div>
          <!--单选题  -->
          <div class="detail_body" v-if="detailType==1">
            <div class="detail_body_t">
                  <div class="topic-title" v-html="ochoose.q_content.main"></div>
              <div v-for="item in ochoose.q_content.items" :key="item.value">{{item}}</div>
            </div>
            <div class="detail_body_c">
              <dl>
                <dt>正确答案：</dt>
                <dd>
                  {{ochoose.q_answer}}
                  <br>
                  <br>
                  {{ochoose.q_analysis}}
                </dd>
              </dl>
            </div>
            <div class="detail_body_b">
              <ul>
                <li @click="collection" id="collectionBtn">
                  <i class="layui-icon">&#xe600;</i>收藏</li>
                <!--<li>
                  <i class="layui-icon">&#xe641;</i>分享</li>-->
                <li @click="dialogReportVisible = true">
                  <i class="layui-icon">&#x1007;</i>举报</li>
              </ul>
            </div>
          </div>
          <!--多选题  -->
          <div class="detail_body" v-if="detailType==2">
            <div class="detail_body_t">
              <div class="topic-title" v-html="mchoose.q_content.main"></div>
              <div v-for="item in mchoose.q_content.items" :key="item.value">{{item}}</div>
            </div>
            <div class="detail_body_c">
              <dl>
                <dt>正确答案：</dt>
                <dd>
                  <span v-for="item in mchoose.q_answer" :key="item.value">{{item}}</span>
                  <br>
                  <br>
                  {{mchoose.q_analysis}}
                </dd>
              </dl>
            </div>
            <div class="detail_body_b">
              <ul>
                <li @click="collection" id="collectionBtn">
                  <i class="layui-icon">&#xe600;</i>收藏</li>
                <!--<li>
                  <i class="layui-icon">&#xe641;</i>分享</li>
                <li @click="dialogReportVisible = true">-->
                  <i class="layui-icon">&#x1007;</i>举报</li>
              </ul>
            </div>
          </div>
          <!--判断题  -->
          <div class="detail_body" v-if="detailType==3">
            <div class="detail_body_t">
              <div class="topic-title" v-html="judge.q_content"></div>
              <div v-for="item in judge.items" :key="item.value">{{item}}</div>
            </div>
            <div class="detail_body_c">
              <dl>
                <dt>正确答案：</dt>
                <dd>
                  {{judge.q_answer}}
                  <br>
                  <br>
                  {{judge.q_analysis}}
                </dd>
              </dl>
            </div>
            <div class="detail_body_b">
              <ul>
                <li @click="collection" id="collectionBtn">
                  <i class="layui-icon">&#xe600;</i>收藏</li>
                <!--<li>
                  <i class="layui-icon">&#xe641;</i>分享</li>
                <li @click="dialogReportVisible = true">-->
                  <i class="layui-icon">&#x1007;</i>举报</li>
              </ul>
            </div>
          </div>
          <!--填空题  -->
          <div class="detail_body" v-if="detailType==4">
            <div class="detail_body_t">
              <div class="topic-title" v-html="fill.q_content.main"></div>
            </div>
            <div class="detail_body_c">
              <dl>
                <dt>正确答案：</dt>
                <dd>
                  {{fill.q_answer}}
                  <br>
                  <br>
                  {{fill.q_analysis}}
                </dd>
              </dl>
            </div>
            <div class="detail_body_b">
              <ul>
                <li @click="collection" id="collectionBtn">
                  <i class="layui-icon">&#xe600;</i>收藏</li>
                <!--<li>
                  <i class="layui-icon">&#xe641;</i>分享</li>
                <li @click="dialogReportVisible = true">-->
                  <i class="layui-icon">&#x1007;</i>举报</li>
              </ul>
            </div>
          </div>
          <!--简答题  -->
          <div class="detail_body" v-if="detailType==5">
            <div class="detail_body_t">
              <div class="topic-title" v-html="squestion.q_content"></div>
            </div>
            <div class="detail_body_c">
              <dl>
                <dt>正确答案：</dt>
                <dd>
                  {{squestion.q_answer}}
                  <br>
                  <br>
                  {{squestion.q_analysis}}
                </dd>
              </dl>
            </div>
            <div class="detail_body_b">
              <ul>
                <li @click="collection" id="collectionBtn">
                  <i class="layui-icon">&#xe600;</i>收藏</li>
                <!--<li>
                  <i class="layui-icon">&#xe641;</i>分享</li>
                <li @click="dialogReportVisible = true">-->
                  <i class="layui-icon">&#x1007;</i>举报</li>
              </ul>
            </div>
          </div>
          <!--编程题  -->
          <div class="detail_body" v-if="detailType==6">
            <div class="detail_body_t">
              <div class="topic-title" v-html="code.q_content"></div>
            </div>
            <div class="detail_body_c">
              <dl>
                <dt>正确答案：</dt>
                <dd>
                  {{code.q_answer}}
                  <br>
                  <br>
                  {{code.q_analysis}}
                </dd>
              </dl>
            </div>
            <div class="detail_body_b">
              <ul>
                <li @click="collection" id="collectionBtn">
                  <i class="layui-icon">&#xe600;</i>收藏</li>
                <!--<li>
                  <i class="layui-icon">&#xe641;</i>分享</li>
                <li @click="dialogReportVisible = true">-->
                  <i class="layui-icon">&#x1007;</i>举报</li>
              </ul>
            </div>
          </div>
          <div class="detail_air">
            <a :href="'/public/details.html?q_id='+(q_id-1)" style="background: url(//static.nowcoder.com/images/img/subject-direct.png) 0 -41px no-repeat;padding-left: 25px;float: left;">上一题</a>
            <a :href="'/public/details.html?q_id='+(q_id+1)" style="background: url(//static.nowcoder.com/images/img/subject-direct.png) right -82px no-repeat;padding-right: 25px;float: right;">下一题</a>
          </div>
        </div>
        <div class="detail_l_c">
          <div class="comment_title">
            <span style="font-size: 16px;line-height: 16px;float: left;font-weight: 700;white-space: nowrap;margin-top:10px;">{{commentNum}}个评论</span>
            <a class="layui-btn" style="float:right" href="#tijiao">
              <i class="layui-icon">&#xe642;</i> 添加评论
            </a>
          </div>
          <div class="comment_body">
            <one_comment v-for="item in commentList" :key="item.value" :userLink="item.userLink" :userImg="item.userImg" :userName="item.userName" :commentContent="item.commentContent" :commentDate="item.commentDate" :zanNum="item.zanNum"></one_comment>
          </div>
        </div>
        <div class="detail_l_b" style="background:white;">
          <textarea id="demo" style="display: none;" v-model="commentText"></textarea>
          <div class="textareaFoot" style="height:40px;">
            <button class="layui-btn" style="float:right" id="tijiao">
              提交评论
            </button>
          </div>
        </div>
      </div>
      <div class="details_right">
        <div class="detail_r_t">
          <div class="information_title">
            <span style="font-size: 16px;line-height: 16px;font-weight: 700;white-space: nowrap;height:40px;">试题信息</span>
          </div>
          <div class="information_main">
            <div class="information_tags">
              <a href="javascript:void(0)" v-for="item in tagList" :key="item.value">{{item}}</a>
            </div>
            <div class="information_body">
              <div class="difficulty" style="line-height:2">
                <span>难度：</span>
                {{difficulty}}段
              </div>
              <div class="error_rate" style="line-height:2">
                <span>错误率：</span>
                {{errorNum}}/{{doNum}}
              </div>
              <div class="other" style="line-height:2">
                <span>{{commentNum}}条评论</span>
                <span>{{collectionNum}}个收藏</span>
              </div>
            </div>
          </div>
  
        </div>
      </div>
    </div>
    <el-dialog title="举报题目" :visible.sync="dialogReportVisible">
      <el-form>
        <el-form-item label="理由：" :label-width="120">
          <el-input type="textarea" v-model="reportcontent" placeholder="举报理由"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogReportVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogReportVisible = false">提 交</el-button>
      </div>
    </el-dialog>
  
  </div>
</template>

<script>
import Head from "../../component/head.vue";
import Comment from '../../component/comment.vue'
export default {
  mounted: function () {
    var layedit = layui.layedit;
    layedit.build('demo', {
      height: 180
    });
  },
  data() {
    return {
      q_id:100,
      index:0,
      question:{},
      ochoose:{
        q_content:{
          main:'',
          items:[],
          },
          q_answer:'',
          q_analysis:''
          },
      mchoose:{
        q_content:{
          main:'',
          items:[],
        },
        q_answer:'',
        q_analysis:''
      },
      judge:{
       q_content:'',
        q_answer:'',
        q_analysis:''
      },
      fill:{
        q_content:{
          main:'',
          blankNum:0,
        },
        q_answer:'',
        q_analysis:''
      },
      squestion:{
        q_content:'',
        q_answer:'',
        q_content:'',
      },
      code:{
         q_content:'',
         q_answer:'',
         q_analysis:'',
      },
      difficulty: 1,
      errorNum: 99,
      doNum: 100,
      tagList: [],
      detailType: 1,
      commentNum: 1,
      collectionNum: 11,
      commentList: [{
        userLink: '#',
        userImg: 'head.png',
        userName: '花朝节后馀寒冻风',
        commentContent: '答案是c',
        commentDate: '2017-05-07 00:18:44',
        zanNum: '99'
      },
      {
        userLink: '#',
        userImg: 'head.png',
        userName: '花朝节后馀寒冻风',
        commentContent: '答案是c',
        commentDate: '2017-05-07 00:18:44',
        zanNum: '99'
      }],
      dialogReportVisible: false,
      reportcontent: '',
      commentText: ''
    }

  },
  components: {
    'lo-head': Head,
    'one_comment': Comment,
  },
  mounted:function(){
      var url = require('url');
      var self = this;
      var query = url.parse(window.location.href,true).query;
      var q_id = parseInt(query.q_id);
      var h_id = parseInt(query.h_id);
      this.q_id = q_id;
      this.h_id = h_id;
      // let list = 
      // this.$http.get(this.domain + '/v1/examhistory/'+h_id).then((res)=>{
      //   res = res.data;
      //   if(res.success === 1){
      //     return res.data;
      //   }
      // })

       this.$http.get(this.domain+'/getquestionbyid?q_id='+q_id)//1获取用户信息
      .then((res)=>{
        res = res.data;
        console.log(res)
        self.analysis(res);
        self.difficulty = res.data.Question.q_difficulty;
        let taglist = res.data.Question.tag;
        for(let ite of taglist){
           self.tagList.push(ite.tag_name);
        }
        self.errorNum = res.data.Question.q_wrong;
        self.doNum = res.data.Question.q_right + res.data.Question.q_right;

      })
  },
  methods: {
    // star(){
    //   this.$http.post(this.domain + '/v1/quecollections',{q_id:this.q_id}).then((res)=>{
    //     res = res.data;
    //     if(res.success !== 1) return;
    //     console.log('star ok!');
    //   })
    // },
    collection: function () {
      this.$http.post(this.domain + '/v1/quecollections',{q_id:this.q_id}).then((res)=>{
        res = res.data;
        if(res.success !== 1) return;
        console.log('star ok!');
        document.getElementById('collectionBtn').innerHTML = '<i class="layui-icon" id="look" style="color:orangered">&#xe600;</i>已收藏';
      })
    },
    analysis(res){
      var que = res.data.Question;
      var self = this;

      //开始解析
      self.ochoose = {};
      self.mchoose = {};
      self.judge = {};
      self.fill = {};
      self.squestion = {};
      self.code = {};
          que.q_content = que.q_content.replace(/[\r\n]/g,'<br/>');
          self.detailType = que.q_type;
          console.log(self.detailType)
          if(que.q_type === 1 || que.q_type === 2){
            var tmp = que.q_content.split(/;;/g);
            que.q_content = {};
            que.q_content.main = tmp[0];
            que.q_content.items = tmp.slice(1);
            if(que.q_type === 2){
              que.q_answer = que.q_answer.split('&');
              self.mchoose = que
            }else if(que.q_type === 1){
              self.ochoose = que;
              console.log(que);
            }
            // console.log(que.q_content);
          }else if(que.q_type === 3){
            //判断题
            que.items =['A、T','B、F']
            self.judge = que
          }else if(que.q_type === 4){
            var origin = que.q_content;
            que.q_content = {};
            que.q_content.main = {};
            que.q_content.main = origin;//填空题内容
            que.q_content.blankNum = origin.match(/_{3}/g).length;//空格个数
            self.fill = que;
          }else if(que.q_type === 5){
            // 简答题
            self.squestion = que;
          }else if(que.q_type === 6){
            // 编程题 
            self.code = que;
          }

      // 解析结束
    },
  }
}
</script>

<style scoped>
.gray {
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(238,238,238);
  width: 100%;
  height: 100%;
  z-index: -1;
}
.textareaFoot {
  margin-top: 20px;
}

.detail_l_b {
  padding: 20px;
}

.related_body {
  padding: 20px;
}

.detail_r_b {
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  margin-bottom: 10px;
  background: #fff;
}

.related_title {
  padding: 15px 15px 0;
  line-height: normal;
  position: relative;
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  white-space: nowrap;
}

.other span {
  padding-right: 10px;
}

.information_tags a {
  border-radius: 12px;
  border: 1px solid #eaeaea;
  display: inline-block;
  padding: 2px 10px;
  color: #333;
  font-size: 12px;
  margin-right: 2px;
  background: #FFF;
  margin-bottom: 5px;
  line-height: 16px;
  position: relative;
}

.information_tags a:hover {
  border-color: #1abc9c;
  color: #25bb9b;
}

.information_main {
  padding: 15px;
  font-size: 14px;
  color: #999;
}

.details_all {
  background: #eee;
  height: auto;
  min-height: 100%;
}

.details_body {
  width: 960px;
  margin: 100px auto;
  background-color: white;
}

.details_left {
  float: left;
  width: 690px;
  margin: 0 10px 0 0;
}

.detail_l_t {
  margin-bottom: 20px;
  border: 1px solid #eee;
  border-radius: 3px;
  position: relative;
  background: white;
}

.detail_title {
  padding: 15px 20px 15px 20px;
  background: #FFF;
  line-height: 1.5;
  font-size: 16px;
  border-bottom: 1px solid #eee;
  border-radius: 3px;
}

.detail_body {
  background: #FFF;
  padding: 20px;
}

.detail_body_t {
  font-size: 14px;
  margin-bottom: 20px;
  line-height: 1.8;
}

.detail_body_c {
  background: #f4f4f4;
  border: 1px solid #eee;
  border-radius: 3px;
  padding: 15px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 700;
  color: #666;
}

.detail_body_c {
  margin-bottom: 20px;
  font-size: 14px;
}

.detail_body_b {
  height: 30px;
}

.detail_body_b ul {
  float: right;
  font-size: 14px;
  margin-top: 10px;
}

.detail_body_b ul li {
  float: left;
  position: relative;
  cursor: pointer;
}

.detail_body_b ul li:hover {
  color: orangered;
}

.detail_body_b ul li+li {
  border-left: 1px solid #e2e1e1;
  margin-left: 6px;
  padding-left: 6px;
}

.detail_air {
  overflow: hidden;
  margin-bottom: 10px;
  border-top: 1px dashed #d4d4d4;
  padding: 20px;
}

.detail_l_c {
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  margin-bottom: 10px;
  background: #fff;
}

.comment_title {
  padding: 15px 15px 0;
  line-height: normal;
  position: relative;
  height: 40px;
}

.comment_body {
  padding: 20px;
}

.detail_l_b {
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  margin-bottom: 10px;
  background: #fff;
}

.details_right {
  width: 260px;
  float: left;
}

.detail_r_t {
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  margin-bottom: 10px;
  background: #fff;
}

.information_title {
  padding: 15px 15px 0;
  line-height: normal;
  position: relative;
}
</style>


