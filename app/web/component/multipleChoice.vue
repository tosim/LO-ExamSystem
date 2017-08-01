<template>
  <div class="one-multiple">
    <div class="topic-title" v-html="examindex+'.'+titleContent">
      <!--{{examindex+"、"+titleContent}}-->
    </div>
    <div class="topic-content">
      <el-checkbox-group v-model="answers" @change="changeAnswer">
        <el-checkbox name="checkanswer" v-for="(multipleoption,index) in multipleoptions" :key="index" :label="multipleoption" :value="index"></el-checkbox>
      </el-checkbox-group>
      <!-- <el-radio-group v-model="chooseanswer">
          <el-radio v-for="singleoption in singleoptions" :key="singleoption.value" :label="singleoption.label" :value="singleoption.value"></el-radio>
        </el-radio-group> -->
    </div>
  </div>
</template>

<style scoped>
.one-multiple {
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

.el-checkbox-group {
  width: 90%;
}

.el-checkbox__label {
  font-size: 16px;
}

.el-checkbox {
  width: 100%;
  line-height: 30px;
  margin-bottom: 2px;
}

.el-checkbox:hover {
  background: rgb(239, 239, 239);
}

.el-checkbox+.el-checkbox {
  margin-left: 0;
}
</style>


<script>
export default {
  props: ["examindex","titleContent","multipleoptions","qid"],
  data() {
    return {
      // multipleoptions:
      // [{
      //   value: 1,
      //   label: 'A、“3”'
      // }, {
      //   value: 2,
      //   label: "B、10"
      // }, {
      //   value: 3,
      //   label: "C、null"
      // }, {
      //   value: 4,
      //   label: "D、[1]"
      // }],
      answers:[]
    }
  },
  mounted:function(){
    var tmp = {
      q_id:this.qid,
      q_type:1,
      q_content:this.titleContent,
      answers:[]
    }
    this.$emit("changeAnswer",tmp);
  },
  methods: {
    changeAnswer:function(answers){
      console.log(answers);
      var tmp = {
        q_id:this.qid,
        q_type:2,
        q_content:this.titleContent,
        answers:[]
      }
      for(let j = 0;j < answers.length;j++){
        for(let i = 0;i < this.multipleoptions.length;i++){
          if(this.multipleoptions[i]===answers[j]){
            tmp.answers.push(i);
            break;
          }
        }
      }
      this.$emit("changeAnswer",tmp);
    }
  }
}
</script>

