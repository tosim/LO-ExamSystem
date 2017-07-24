<template>
  <div class="exam-all">
    <lo-head></lo-head>
    <div class="exam-body">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <div class="exam-title">{{profession+"职业考试"}}</div>
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
          一、单选题（每题{{singleFraction}}分，共{{singleFraction*singleNum}}分）
        </div>
        <single-topic v-for="(item,index) in ochoose" :examindex="index+1" :titleContent="item.q_content.main" :singleoptions="item.q_content.items" :key="item.q_id"></single-topic>
      </div>
      <div v-if="multipleNum" class="topicall">
        <div class="topictitle">
          <span>{{mchooseid}}</span>多选题（每题{{multipleFraction}}分，共{{multipleFraction*multipleNum}}分）
        </div>
        <multiple-choice></multiple-choice>
      </div>
      <div v-if="fillinNum" class="topicall">
        <div class="topictitle">
          <span>{{fillid}}</span>填空题（每题{{fillinFraction}}分，共{{fillinFraction*fillinNum}}分）
        </div>
        <fillin-topic></fillin-topic>
      </div>
      <div v-if="judgmentNum" class="topicall">
        <div class="topictitle">
         <span>{{judgeid}}</span> 判断题（每题{{judgmentFraction}}分，共{{judgmentFraction*judgmentNum}}分）
        </div>
        <judgment-topic></judgment-topic>
      </div>
      <div v-if="shortNum" class="topicall">
        <div class="topictitle">
          <span>{{squestionid}}</span>简答题（每题{{shortFraction}}分，共{{shortFraction*shortNum}}分）
        </div>
        <short-answer></short-answer>
      </div>
      <div v-if="programNum" class="topicall">
        <div class="topictitle">
          <span>{{codeid}}</span>编程题（每题{{programFraction}}分，共{{programFraction*programNum}}分）
        </div>
        <program-topic></program-topic>
      </div>
      <div>
        <button class="layui-btn layui-btn-big layui-btn-normal" style="position:relative;left:50%;margin-left:-41px;border-radius:5px;margin-bottom:20px;">提交</button>
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
  background-image: url("../../asset/images/background.png");
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
      codeid:null
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
    var self = this;
    this.$http.get(this.domain+'/v1/sessions')//1获取用户信息
      .then((res)=>{
        res = res.data;
        if(res.success === 1){
          window.user = res.data;
        }else{
          console.log('not login');
          window.location.href = '/public/login.html';
        }
        console.log(window.user);
        return window.user;
      })
      .then(function(user){//2.获取试卷分布
        self.$http.get(self.domain+'/v1/testpapers?p_id='+window.user.p_id).then((res)=>{
          res = res.data;
          console.log(res.data);
          if(res.success === 1){
            self.singleFraction = res.data.t_ochoose_score;
            self.singleNum = res.data.t_ochoose_num;
            self.multipleFraction = res.data.t_mchoose_score;
            self.multipleNum = res.data.t_mchoose_num;
            self.fillinFraction = res.data.t_fill_score;
            self.fillinNum = res.data.t_fill_num;
            self.judgmentFraction = res.data.t_judge_score;
            self.judgmentNum = res.data.t_judge_num;
            self.shortFraction = res.data.t_squestion_score;
            self.shortNum = res.data.t_squestion_num;
            self.programFraction = res.data.t_code_score;
            self.programNum = res.data.t_code_num;
          }
        });
      })
      .then(function(){//3.获取试卷试题
          console.log(window.localStorage.examtime);
          if(window.localStorage.examtime){
            self.$http.get(self.domain + '/v1/questions?time='+window.localStorage.examtime).then(res => {
              res = res.data;
              // console.log(res);
              var queList = res.data.queList;
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
                    queList[i].q_content.main = {};
                    queList[i].q_content.main = origin;//填空题内容
                    queList[i].q_content.blankNum = origin.match(/_{3}/g);//空格个数
                    self.fill.push(queList[i]);
                  }else if(queList[i].q_type === 5){
                    // 简答题
                    self.squestion.push(queList[i]);
                  }else if(queList[i].q_type === 6){
                    // 编程题 
                    self.code.push(queList[i]);
                  }
              }
              console.log(queList);
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
            })
          }
      })
  },
}
</script>

