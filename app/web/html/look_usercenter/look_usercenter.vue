<template>
  <div id="usercenter-look" style="height:100%">
    <lo-head></lo-head>
    <el-row style="height:91%;position:fixed;top:60px;width:100%">
      <el-col style="background:rgb(238,241,246);height:100%;width:12%;float:left">
        <el-menu default-active="1">
          <el-menu-item index="1" @click="jbxx">
            <i class="layui-icon" style="margin-right:10px;">&#xe612;</i>基本信息</el-menu-item>
          <el-menu-item index="2" @click="nlfx">
            <i class="layui-icon" style="margin-right:10px;">&#xe629;</i>能力分析</el-menu-item>
        </el-menu>
      </el-col>
      <el-col style="float:left;width:80%;overflow:auto;height:100%;">
        <jbxx v-if="jbxx_show && flag" look=true :uid="u_id"></jbxx>
        <nlfx v-if="nlfx_show && flag" :uid="u_id"></nlfx>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.el-row::-webkit-scrollbar {
    display: none;
}
.el-col::-webkit-scrollbar {
    display: none;
}
</style>


<script>
import Head from "../../component/head.vue";
import JBXX from "component/usercenter_jbxx.vue";
import NLFX from "component/usercenter_nlfx.vue";
export default {
  data() {
    return {
      jbxx_show: true,
      nlfx_show: false,
      user:{},
      flag:false,
      u_id:12
    }
  },
  components: {
    "lo-head": Head,
    "jbxx": JBXX,
    "nlfx": NLFX,
  },
  methods: {
    jbxx: function () {
      this.nlfx_show = false;
      this.jbxx_show = true;
    },
    nlfx: function () {
      this.jbxx_show = false;
      this.nlfx_show = true;
    }
  },
  created() {
    let x = window.screen.height - 110;
    document.body.setAttribute("style", "height:" + x + "px");
  },
  mounted:function(){
    // this.$http.get(this.domain+'/v1/users')//1获取用户信息
    //   .then((res)=>{
    //     res = res.data;
    //     if(res.success === 1){
    //       this.user = res.data;
    //       this.flag = true;
    //       console.log('at usercenter');
    //       console.log(this.user);
    //     }else{
    //       console.log('not login');
    //       window.location.href = '/public/login.html';
    //     }
    //     // console.log(this.user);
    //   })
    var url = require('url');
    this.u_id = url.parse(window.location.href,true).query.u_id;
    this.flag = true;
    console.log('u_id = ' + this.u_id);
    
  }
}
</script>


