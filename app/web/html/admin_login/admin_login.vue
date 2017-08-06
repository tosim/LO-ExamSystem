<template>
  <div id="all">
    <lo-head></lo-head>
    <div class="content">
      <el-row class="title" type="flex" justify="center" style="text-align:center">
        <el-col>
          蓝鸥IT考评系统管理员登录
        </el-col>
      </el-row>
      <div class="bottom">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" :label-position='labelPosition'>
          <el-form-item label="管理员密码" prop='u_pass'>
            <el-input type="password" v-model="ruleForm.u_pass" placeholder="请输入管理员密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()" id="submit">立即进入</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import head from 'component/head'
export default {
  data() {
    return {
      labelPosition: 'left',
      ruleForm: {
        u_email: '',
        u_pass: '',
        yzm: ''
      },
      components: {
        'lo-head': head
      },
      rules: {
        u_pass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      // this.$http.post(this.domain + '/v1/sessions',this.ruleForm).then((res)=>{
      //   res = res.data;
      //   if(res.success === 1){
      //     // window.user = res.data;
      //     window.localStorage.user = JSON.stringify(res.data);
      //     window.location.href = '/public/afterlogin.html';
      //     // console.log(res);
      //   }
      // });
      if(this.ruleForm.u_pass === '056210'){
        window.location.href = '/public/addNewQues.html';
      }
    }
  },
  created() {
    let x = window.screen.height - 110;
    document.body.setAttribute("style", "height:"+x+"px");
  },
  mounted:function(){
    // this.$http.get(this.domain + '/v1/sessions').then((res)=>{
    //   res = res.data;
    //   console.log(res);
    //   if(res.success === 1){
    //     // window.user = res.data;
    //     window.localStorage.user = JSON.stringify(res.data);
    //     window.location.href = '/public/afterlogin.html';
    //   }else{

    //   }
    // })
  }
}
</script>


<style scoped>
#submit {
  width: 100%;
}

.el-form-item {
  margin-bottom: 40px;
}

#all {
  font-size: 16px;
  font-family: Microsoft YaHei;
  width: 100%;
  height: 99%;
  background-image: url("../../asset/images/login.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.content {
  width: 500px;
  min-width: 500px;
  margin: 0 auto;
  padding-top: 8%;
}

.title {
  color: #01AAED;
  font-family: Microsoft YaHei;
  font-size: 36px;
  width: 500px;
  min-width: 500px;
}

.bottom {
  margin-top: 50px;
  width: 500px;
  min-width: 500px;
}
</style>

