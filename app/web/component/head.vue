<template>
  <ul class="layui-nav" lay-filter="" style="height:60px;">
    <li style="width:100px;float:left" position="position:relative;">
      <img src="../asset/images/logo.jpg" alt="alt" id="logo" style="height:60px; width:80px;">
    </li>
    <el-dropdown style="float:right;cursor:pointer;margin-top:10px;padding-bottom:5px;">
      <span class="el-dropdown-link" id="user-head">
        <img src="../asset/images/head.png" alt="head" style="margin-right:30px;">
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div style="float:right;margin-right:60px;">
      <li class="layui-nav-item">
        <a href="">企业考试</a>
      </li>
      <li class="layui-nav-item">
        <a href="">职业排行榜</a>
      </li>
    </div>
  
    
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

}
</script>



