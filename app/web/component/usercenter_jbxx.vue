<template>
  <div>
    <div class="jbxx-all">
      <el-row>
        <el-col :span="12">
          <div class="jbxx-t-l" style="margin:0 auto;width:150px;height:200px;">
            <img src="../asset/images/head.png" alt="head" style="width:150px;height:150px;border-radius:75px;">
            <span style="display:block;width:150px;text-align:center;font-size:16px;margin-top:20px;">米厘米李红</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="jbxx-t-r" style="margin:0 auto;float:left;height:200px;">
            <div style="line-height:150px;font-size:24px;text-align:center;">Web前端开发工程师
              <span style="color:red;font-style:italic">{{rank}}</span>段</div>
            <div class="layui-progress layui-progress-big" lay-filter="demo">
              <div class="layui-progress-bar layui-bg-red"></div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="jbxx-title">
        <span>基本信息</span>
        <button class="layui-btn setting-btn layui-btn-normal" @click="saveset" v-if="save_user">保存</button>
        <button class="layui-btn setting-btn" @click="userset" v-if="!save_user">编辑</button>
      </div>
      <div class="jbxx-body">
        <div class="user-name">
          <span class="user-left">用户名：</span>
          <span class="user-show" v-show="!setting">{{u_name}}</span>
          <input type="text" v-show="setting" v-model="u_name">
        </div>
        <div class="user-email">
          <span class="user-left">我的邮箱：</span>
          <span class="user-show" v-show="!setting">{{u_email}}</span>
          <input type="text" v-show="setting" v-model="u_email">
        </div>
        <div class="user-profession">
          <span class="user-left">目标职业：</span>
          <span class="user-show" v-show="!setting">{{p_name}}</span>
          <div v-show="setting">
            <el-select v-model="p_name" placeholder="请选择职业">
              <el-option v-for="item in professionList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="user-likecompany">
          <span class="user-left">感兴趣公司：</span>
          <span v-for="item in e_name" :key="item.value" class="user-show" v-show="!setting">{{item}}&nbsp&nbsp&nbsp</span>
          <div v-show="setting" class="companyList">
            <a href="javascript:void(0)" v-for="item in companyList" :key="item.value" @click="selectCompany(item)" v-bind:class="[item.isSelect ? 'oneCompany_select' : 'oneCompany']">{{item.value}}</a>
          </div>
        </div>
      </div>
      <div class="user-introduction">
        <div class="jbxx-title">
          <span>我的履历</span>
          <button class="layui-btn setting-btn" @click="dialogResume = true">新建履历</button>
        </div>
        <div class="introduction-body">
          <el-table :data="introduction" border style="width: 100%">
            <el-table-column prop="date" label="日期" sortable width="120">
  
            </el-table-column>
            <el-table-column prop="name" label="标题" width="180">
            </el-table-column>
            <el-table-column prop="address" label="网址" width="220">
            </el-table-column>
            <el-table-column prop="description" label="说明" min-width="300">
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template scope="scope">
                <el-button size="small" @click="resumeEdit(scope.$index, scope.row,resume)">编辑</el-button>
                <el-button size="small" type="danger" @click="resumeDelete(scope.$index,introduction)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog title="新建履历" :visible.sync="dialogResume" :modal-append-to-body="false">
      <el-form :model="resume">
        <el-form-item label="履历日期：" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker v-model="resume.date" type="date" placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="标题：" :label-width="formLabelWidth">
          <el-input v-model="resume.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="成果网址：" :label-width="formLabelWidth">
          <el-input v-model="resume.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="说明：" :label-width="formLabelWidth">
          <el-input v-model="resume.description" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogResume = false">取 消</el-button>
        <el-button type="primary" @click="addResume">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  mounted: function () {
    var $ = layui.jquery
      , element = layui.element();
    element.progress('demo', this.rank * 10 / 0.9 + '%');
  },
  methods: {
    selectCompany: function (item) {
      if (item.isSelect) {
        item.isSelect = false;
      } else {
        item.isSelect = true;
      }

    },
    saveset: function () {
      this.save_user = false;
      this.setting = false;
    },
    addResume: function () {
      console.log(this.introduction);
      console.log(this.resume);
      this.introduction.push(this.resume);
      this.resume.date = '';
      this.resume.name = '';
      this.resume.address = '';
      this.resume.description = '';
      this.dialogResume = false;
    },
    userset: function () {
      this.save_user = true;
      this.setting = true;
    },
    resumeEdit(index, row, resume) {
      console.log(index);
      console.log(row.date);
      resume.date = row.date;
      resume.name = row.name;
      resume.address = row.address;
      resume.description = row.description;
      this.dialogResume = true;
    },
    resumeDelete(index, row) {
      row.splice(index, 1);
    }
  },
  data() {
    return {
      isSelect: false,
      save_user: false,
      resume: {
        date: '',
        name: '',
        address: '',
        description: ''
      },
      companyList: [{
        value: '阿里巴巴',
        isSelect: true,
      }, {
        value: '腾讯',
        isSelect: false,
      }, {
        value: '百度',
        isSelect: false,
      }, {
        value: '网易',
        isSelect: false,
      }, {
        value: 'Google',
        isSelect: false,
      }, {
        value: '微软',
        isSelect: false,
      }, {
        value: '华为',
        isSelect: false,
      }, {
        value: '小米',
        isSelect: false,
      }, {
        value: '京东',
        isSelect: false,
      }, {
        value: '其他',
        isSelect: false,
      }
      ],
      professionList: [{
        value: 'web前端开发工程师',
        label: 'web前端开发工程师'
      }, {
        value: 'Java工程师',
        label: 'Java工程师'
      }
      ],
      formLabelWidth: '120px',
      u_name: "胡昊",
      u_email: "819473021@qq.com",
      p_name: "web前端开发工程师",
      e_name: ["阿里巴巴", "腾讯", "网易"],
      setting: false,
      rank: 1,
      dialogResume: false,
      introduction: [{
        date: '2017-07-07',
        name: '蓝鸥IT课程考评系统',
        address: 'https://github.com/tosim/LO-ExamSystem',
        description: 'github项目'
      }, {
        date: '2017-07-07',
        name: '蓝鸥IT课程考评系统',
        address: 'https://github.com/tosim/LO-ExamSystem',
        description: 'github项目'
      }, {
        date: '2017-07-07',
        name: '蓝鸥IT课程考评系统',
        address: 'https://github.com/tosim/LO-ExamSystem',
        description: 'github项目'
      }, {
        date: '2017-07-07',
        name: '蓝鸥IT课程考评系统',
        address: 'https://github.com/tosim/LO-ExamSystem',
        description: 'github项目'
      }]
    }
  }
}
</script>


