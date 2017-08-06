<template>
  <div id="usercenter-all" style="height:100%">
    <lo-head ></lo-head>
    <el-row style="height:91%;position:fixed;top:60px;width:100%">
      <el-col style="background:rgb(238,241,246);height:100%;width:12%;float:left">
        <el-menu default-active="1">
          <el-menu-item index="1" @click="qyxx">
            <i class="layui-icon" style="margin-right:10px;">&#xe612;</i>企业信息</el-menu-item>
          <el-menu-item index="2" @click="fbxks">
            <i class="layui-icon" style="margin-right:10px;">&#xe629;</i>发布新考试</el-menu-item>
          <el-menu-item index="3" @click="bjks">
            <i class="layui-icon" style="margin-right:10px;">&#xe629;</i>编辑考试</el-menu-item>  
          <el-menu-item index="4" @click="lsfbks">
            <i class="layui-icon" style="margin-right:10px;">&#xe62d;</i>历史发布考试</el-menu-item>
        </el-menu>
      </el-col>
      <el-col style="float:left;width:80%;overflow:auto;height:100%;">
        <qyxx v-show="qyxx_show"></qyxx>
        <fbxks v-show="fbxks_show" @bjks="bjks" v-on:sendMsg="receiveMsg"></fbxks>
        <bjks v-on:showbjksEdit="bjks_edit" v-if="bjks_show" ></bjks>
        <lsfbks v-show="lsfbks_show"></lsfbks>
        <bjks-edit v-show="bjks_edit_show" :examId="examId"></bjks-edit>
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
import QYXX from "component/usercenter_qyxx.vue";
import FBXKS from "component/usercenter_fbxks.vue";
import BJKS from "component/usercenter_bjks.vue";
import LSFBKS from "component/usercenter_lsfbks.vue";
import BJKS_EDIT from "component/usercenter_bjks_edit.vue";
export default {
  data() {
    return {
      examId:-1,
      qyxx_show: true,
      fbxks_show: false,
      bjks_show:false,
      lsfbks_show: false,
      bjks_edit_show:false
    }
  },
  components: {
    "lo-head": Head,
    "qyxx": QYXX,
    "fbxks": FBXKS,
    "bjks":BJKS,
    "lsfbks": LSFBKS,
    "bjks-edit":BJKS_EDIT
  },
  methods: {
    bjks_edit:function(exam_id){
      console.log(exam_id);
      this.examId = exam_id;
      this.fbxks_show = false;
      this.lsfbks_show = false;
      this.qyxx_show = false;
      this.bjks_show = false;
      this.bjks_edit_show = true;
    },
    qyxx: function () {
      this.fbxks_show = false;
      this.lsfbks_show = false;
      this.qyxx_show = true;
      this.bjks_show = false;
      this.bjks_edit_show = false;
    },
    lsfbks: function () {
      this.fbxks_show = false;
      this.qyxx_show = false;
      this.lsfbks_show = true;
      this.bjks_show = false;
      this.bjks_edit_show = false;
    },
    fbxks: function () {
      this.qyxx_show = false;
      this.lsfbks_show = false;
      this.fbxks_show = true;
      this.bjks_show = false;
      this.bjks_edit_show = false;
    },
    bjks:function(){
      this.qyxx_show = false;
      this.lsfbks_show = false;
      this.fbxks_show = false;
      this.bjks_show = true;
      this.bjks_edit_show = false;
    },
    receiveMsg:function(data){
    console.log("收到子组件向父组件发送的数据")
    console.log(data)
    this.examId = data
  }
  },
  created() {
    let x = window.screen.height - 110;
    document.body.setAttribute("style", "height:" + x + "px");
  },
}
</script>