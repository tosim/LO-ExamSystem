<template>
  <div id="all">
    <div id="container">
      <div id="fracBox">
        <el-row>你的得分为：</el-row>
        <el-row class="fracBox-2">
          <font class="frac">97</font>分</el-row>
      </div>
      <div style="width:100%;height:250px;background-color:black;color:white;text-align:center;padding-top:50px;margin-bottom:12px;">这里是图表</div>
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
            <th>题目</th>
            <th>题目标签</th>
            <th>标准答案</th>
            <th>你的答案</th>
          </tr>
        </thead>
        <tbody>
           <tr v-for="ite in ExamQuesLst" :key="ite.q_content" v-bind:class="ite.q_answer === ite.u_answer?'':'red'">
            <td v-if="!whetherShowWrong">{{ite.q_content}}</td>
            <td v-if="!whetherShowWrong">
              <span v-for="i in ite.tag" :key="i.tag_id" style="padding-right:8px;">{{i.tag_name}}</span>
            </td>
            <td v-if="!whetherShowWrong">{{ite.q_answer}}</td>
            <td v-if="!whetherShowWrong">{{ite.u_answer}}</td>
          </tr> 
           <tr v-for="ite in ExamQuesLst" :key="ite.q_content" v-if="ite.q_answer !== ite.u_answer && whetherShowWrong" v-bind:class="ite.q_answer === ite.u_answer?'':'red'">
            <td>{{ite.q_content}}</td>
            <td>
              <span v-for="i in ite.tag" :key="i.tag_id" style="padding-right:8px;">{{i.tag_name}}</span>
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
      whetherShowWrong:false,
      Ques: {
        tag: '断言是非',
        ErPr: 97,
      },
      ExamQuesLst: [{
        q_content: '岁月不饶人是老子说的吗？',
        tag: [{
          tag_id: 2,
          tag_name: "css"
        }],
        q_answer: 'F',
        u_answer: 'T',
      },{
        q_content: '岁月不饶人是老子说的吗？',
        tag: [{
          tag_id: 2,
          tag_name: "css"
        }],
        q_answer: 'F',
        u_answer: 'F',
      }],
    }
  },
  components: {

  },
  methods: {

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
  margin-bottom:12px;
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