<style scoped>
.oneCompany {
  border-radius: 12px;
  border: 1px solid #eaeaea;
  display: inline-block;
  padding: 2px 10px;
  color: #333;
  font-size: 12px;
  margin-right: 2px;
  background: #FFF;
  margin-bottom: 5px;
  line-height: 16px;
  position: relative;
}

.oneCompany:hover {
  border-color: #1abc9c;
  color: #25bb9b;
}

.oneCompany_select {
  border-radius: 12px;
  border: 1px solid #1abc9c;
  display: inline-block;
  padding: 2px 10px;
  font-size: 12px;
  margin-right: 2px;
  margin-bottom: 5px;
  line-height: 16px;
  position: relative;
  background: #1abc9c;
  color: #FFF;
}

.companyList {
  color: #999;
  line-height: 2.8;
  width: 260px;
  border: 1px solid #d4d4d4;
  border-radius: 4px;
  padding: 10px;
}

.el-dialog {
  z-index: 3333 !important;
}

.el-table {
  margin-top: 30px;
}

.introduction-body {
  width: 90%;
  margin: 0 auto;
}

.user-show {
  color: rgb(153, 153, 153);
}

.jbxx-all {
  width: 90%;
  margin: 0 auto;
}

.jbxx-title {
  line-height: 35px;
  width: 90%;
  margin: 0 auto;
  padding: 10px 5px;
  border-bottom: 1px solid rgb(212, 212, 212);
}

.jbxx-body {
  font-size: 15px;
  width: 90%;
  margin: 0 auto;
  padding: 10px;
}

.jbxx-body input {
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

.jbxx-body div {
  line-height: 50px;
}

.jbxx-title span {
  font-family: "微软雅黑Light";
  font-size: 18px;
}

.setting-btn {
  border-radius: 5px;
  padding-left: 30px;
  padding-right: 30px;
  float: right;
}
</style>

