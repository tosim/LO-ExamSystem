<template>
  <div id="all">
    <lo-head></lo-head>
    <div class="content">
      <el-row class="title" type="flex" justify="center">
        <el-col :span="12">
          蓝鸥IT考评系统用户注册
        </el-col>
      </el-row>
      <div class="bottom">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" :label-position='labelPosition'>
          <el-form-item label="用户名" prop='u_name'>
            <el-input v-model="ruleForm.u_name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop='u_pass'>
            <el-input v-model="ruleForm.u_pass" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop='re_pass'>
            <el-input v-model="ruleForm.re_pass" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop='u_email'>
            <el-input v-model="ruleForm.u_email" placeholder="请输入电子邮箱"></el-input>
          </el-form-item>
          <el-form-item label="选择职业" prop='p_id'>
            <el-select v-model="ruleForm.p_id" placeholder="请选择职业">
              <el-option label="Web前端开发工程师" value="1"></el-option>
              <el-option label="Java工程师" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()" id="submit">立即注册</el-button>
          </el-form-item>
        </el-form>
        <el-button type="success" @click="gotocom()" id="gotocom">企业注册通道</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'left',
      ruleForm: {
        u_name: '',
        re_pass: '',
        u_email: '',
        u_pass: '',
        p_id: ''
      },
      rules: {
        u_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 20, message: '长度不能超过 20 个字符', trigger: 'blur' }
        ],
        u_email: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          { min: 1, max: 20, message: '长度不能超过 20 个字符', trigger: 'blur' }
        ],
        u_pass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        re_pass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' }
        ],
        p_id: [
          { required: true, message: '请选择职业', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      console.dir(this.ruleForm);
      this.$http.post(this.domain+'/v1/users',this.ruleForm).then((res)=>{
        res = res.data;
        if(res.success === 1){
          console.log("注册成功，页面即将跳转");
          setTimeout(2000,function(){
            window.location.href = '/public/afterlogin.html';
          });
        }else{
          console.log('注册失败');
        }
      });
    },
    gotocom() {
      window.location.href = '/public/com_regist.html';
    }
  },
  created() {
    let x = window.screen.height - 110;
    document.body.setAttribute("style", "height:"+x+"px");
  }
}
</script>


<style scoped>
#gotocom {
  position: fixed;
  right: 100px;
  bottom: 100px;
}
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
