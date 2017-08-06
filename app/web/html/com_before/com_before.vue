<template>
  <div id="all">
    <lo-head hide=true></lo-head>
    <div class="content">
      <el-row class="title" type="flex" justify="center">
        <el-col :span="12">
          蓝鸥IT考评系统
        </el-col>
      </el-row>
      <div class="bottom">
        <el-row type="flex" align="middle">
          <el-col :span="8">
            <button style="float:left" class="layui-btn layui-btn-big layui-btn-radius layui-btn-normal" @click="login">企业登录</button>
          </el-col>
          <el-col :span="8">
            <img src="../../asset/images/admin.png" alt="admin" style="margin-left:30px;">
          </el-col>
          <el-col :span="8">
            <button style="float:right" class="layui-btn layui-btn-big layui-btn-radius" @click="register">企业注册</button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>


<script>
import head from 'component/head'
export default {
  mounted:function(){
   
  },
  methods: {
    login: function() {
      // this.$router.push({name: 'Login'});
      window.location.href = "/public/com_login.html";
    },
    register: function() {
      // this.$router.push({name: 'Register'});
      window.location.href = "/public/com_regist.html";
    },
  },
  components: {
    'lo-head': head
  },
  created() {
    let x = window.screen.height - 110;
    document.body.setAttribute("style", "height:"+x+"px");
  }
}
</script>

<style scope>
#all {
  width: 100%;
  height: 99%;
  background-image: url("../../asset/images/background.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.content {
  width: 500px;
  min-width: 500px;
  margin: 0 auto;
  padding-top: 13%;
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

