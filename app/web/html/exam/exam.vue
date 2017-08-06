<template>
  <div class="exam-all" :style="{background: 'url(/public/img/exam'+ exam_id%4 + '.jpg)'}">
    <lo-head></lo-head>
    <div class="exam-body">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <div class="exam-title">{{exam_title}}</div>
        </el-col>
      </el-row>
      <div class="exam-description">
        <p>注意：</p>
        <p>1、本次考试选择的时间为{{examtime}}；</p>
        <p>2、考试分为不同题型，请看清题型作答；</p>
        <p>3、在提交试卷或时间结束前离开该页面全部视为放弃本次考试，不会进行记录成绩。</p>
      </div>
      <div v-if="singleNum" class="topicall">
        <div class="topictitle">
          一、单选题<span v-if="scores.type==1">（每题{{singleFraction}}分，共{{singleFraction*singleNum}}分）</span>
        </div>
        <single-topic v-on:changeAnswer="changeAnswers" v-for="(item,index) in ochoose"  :qid="item.q_id" :examindex="index+1" :titleContent="item.q_content.main" :singleoptions="item.q_content.items" :key="item.q_id"></single-topic>
      </div>
      <div v-if="multipleNum" class="topicall">
        <div class="topictitle">
          <span>{{mchooseid}}</span>多选题<span v-if="scores.type==1">（每题{{multipleFraction}}分，共{{multipleFraction*multipleNum}}分）</span>
        </div>
        <multiple-choice v-on:changeAnswer="changeAnswers" v-for="(item,index) in mchoose" :qid="item.q_id" :examindex="index+1" :titleContent="item.q_content.main" :multipleoptions="item.q_content.items" :key="item.q_id"></multiple-choice>
      </div>
      <div v-if="judgmentNum" class="topicall">
        <div class="topictitle">
         <span>{{judgeid}}</span> 判断题<span v-if="scores.type==1">（每题{{judgmentFraction}}分，共{{judgmentFraction*judgmentNum}}分）</span>
        </div>
        <judgment-topic v-on:changeAnswer="changeAnswers" v-for="(item,index) in judge" :qid="item.q_id" :examindex="index+1" :titleContent="item.q_content" :key="item.q_id"></judgment-topic>
      </div>
      <div v-if="fillinNum" class="topicall">
        <div class="topictitle">
          <span>{{fillid}}</span>填空题<span v-if="scores.type==1">（每题{{fillinFraction}}分，共{{fillinFraction*fillinNum}}分）</span>
        </div>
        <fillin-topic v-on:changeAnswer="changeAnswers" v-for="(item,index) in fill" :qid="item.q_id" :examindex="index+1" :titleContent="item.q_content.main" :airNum="item.q_content.blankNum" :key="item.q_id"></fillin-topic>
      </div>
      <div v-if="shortNum" class="topicall">
        <div class="topictitle">
          <span>{{squestionid}}</span>简答题<span v-if="scores.type==1">（每题{{shortFraction}}分，共{{shortFraction*shortNum}}分）</span>
        </div>
        <short-answer v-on:changeAnswer="changeAnswers" v-for="(item,index) in squestion" :qid="item.q_id" :examindex="index+1" :titleContent="item.q_content" :key="item.q_id"></short-answer>
      </div>
      <div v-if="programNum" class="topicall">
        <div class="topictitle">
          <span>{{codeid}}</span>编程题<span v-if="scores.type==1">（每题{{programFraction}}分，共{{programFraction*programNum}}分）</span>
        </div>
        <program-topic v-on:changeAnswer="changeAnswers" v-for="(item,index) in code" :qid="item.q_id" :examindex="index+1" :titleContent="item.q_content" :key="item.q_id"></program-topic>
      </div>
      <div>
        <button @click="submit" class="layui-btn layui-btn-big layui-btn-normal" style="position:relative;left:50%;margin-left:-41px;border-radius:5px;margin-bottom:20px;">提交</button>
      </div>
      <div style="text-align:center;padding-top:20px;border-top:1px solid rgb(239,239,239);font-size:16px">
        蓝鸥&nbsp&nbsp提供技术支持
      </div>
      <div class="exam-endtime">
        <div class="endtime-title">
          剩余考试时间
        </div>
        <div class="endtime-body">
          {{endtime_h}}:{{endtime_m}}:{{endtime_s}}
        </div>
      </div>
    </div>
  </div>
</template>

<style scope>
.exam-endtime {
  border-radius: 5px;
  width: 120px;
  height: 70px;
  position: fixed;
  top: 300px;
  right: 50px;
  padding: 10px 10px;
  background: white;
}

.endtime-title {
  line-height: 34px;
  text-align: center;
  height: 34px;
  border-bottom: 1px solid rgb(219, 219, 219);
}

.endtime-body {
  height: 35px;
  line-height: 35px;
  text-align: center;
  font-size: 20px;
  color: red;
}

