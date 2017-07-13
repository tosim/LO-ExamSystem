<template>
  <div>
      <form>
          p_id<input v-model="ruleForm.p_id" type="text"><br>
          t_difficulty<input v-model="ruleForm.t_difficulty" type="text"><br>
          t_ochoose<input v-model="ruleForm.t_ochoose_num" type="text"><input v-model="ruleForm.t_ochoose_score" type="text"><br>
          t_mchoose<input v-model="ruleForm.t_mchoose_num" type="text"><input v-model="ruleForm.t_mchoose_score" type="text"><br>
          t_judeg<input v-model="ruleForm.t_judge_num" type="text"><input v-model="ruleForm.t_judge_score" type="text"><br>
          t_fill<input v-model="ruleForm.t_fill_num" type="text"><input v-model="ruleForm.t_fill_score" type="text"><br>
          t_squestion<input v-model="ruleForm.t_squestion_num" type="text"><input v-model="ruleForm.t_squestion_score" type="text"><br>
          <input v-model="ruleForm.t_code_num" type="text"><input v-model="ruleForm.t_code_score" type="text"><br>
          
          
          <button @click="submitForm()">提交题目</button>
      </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        p_id:'',
        t_difficulty:'',
        t_ochoose_num:'',
        t_ochoose_score:'',
        t_mchoose_num:'',
        t_mchoose_score:'',
        t_judge_num:'',
        t_judge_score:'',
        t_fill_num:'',
        t_fill_score:'',
        t_squestion_num:'',
        t_squestion_score:'',
        t_code_num:'',
        t_code_score:''
      }
    };
  },
  methods: {
    submitForm() {
      console.dir(this.ruleForm);
      this.$http.post(this.domain+'/v1/questions',this.ruleForm).then((res)=>{
        res = res.data;
        if(res.success === 1){
          // window.location.href = '/public/afterlogin.html';
          console.log('录入题目成功');
        }else{
          console.log('注册失败');
        }
      });
    }
  }
}
</script>


<style>
</style>
