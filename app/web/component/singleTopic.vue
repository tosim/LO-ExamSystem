<template>
  <div class="one-single">
    <div class="topic-title" v-html="examindex+'.'+titleContent">
      <!--{{examindex+"、"+titleContent}}-->
    </div>
    <div class="topic-content">
      <el-radio-group v-model="chooseanswer" @change="changeAnswer">
        <el-radio  v-for="(singleoption,index) in singleoptions" :key="index" :label="singleoption" :value="index" ></el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<style scoped>
.one-single {
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
}

.topic-content {
  clear: both;
  padding-top: 5px;
  padding-left: 24px;
  padding-bottom: 2px;
  border-bottom: 1px solid #EFEFEF;
  color: #333333;
}

.el-radio-group {
  width: 90%;
}

.el-radio__label {
  font-size: 16px;
}

.el-radio {
  width: 100%;
  line-height: 30px;
  margin-bottom: 2px;
}

.el-radio:hover {
  background: rgb(239, 239, 239);
}

.el-radio+.el-radio {
  margin-left: 0;
}
</style>


<script>
export default {
  props: ["examindex","titleContent","singleoptions","qid","hisAnswer"],
  data() {
    return {
      chooseanswer: ''
    }
  },
  mounted:function(){
    // console.log(this.hisAnswer);
    var tmp = {
      q_id:this.qid,
      q_type:1,
      q_content:this.titleContent,
      answer:-1
    }
    this.$emit("changeAnswer",tmp);
  },
  methods: {
    // changeAnswer(answer){
    //   // console.log();
    //   console.log('aaaa');
    //   this.$emit("ochooseAnswer",answer);
    // }
    changeAnswer:function(answer){
      // console.log(this.chooseanswer);
      // console.log(this.singleoptions.indexOf(this.chooseanswer));

      for(let i = 0;i < this.singleoptions.length;i++){
        if(this.singleoptions[i]===answer){
          answer = i;
          break
        }
      }
      var tmp = {
        q_id:this.qid,
        q_type:1,
        q_content:this.titleContent,
        answer:answer
      }
      this.$emit("changeAnswer",tmp);
    }
  }
}
</script>

