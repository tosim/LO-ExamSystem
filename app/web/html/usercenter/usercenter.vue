<template>
  <div id="usercenter-all" style="height:100%">
    <lo-head></lo-head>
    <el-row style="height:91%;position:fixed;top:60px;width:100%">
      <el-col style="background:rgb(238,241,246);height:100%;width:12%;float:left">
        <el-menu default-active="1">
          <el-menu-item index="1" @click="jbxx">
            <i class="layui-icon" style="margin-right:10px;">&#xe612;</i>基本信息</el-menu-item>
          <el-menu-item index="2" @click="nlfx">
            <i class="layui-icon" style="margin-right:10px;">&#xe629;</i>能力分析</el-menu-item>
          <el-menu-item index="3" @click="ctb">
            <i class="layui-icon" style="margin-right:10px;">&#xe63c;</i>错题本</el-menu-item>
          <el-menu-item index="4" @click="scj">
            <i class="layui-icon" style="margin-right:10px;">&#xe624;</i>收藏夹</el-menu-item>
          <el-menu-item index="5" @click="ksjl">
            <i class="layui-icon" style="margin-right:10px;">&#xe62d;</i>考试记录</el-menu-item>
        </el-menu>
      </el-col>
      <el-col style="float:left;width:80%;overflow:auto;height:100%;">
        <jbxx v-show="jbxx_show"></jbxx>
        <nlfx v-show="nlfx_show"></nlfx>
        <ctb v-show="ctb_show"></ctb>
        <scj v-show="scj_show"></scj>
        <ksjl v-show="ksjl_show"></ksjl>
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
import CTB from "component/usercenter_ctb.vue";
import SCJ from "component/usercenter_scj.vue";
import KSJL from "component/usercenter_ksjl.vue";
export default {
  data() {
    return {
      jbxx_show: true,
      nlfx_show: false,
      ctb_show: false,
      scj_show: false,
      ksjl_show: false
    }
  },
  components: {
    "lo-head": Head,
    "jbxx": JBXX,
    "nlfx": NLFX,
    "ctb": CTB,
    "scj": SCJ,
    "ksjl": KSJL
  },
  methods: {
    jbxx: function () {
      this.nlfx_show = false;
      this.ctb_show = false;
      this.scj_show = false;
      this.ksjl_show = false;
      this.jbxx_show = true;
    },
    nlfx: function () {
      this.ctb_show = false;
      this.scj_show = false;
      this.ksjl_show = false;
      this.jbxx_show = false;
      this.nlfx_show = true;
    },
    ctb: function () {
      this.nlfx_show = false;
      this.scj_show = false;
      this.ksjl_show = false;
      this.jbxx_show = false;
      this.ctb_show = true;
    },
    scj: function () {
      this.nlfx_show = false;
      this.ctb_show = false;
      this.ksjl_show = false;
      this.jbxx_show = false;
      this.scj_show = true;
    },
    ksjl: function () {
      this.nlfx_show = false;
      this.ctb_show = false;
      this.scj_show = false;
      this.jbxx_show = false;
      this.ksjl_show = true;
    }
  },
  created() {
    let x = window.screen.height - 110;
    document.body.setAttribute("style", "height:" + x + "px");
  }
}
</script>
