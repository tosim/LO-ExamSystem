<template>
  <div>
    <lo-head></lo-head>
    <div class="content">
      <el-row class="title" type="flex" justify="center">
        <el-col :span="12">
          蓝鸥IT考评系统
        </el-col>
      </el-row>
      <div class="bottom">
        <el-row type="flex" align="middle">
          <el-col :span="8">
            <button style="float:left" class="layui-btn layui-btn-big layui-btn-radius layui-btn-normal">开始考试</button>
          </el-col>
          <el-col :span="8">
            <img src="../../asset/images/admin.png" alt="admin" style="margin-left:30px;">
          </el-col>
          <el-col :span="8">
            <button style="float:right" class="layui-btn layui-btn-big layui-btn-radius">专项训练</button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div id="begin"></div>
  </div>
</template>

<script>
import head from 'component/head'
export default {
  methods: {

  },
  components: {
    'lo-head': head
  }
}
</script>


<style>
body {
  background-image: url("../../asset/images/background.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #464646;
}

.content {
  width: 500px;
  min-width: 500px;
  margin: 0 auto;
  margin-top: 13%;
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

