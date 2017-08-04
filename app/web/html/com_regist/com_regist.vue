<template>
  <div id="all">
    <div class="content">
      <el-row class="title" type="flex" justify="center" style="text-align:center">
        <el-col>
          蓝鸥IT考评系统<span style="color:purple">企业</span>注册
        </el-col>
      </el-row>
      <div class="bottom">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" :label-position='labelPosition'>
          <el-form-item label="帐号" prop='u_name'>
            <el-input v-model="ruleForm.u_name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop='u_pass'>
            <el-input v-model="ruleForm.u_pass" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop='re_pass'>
            <el-input v-model="ruleForm.re_pass" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item label="企业名称" prop='com_name'>
            <el-input v-model="ruleForm.com_name" placeholder="请输入公司名称"></el-input>
          </el-form-item>
          <el-form-item label="企业邮箱" prop='u_email'>
            <el-input v-model="ruleForm.u_email" placeholder="请输入企业邮箱"></el-input>
          </el-form-item>
          <el-form-item label="企业电话" prop='com_tel'>
            <el-input v-model="ruleForm.com_tel" placeholder="请输入企业电话"></el-input>
          </el-form-item>
          <el-form-item label="企业地址" prop='com_address'>
            <el-input v-model="ruleForm.com_address" placeholder="请输入企业地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()" id="submit">立即注册</el-button>
          </el-form-item>
        </el-form>
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
        com_name: '',
        com_tel: '',
        com_address: '',
        re_pass: '',
        u_email: '',
        u_pass: ''
      },
      rules: {
        u_name: [
          { required: true, message: '请输入帐号', trigger: 'blur' },
          { min: 1, max: 20, message: '长度不能超过 20 个字符', trigger: 'blur' }
        ],
        u_email: [
          { required: true, message: '请输入企业邮箱', trigger: 'blur' },
          { min: 1, max: 20, message: '长度不能超过 20 个字符', trigger: 'blur' }
        ],
        u_pass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        re_pass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' }
        ],
        com_name: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        com_tel: [
          { required: true, message: '请输入企业电话', trigger: 'blur' }
        ],
        com_address: [
          { required: true, message: '请输入企业地址', trigger: 'blur' }
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
          window.location.href = '/public/afterlogin.html';
        }else{
          console.log('注册失败');
        }
      });
    }
  },
  created() {
    let x = window.screen.height - 110;
    document.body.setAttribute("style", "height:"+x+"px");
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
