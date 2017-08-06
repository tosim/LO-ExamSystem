<template>
  <ul class="layui-nav" lay-filter="" style="height:60px;">
    <li style="width:100px;float:left" position="position:relative;">
      <a href='/public/beforelogin.html'><img src="../asset/images/logo.jpg" alt="alt" id="logo" style="height:60px; width:80px;"></a>
    </li>
    <el-dropdown v-if="!hide" style="float:right;cursor:pointer;margin-top:10px;padding-bottom:5px;">
      <span class="el-dropdown-link" id="user-head">
        <img src="../asset/images/default.jpg" alt="head" style="margin-right:30px;">
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><a href="/public/usercenter.html">个人中心</a></el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div style="float:right;margin-right:60px;">

      <li class="layui-nav-item">
        <a href="/public/com_before.html">企业入口</a>
      </li>
      <li class="layui-nav-item">
        <a href="/public/com_exam.html">企业考试</a>
      </li>
      <li class="layui-nav-item">
        <a href="/public/ranking.html">排行榜</a>
      </li>
    </div>
  
    <img src="../asset/images/qiye1.png" alt="alt" id="logo" style="height:60px; width:80px;display:none">
    <img src="../asset/images/qiye2.jpg" alt="alt" id="logo" style="height:60px; width:80px;display:none">
    <img src="../asset/images/qiye3.png" alt="alt" id="logo" style="height:60px; width:80px;display:none">
    <img src="../asset/images/qiye4.jpg" alt="alt" id="logo" style="height:60px; width:80px;display:none">
    <img src="../asset/images/qiye5.jpg" alt="alt" id="logo" style="height:60px; width:80px;display:none">
    <img src="../asset/images/qiye6.png" alt="alt" id="logo" style="height:60px; width:80px;display:none">
    <img src="../asset/images/exam1.jpg" alt="alt" id="logo" style="height:60px; width:80px;display:none">
    <img src="../asset/images/exam2.jpg" alt="alt" id="logo" style="height:60px; width:80px;display:none">
    <img src="../asset/images/exam3.jpg" alt="alt" id="logo" style="height:60px; width:80px;display:none">
    <img src="../asset/images/exam4.jpg" alt="alt" id="logo" style="height:60px; width:80px;display:none">
    <img src="../asset/images/icon1.jpg" alt="alt" id="logo" style="height:60px; width:80px;display:none">
    <img src="../asset/images/icon2.jpg" alt="alt" id="logo" style="height:60px; width:80px;display:none">
    <img src="../asset/images/icon3.jpg" alt="alt" id="logo" style="height:60px; width:80px;display:none">
    <img src="../asset/images/icon4.jpg" alt="alt" id="logo" style="height:60px; width:80px;display:none">

  </ul>
</template>

<style scoped>
.layui-nav {
  width: 100%;
  position: fixed;
  top:0;
  z-index: 999;
}
#logo {
  width: 50px;
  height: 50px;
}

#user-head img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}
</style>


<script>
export default {
  props:['hide'],
  mounted:function(){
    
  }
}
</script>



