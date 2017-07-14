<template>
  <div>
     <button @click="addTestPaper()">添加试卷类型</button>
     <button @click="addTag()"></button>
     <button @click="addTestPaper()"></button>


     <button @click="addQuestion()">添加试题</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  methods: {
    addTestPaper(){
      this.$http.get(this.domain + '/test/addTestPaper',{}).then((res)=>{

      });
    },
    addTag(){
      this.$http.get(this.domain + '/test/addTag',{}).then((res)=>{
        
      });
    },
    addTestPaper(){
      this.$http.get(this.domain + '/test/addTestPaper',{}).then((res)=>{
        
      });
    },
    addQuestion(){
      this.$http.post(this.domain + '/test/addTestPaper',{q_type:'1',q_content:'一下正确的是()'}).then((res)=>{
        
      });
    }
  }
}
</script>


<style>
</style>
