<template>
  <div class="one-fillin">
    <div class="topic-title" v-html="examindex+'.'+titleContent">
      <!--{{examindex+"、"+titleContent}}-->
    </div>
    <div class="topic-content">
      <div v-for="(item,index) in airNum" :key="item.value">
        第{{index+1}}空：
        <el-input placeholder="请输入内容" style="margin-top:10px;width:80%" @blur="changeAnswer" v-model="answers[index]"></el-input>
      </div>
    </div>
  </div>
</template>

<style scoped>
.one-fillin {
  border: 2px solid white;
  padding: 4px;
  clear: both;
  margin: 2px auto 25px;
  width: 96%;
  height: auto;
}

.topic-title {
  padding-top: 2px;
  font-size: 16px;
  color: #444444;
  font-weight: bold;
  height: auto;
  line-height: 20px;
  margin-bottom: 8px;
  padding-bottom: 2px;
  border-bottom: 1px solid #EFEFEF;
}
</style>


<script>
export default {
  props: ["examindex","titleContent","airNum","qid"],
  data() {
    return {
      answers:[],
    }
  },
  mounted:function(){
    // console.log('airNum = ' + this.airNum);
    this.answers = new Array(this.airNum);
    for(let i = 0;i < this.answers.length;i++){
      this.answers[i] = '';
    }

    var tmp = {
      q_id:this.qid,
      q_type:1,
      q_content:this.titleContent,
      answer:''
    }
    this.$emit("changeAnswer",tmp);
  },
  methods: {
    changeAnswer(){
      // console.log(answer);
      var tmp = {
        q_id:this.qid,
        q_type:4,
        q_content:this.titleContent,
        answers:''
      }
      // console.log(this.answers.join('|'));
      tmp.answers = this.answers;
      this.$emit("changeAnswer",tmp);
    }
  },
  created() {
    // this.airNum = (this.titleContent.split('___')).length - 1;
  }
}
</script>

