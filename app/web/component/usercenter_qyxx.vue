<template>
  <div>
    <div class="qyxx-all">
      <el-row>
        <el-col :span="12">
          <div class="qyxx-t-l" style="margin:0 auto;width:150px;height:200px;">
            <img src="../asset/images/logo.jpg" alt="head" style="width:200px;height:150px;">
            <span style="display:block;width:200px;text-align:center;font-size:24px;margin-top:20px;">{{com_name}}</span>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="user-introduction">
            <span class="user-left">企业简介：</span><br>
            <p class="user-show" v-show="!setting" style="text-indent:32px;line-height:1.8">{{com_introduction}}</p>
            <el-input type="textarea"  :autosize="{ minRows: 5, maxRows: 7}" placeholder="请输入企业简介" v-show="setting" v-model="com_introduction">
            </el-input>
          </div>
        </el-col>
      </el-row>
      <div class="qyxx-title">
        <span>基本信息</span>
        <button class="layui-btn setting-btn layui-btn-normal" @click="saveset" v-if="save_user">保存</button>
        <button class="layui-btn setting-btn" @click="userset" v-if="!save_user">编辑</button>
      </div>
      <div class="qyxx-body">
        <div class="user-name">
          <span class="user-left">企业名称：</span>
          <span class="user-show" v-show="!setting">{{com_name}}</span>
          <input type="text" v-show="setting" v-model="com_name">
        </div>
        <div class="user-email">
          <span class="user-left">企业邮箱：</span>
          <span class="user-show" v-show="!setting">{{com_email}}</span>
          <input type="text" v-show="setting" v-model="com_email">
        </div>
        <div class="user-address">
          <span class="user-left">企业地址：</span>
          <span class="user-show" v-show="!setting">{{com_address}}</span>
          <input type="text" v-show="setting" v-model="com_address">
        </div>
        <div class="user-tel">
          <span class="user-left">企业电话：</span>
          <span class="user-show" v-show="!setting">{{com_tel}}</span>
          <input type="text" v-show="setting" v-model="com_tel">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    saveset: function () {
      this.save_user = false;
      this.setting = false;
    },
    userset: function () {
      this.save_user = true;
      this.setting = true;
    },
  },
  data() {
    return {
      save_user: false,
      com_name: "蓝鸥科技教育公司",
      com_email: "819473021@qq.com",
      com_address: '北京市昌平区定泗路立业路8号兆科大厦',
      com_tel: '400-626-3386',
      com_introduction: '蓝鸥科技有限公司是一家集产、学、研、创为一体的综合性移动互联网研发培训机构，致力于iOS 开发、VR/AR/游戏开发、Android开发、HTML5全栈开发、Web安全攻防、PHP全栈、JavaEE、大数据、VD视觉设计、新媒体运营、产品经理等技术人才的培养。蓝鸥科技是苹果公司AATC认证官方授权培训中心、Unity官方授权培训中心，也是目前国内”两大官方授权于一身”的移动互联网培训企业。',
      setting: false
    }
  }
}
</script>


<style scoped>
.user-introduction {
  margin-top: 50px;
}

.user-show {
  color: rgb(153, 153, 153);
}

.qyxx-all {
  width: 90%;
  margin: 0 auto;
}

.qyxx-title {
  line-height: 35px;
  width: 90%;
  margin: 50px auto 0 auto;
  padding: 10px 5px;
  border-bottom: 1px solid rgb(212, 212, 212);
}

.qyxx-body {
  font-size: 15px;
  width: 90%;
  margin: 0 auto;
  padding: 10px;
}

.qyxx-body input {
  border: 1px solid #d4d4d4;
  color: #34495e;
  font-family: Lato, sans-serif;
  font-size: 14px;
  padding: 8px 5px 7px;
  width: 248px;
  height: 22px;
  border-radius: 3px;
  outline: 0;
}

.user-left {
  display: inline-block;
  width: 100px;
  line-height: 30px;
}

.qyxx-body div {
  line-height: 50px;
}

.qyxx-title span {
  font-family: "微软雅黑Light";
  font-size: 18px;
}
.qyxx-title span::before {
  background: #FF6547;
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 5px;
  margin-bottom: 2px;
  vertical-align: middle;
  border-radius: 4px;
}
.setting-btn {
  border-radius: 5px;
  padding-left: 30px;
  padding-right: 30px;
  float: right;
}
</style>

