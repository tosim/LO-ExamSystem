<template>
  <div id="all">
    <div id="container">
      <div id="fracBox">
        <el-row>你的得分为：</el-row>
        <el-row class="fracBox-2">
          <font class="frac">97</font>分</el-row>
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
          <tr v-for="ite in ExamQuesLst" :key="ite.q_content" v-bind:class="ite.q_answer === ite.u_answer?'':'red'">
            <td v-if="!whetherShowWrong"><a v-bind:href="'/details?'" v-bind:class="ite.q_answer === ite.u_answer?'':'red'">{{ite.q_content}}</a></td>
            <td v-if="!whetherShowWrong">
              {{ite.tag}}
            </td>
            <td v-if="!whetherShowWrong">{{ite.q_answer}}</td>
            <td v-if="!whetherShowWrong">{{ite.u_answer}}</td>
          </tr>
          <tr v-for="ite in ExamQuesLst" :key="ite.q_content" v-if="ite.q_answer !== ite.u_answer && whetherShowWrong" v-bind:class="ite.q_answer === ite.u_answer?'':'red'">
            <td>{{ite.q_content}}</td>
            <td>
              {{ite.tag}}
            </td>
            <td>{{ite.q_answer}}</td>
            <td>{{ite.u_answer}}</td>
          </tr>
  
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      whetherShowWrong: false,
      Ques: {
        tag: '断言是非',
        ErPr: 97,
      },
      ExamQuesLst: [{
        q_content: '岁月不饶人是老子说的吗？',
        tag: "css",
        q_answer: 'F',
        u_answer: 'T',
        id:4,
      }, {
        q_content: '岁月不饶人是老子说的吗？',
        tag:"css",
        q_answer: 'F',
        u_answer: 'F',
        id:4,
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
            data: ['html', 'css', 'javascript', 'react', 'vue']
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
            data: [2.0, 4.9, 7.0, 23.2, 25.6],
          },
        ]
      }
    }
  },
  components: {

  },
  mounted: function () {
    this.init();
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
#all {
  width: 80%;
  margin: 0 auto;
  font-size: 16px;
  padding-top: 25px;
  font-family: Microsoft YaHei;
}

.red {
  color: red
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

