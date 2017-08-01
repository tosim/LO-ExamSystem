<template>
  <div class="one-judgment">
    <div class="topic-title" v-html="examindex+'.'+titleContent">
      <!--{{examindex+"、"+titleContent}}-->
    </div>
    <div class="topic-content">
      <el-radio-group v-model="chooseanswer" @change="changeAnswer">
        <el-radio v-for="singleoption in singleoptions" :key="singleoption.value" :label="singleoption.label" :value="singleoption.value"></el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<style scoped>
.one-judgment {
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
  props: ["examindex","titleContent","qid"],
  data() {
    return {
      singleoptions:
      [{
        value: 0,
        label: "A、对"
      }, {
        value: 1,
        label: "B、错"
      }],
      chooseanswer: ""
    }
  },
  mounted:function(){
    var tmp = {
      q_id:this.qid,
      q_type:1,
      q_content:this.titleContent,
      answer:-1
    }
    this.$emit("changeAnswer",tmp);
  },
  methods: {
    changeAnswer(answer){
      // console.log(answer);
      var tmp = {
        q_id:this.qid,
        q_type:3,
        q_content:this.titleContent,
        answer:-1
      }
      if(answer !== "A、对"){
        tmp.answer = 1;
      }else{
        tmp.answer = 0;
      }
      this.$emit("changeAnswer",tmp);
    }
  }
}
</script>

