<template>
  <div id="all">
    <lo-head></lo-head>
    <div id="All">
    <div id="container">
      <div id="fracBox">
        <el-row>你的得分为：</el-row>
        <el-row class="fracBox-2">
          <font class="frac">{{score}}</font>分</el-row>
      </div>
      <div id="charts" style="width:100%;height:250px;background-color:black;color:white;text-align:center;padding-top:50px;margin-bottom:12px;">这里是图表</div>
      <el-row>
        <fieldset class="layui-elem-field">
          <legend>
            <font color="#F7B824">Tips </font>
          </legend>
          <div class="layui-field-box">
            啊哈，看来你对“
            <font color="#FF5722">{{Ques.tag}}</font>”类型的题目并不是很精通嘛！错误率居然达到了 {{Ques.ErPr}}% !快去专项训练好好练一下吧~
          </div>
        </fieldset>
      </el-row>
      <el-row style="text-align:center;">
        <button class="layui-btn  layui-btn-small layui-btn-normal" type="primary" @click="whetherShowWrong=false">显示全部</button>
        <button class="layui-btn  layui-btn-small layui-btn-normal" type="primary" @click="whetherShowWrong=true">只看错题</button>
      </el-row>
      <table class="layui-table" lay-even lay-skin="nob">
        <colgroup>
          <col>
          <col width="150">
          <col width="150">
          <col width="150">
        </colgroup>
        <thead>
          <tr>
            <th>题目 <span style="font-size:12px;color:#999;">(点击题目可查看试题详情)</span></th>
            <th>题目标签</th>
            <th>标准答案</th>
            <th>你的答案</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ite in ExamQuesLst" :key="ite.q_content" v-bind:class="ite.isRight === 1 ? '' : 'red'">
            <td v-if="!whetherShowWrong"><a v-bind:href="'/public/details.html?q_id='+ite.q_id " v-bind:class="ite.isRight === 1 ? 'black' : 'red'">{{ite.q_content}}</a>
</td>
            <td v-if="!whetherShowWrong">
              {{ite.tags}}
            </td>
            <td v-if="!whetherShowWrong">{{ite.trueAnswer}}</td>
            <td v-if="!whetherShowWrong">{{ite.answer}}</td>
          </tr>
          <tr v-for="ite in ExamQuesLst" :key="ite.q_content" v-if="ite.isRight === 0 && whetherShowWrong" v-bind:class="ite.isRight ? '' : 'red'">
            <td>{{ite.q_content}}</td>
            <td>
              {{ite.tags}}
            </td>
            <td>{{ite.trueAnswer}}</td>
            <td>{{ite.answer}}</td>
          </tr>
  
        </tbody>
      </table>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted: function () {
    var url = require('url');
    // var examResult = JSON.parse(window.localStorage.examResult);
    var h_id = url.parse(window.location.href,true).query.h_id;
    // console.log(h_id);
    this.$http.get(this.domain + '/v1/examhistory/'+h_id).then((res)=>{
      res = res.data;
      if(res.success === 1){
        return res.data;
      }
    })
    .then((examResult)=>{
      console.log(examResult);
      this.score = examResult.score;
      // this.option.xAxis.data = [];
      // this.option.series.data = [];
      this.Ques.ErPr = 105;
      for(let tag in examResult.tagsRatio){
        console.log(tag);
        this.option.xAxis[0].data.push(tag);
        let ratio = examResult.tagsRatio[tag].right / (examResult.tagsRatio[tag].right + examResult.tagsRatio[tag].wrong)*100;
        this.option.series[0].data.push(ratio);
        if(ratio < this.Ques.ErPr){
          this.Ques.ErPr = ratio;
          this.Ques.tag = tag;
        }
      }
      this.Ques.ErPr = parseInt(100 - this.Ques.ErPr);
      // console.log(this.option.xAxis[0].data);
      // console.log(this.option.series[0].data);

      this.ExamQuesLst = examResult.quesList;
      // console.log(this.ExamQuesLst);

      for(let i in this.ExamQuesLst){
        // this.ExamQuesLst[i].q_content = this.ExamQuesLst[i].q_content.subString(0,15) + '...';
        // console.log(this.ExamQuesLst[i].q_content);
        if(this.ExamQuesLst[i].q_content.length > 20){
          this.ExamQuesLst[i].q_content = this.ExamQuesLst[i].q_content.substring(0,20) + '...';
        }else{
          this.ExamQuesLst[i].q_content = this.ExamQuesLst[i].q_content.substring(0,20) + '...';
        }

        if(this.ExamQuesLst[i].trueAnswer.length > 20){
          this.ExamQuesLst[i].trueAnswer = this.ExamQuesLst[i].trueAnswer.substring(0,20) + '...';
        }else{
          this.ExamQuesLst[i].trueAnswer = this.ExamQuesLst[i].trueAnswer.substring(0,20);
        }

        if(this.ExamQuesLst[i].answer.length > 20){
          this.ExamQuesLst[i].answer = this.ExamQuesLst[i].answer.substring(0,20) + '...';
        }else{
          this.ExamQuesLst[i].answer = this.ExamQuesLst[i].answer.substring(0,20);
        }
        
      }
      this.init();
    })
  },
  data() {
    return {
      score:0,
      whetherShowWrong: false,
      Ques: {
        tag: '断言是非',
        ErPr: 97,
      },
      ExamQuesLst: [{
        q_content: '岁月不饶人是老子说的吗？',
        tag: "css",
        trueAnswer: 'F',
        answer: 'T',
      }, {
        q_content: '岁月不饶人是老子说的吗？',
        tag:"css",
        trueAnswer: 'F',
        answer: 'F',
        isRight:1
      }],
      option: {
        title: {
          text: '考试解析图',
          subtext: '反应本次考试的做题情况'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['正确率']
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '正确率',
            type: 'bar',
            data: [],
          },
        ]
      }
    }
  },
  components: {
  },
  methods: {
    init() {
      var myChart = echarts.init(document.getElementById('charts'),'macarons');
      myChart.setOption(this.option);
    }
  }
}
</script>

<style scope>
#All {
  width: 80%;
  margin: 0 auto;
  margin-top:70px;
  font-size: 16px;
  padding-top: 25px;
  font-family: Microsoft YaHei;
}
.red {
  color: #FF5722
}
.black{
  color:#2F4056;
}
#container {
  width: 60%;
  margin: 0 auto;
}
.layui-field-box {
  padding: 15px 30px;
}
#fracBox {
  margin: 0 auto;
  width: 280px;
  margin-bottom: 12px;
}
.fracBox-2 {
  margin-top: 15px;
  text-align: center;
}
.frac {
  color: #FF5722;
  font-size: 55px;
}
</style>