.exam-all {
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.exam-body {
  width: 920px;
  margin: 0 auto;
  padding: 100px 50px;
  background-color: white;
  border-bottom: 1px solid rgb(187, 187, 187);
}

.el-row {
  width: 920px;
}

.exam-title {
  margin-top: 20px;
  color: #19a8ee;
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  margin-bottom: 50px;
}

.exam-description {
  color: #555555;
  line-height: 24px;
  text-align: left;
  font-size: 16px;
  padding-bottom: 15px;
  border-bottom: 1px dashed #ccc;
  margin-left: 0;
  margin-top: 20px;
  margin-bottom: 40px;
}

.topictitle {
  padding: 2px 0;
  width: 97%;
  margin: 10px 0;
  line-height: 24px;
  font-size: 20px;
}
</style>


<script>
import Head from "../../component/head.vue";
import SingleTopic from "../../component/singleTopic.vue";
import MultipleChoice from "../../component/multipleChoice.vue";
import FillinTopic from "../../component/fillintopic.vue";
import JudgmentTopic from "../../component/judgmenttopic.vue";
import ShortAnswer from "../../component/shortanswertopic.vue";
import ProgramTopic from "../../component/programmingtopic.vue";
export default {
  components: {
    'lo-head': Head,
    'single-topic': SingleTopic,
    'multiple-choice': MultipleChoice,
    'fillin-topic': FillinTopic,
    'judgment-topic': JudgmentTopic,
    'short-answer': ShortAnswer,
    'program-topic': ProgramTopic
  },
  data() {
    return {
      exam_id:5,
      examType:1,
      exam_title:'',
      examTagId:-1,
      user:null,
      profession: "Web前端开发工程师",
      examtime: "30分钟",
      singleFraction: 5,
      singleNum: 5,
      multipleFraction: 5,
      multipleNum: 5,
      fillinFraction: 5,
      fillinNum: 5,
      judgmentFraction: 5,
      judgmentNum: 5,
      shortFraction: 5,
      shortNum: 5,
      programFraction: 5,
      programNum: 5,
      // endtime: '60',
      leftTime:3600000,
      endtime_h: "",
      endtime_m: "",
      endtime_s: "",
      chooseanswer: [],
      ochoose:[],
      mchoose:[],
      judge:[],
      fill:[],
      squestion:[],
      code:[],
      mchooseid:null,
      fillid:null,
      judgeid:null,
      squestionid:null,
      codeid:null,
      allAnswers:{},
      scores:{}
    }
  },
  "created": function () {
    // let _this = this;
    // let alls = this.endtime * 60;
    setInterval(() => {
      this.leftTime -= 1000;
      let alls = parseInt(this.leftTime / 1000);
      // console.log(alls);
      this.endtime_h = ('00' + parseInt(alls / 3600)).slice(-2);
      this.endtime_m = ('00' + parseInt((alls - 3600 * this.endtime_h) / 60)).slice(-2);
      this.endtime_s = ('00' + parseInt(alls - 3600 * this.endtime_h - 60 * this.endtime_m)).slice(-2);
    }, 1000);
  },
  mounted: function () {
    
    var self = this;
    this.$http.get(this.domain+'/v1/sessions')//1获取用户信息
      .then((res)=>{
        res = res.data;
        if(res.success === 1){
          this.user = res.data;
        }else{
          console.log('not login');
          window.location.href = '/public/login.html';
        }
        console.log(this.user);
        self.examType = parseInt(window.localStorage.examType);
        console.log('examType = ' + self.examType);
        if(self.examType === 1){
          self.exam_title = this.user.p_name + '职业考试';
        }else if(self.examType === 2){
          self.examTagId = window.localStorage.examTagId;
          // console.log('self.examTagId = ' + self.examTagId);
          self.exam_title = window.localStorage.examTagName + '专项训练';
        }else if(self.examType === 3){
          self.exam_title = window.localStorage.examTitle;
          console.log('title = ' + self.exam_title);
          self.exam_id = window.localStorage.examId;
        }
        return this.user;
      })
      .then(function(){//3.获取试卷试题
          console.log(window.localStorage.examtime);
          if(window.localStorage.examtime){
            console.log('has time');
            if(self.examType == 1){
              self.$http.get(self.domain + '/v1/questions?type=1&time='+window.localStorage.examtime).then(res => {
                res = res.data;
                console.log(res);
                self.analysis(res);          
              })
            }else if(self.examType == 2){
              console.log('adad' + self.examTagId);
              console.log(window.localStorage.examTagId);
              self.$http.get(self.domain + '/v1/questions?type=2&time='+window.localStorage.examtime+'&tag='+self.examTagId).then(res => {
                res = res.data;
                console.log(res);
                self.analysis(res);          
              })
            }else if(self.examType == 3){
              console.log('企业考试');
              self.$http.get(self.domain + '/v1/questions?type=3'+'&exam_id='+window.localStorage.examId).then(res => {
                res = res.data;
                console.log(res);
                self.analysis(res);          
              })
            }
          }
      })
  },
  methods:{
    analysis(res){
      function getId(t){
        switch(t){
          case 0: return '一、';
          case 1: return '二、';
          case 2: return '三、'
          case 3: return '四、';
          case 4: return '五';
          case 5: return '六、';
        }
      }
      var queList = res.data.queList;
      var self = this;
      self.leftTime = res.data.leftTime;
      // console.log(queList);

      //开始解析
      self.ochoose = [];
      self.mchoose = [];
      self.judge = [];
      self.fill = [];
      self.squestion = [];
      self.code = [];
      for(let i = 0;i < queList.length;i++){
          queList[i].q_content = queList[i].q_content.replace(/[\r\n]/g,'<br/>');
          if(queList[i].q_type === 1 || queList[i].q_type === 2){
            var tmp = queList[i].q_content.split(/;;/g);
            queList[i].q_content = {};
            queList[i].q_content.main = tmp[0];
            queList[i].q_content.items = tmp.slice(1);
            if(queList[i].q_type === 2){
              queList[i].q_answer = queList[i].q_answer.split('&');
              self.mchoose.push(queList[i]);
            }else if(queList[i].q_type === 1){
              self.ochoose.push(queList[i]);
              console.log(queList[i]);
            }
            // console.log(queList[i].q_content);
          }else if(queList[i].q_type === 3){
            //判断题
            self.judge.push(queList[i]);
          }else if(queList[i].q_type === 4){
            var origin = queList[i].q_content;
            queList[i].q_content = {};
            queList[i].q_content.main = {};
            queList[i].q_content.main = origin;//填空题内容
            queList[i].q_content.blankNum = origin.match(/_{3}/g).length;//空格个数
            self.fill.push(queList[i]);
          }else if(queList[i].q_type === 5){
            // 简答题
            self.squestion.push(queList[i]);
          }else if(queList[i].q_type === 6){
            // 编程题 
            self.code.push(queList[i]);
          }
      }
      self.singleNum = self.ochoose.length;
      self.multipleNum = self.mchoose.length;
      self.fillinNum = self.fill.length;
      self.judgmentNum = self.judge.length;
      self.shortNum = self.squestion.length;
      self.programNum = self.code.length;

      self.scores = res.data.scores;
      if(res.data.scores.type == 1){
        var tmp = res.data.scores.values;
        self.singleFraction = tmp[0];
        self.multipleFraction = tmp[1];
        self.judgmentFraction = tmp[2];
        self.fillinFraction = tmp[3];
        self.shortFraction = tmp[4];
        self.programFraction = tmp[5];
      }
      console.log(queList);
      console.log('解析结束');
      // 解析结束
      var cnt = 0;
      cnt += self.ochoose.length === 0 ? 0 : 1;
      self.mchooseid = getId(cnt);
      
      cnt += self.mchoose.length === 0 ? 0 : 1;
      self.judgeid = getId(cnt);
      
      cnt += self.judge.length === 0 ? 0 : 1;
      self.fillid = getId(cnt);
      
      cnt += self.fill.length === 0 ? 0 : 1;
      self.squestionid = getId(cnt);

      cnt += self.squestion.length === 0 ? 0 : 1;
      self.codeid = getId(cnt);
    },
    changeAnswers(data){
      if(this.scores.type == 2){
        data.score = this.scores.values[data.q_id];
      }else if(data.q_type==1){
        data.score = this.singleFraction;
      }else if(data.q_type==2){
        data.score = this.multipleFraction;
      }else if(data.q_type==3){
        data.score = this.judgmentFraction;
      }else if(data.q_type==4){
        data.score = this.fillinFraction;
      }else if(data.q_type==5){
        data.score = this.shortFraction;
      }else if(data.q_type==6){
        data.score = this.programFraction;
      }

      this.allAnswers[data.q_id] = data;
      // window.localStorage.hisAnswers = this.allAnswers;
      // console.log(this.allAnswers);
      // console.log(window.localStorage.hisAnswers);
    },
    submit(){
      // console.log(this.allAnswers);
      var title = window.localStorage.examTitle;
      console.log(this.examTagId);
      this.$http.post(this.domain + '/v1/judge',{title:title,u_id:this.user.u_id,allAnswers:this.allAnswers,tag:this.examTagId,exam_id:this.exam_id}).then((res)=>{
        res = res.data;
        if(res.success === 1){
          console.log(res);
        }else{
          console.log('fail');
        }
        // window.localStorage.setItem('examResult',JSON.stringify(res.data));
        // window.localStorage.examResult = JSON.stringify(res.data);
        window.location.href = '/public/afterExam.html?h_id='+res.data.h_id;
        // delete window.localStorage.hisAnswers;
      });
    }
  }
}
</script>

