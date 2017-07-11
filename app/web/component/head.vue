<template>
  <ul class="layui-nav" lay-filter="">
    <li>
      <img src="../asset/images/logo.jpg" alt="alt" id="logo">
    </li>
    <el-dropdown style="float:right;margin-top:-45px;cursor:pointer;">
      <span class="el-dropdown-link" id="user-head">
        <img src="../asset/images/head.png" alt="head">
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </ul>
</template>

<style scoped>
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



