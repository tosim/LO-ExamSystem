<template>
  <div>
    <div class="jbxx-all">
      <el-row>
        <el-col :span="12">
          <div class="jbxx-t-l" style="margin:0 auto;width:150px;height:200px;">
            <img src="../asset/images/head.png" alt="head" style="width:150px;height:150px;border-radius:75px;">
            <span style="display:block;width:150px;text-align:center;font-size:16px;margin-top:20px;">{{user.u_name}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="jbxx-t-r" style="margin:0 auto;float:left;height:200px;">
            <div style="line-height:150px;font-size:24px;text-align:center;">{{user.p_name}}
              <span style="color:red;font-style:italic">{{user.u_level}}</span>段</div>
            <div class="layui-progress layui-progress-big" lay-filter="demo">
              <div class="layui-progress-bar layui-bg-red"></div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="jbxx-title">
        <span>基本信息</span>
        <button class="layui-btn setting-btn layui-btn-normal" @click="saveset" v-if="saveuser">保存</button>
        <button class="layui-btn setting-btn" @click="userset" v-if="!saveuser">编辑</button>
      </div>
      <div class="jbxx-body">
        <div class="user-name">
          <span class="user-left">用户名：</span>
          <span class="user-show" v-show="!setting">{{user.u_name}}</span>
          <input type="text" v-show="setting" v-model="user.u_name">
        </div>
        <div class="user-email">
          <span class="user-left">我的邮箱：</span>
          <span class="user-show" v-show="!setting">{{user.u_email}}</span>
          <input type="text" readonly="readonly" v-show="setting" v-model="user.u_email">
        </div>
        <div class="user-profession">
          <span class="user-left">目标职业：</span>
          <span class="user-show" v-show="!setting">{{user.p_name}}</span>
          <div v-show="setting">
            <el-select v-model="user.p_id" placeholder="请选择职业">
              <el-option v-for="item in professionList" :key="item.p_id" :label="item.p_name" :value="item.p_id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="user-likecompany">
          <span class="user-left">感兴趣公司：</span>
          <span v-for="item in user.enterprise" :key="item" class="user-show" v-show="!setting">{{item.e_name}}&nbsp&nbsp&nbsp</span>
          <div v-show="setting" class="companyList">
            <a href="javascript:void(0)" v-for="(item,index) in companyList" :key="item.e_id" @click="selectCompany(item)" v-bind:class="[item.isSelect!=null&&item.isSelect==true ? 'oneCompany_select' : 'oneCompany']">{{item.e_name}}</a>
          </div>
        </div>
      </div>
      <div class="user-introduction">
        <div class="jbxx-title">
          <span>我的履历</span>
          <button class="layui-btn setting-btn" @click="showDialogResume()">新建履历</button>
        </div>
        <div class="introduction-body">
          <el-table :data="others" border style="width: 100%">
            <el-table-column prop="o_time" label="日期" sortable width="120">
  
            </el-table-column>
            <el-table-column prop="o_title" label="标题" width="180">
            </el-table-column>
            <el-table-column prop="o_href" label="网址" width="220">
            </el-table-column>
            <el-table-column prop="o_remark" label="说明" min-width="300">
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template scope="scope">
                <el-button size="small" @click="resumeEdit(scope.$index, scope.row,resume)">编辑</el-button>
                <el-button size="small" type="danger" @click="resumeDelete(scope.$index,others)">删除</el-button>
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
            <el-date-picker v-model="resume.o_time" type="date" placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="标题：" :label-width="formLabelWidth">
          <el-input v-model="resume.o_title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="成果网址：" :label-width="formLabelWidth">
          <el-input v-model="resume.o_href" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="说明：" :label-width="formLabelWidth">
          <el-input v-model="resume.o_remark" auto-complete="off"></el-input>
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
  // props:['user'],
  data() {
    return {
      user:{
        u_id:191,
        u_name:'tmp',
        u_level:12,
        p_name:'asdasd',
        u_email:'982981@qq.com',
        enterprise:{
          e_id:31,
          e_name:'asdasd'
        }
      },
      isSelect: false,
      saveuser: false,
      resume: {
        o_id:-1,
        o_time: '',
        o_title: '',
        o_href: '',
        o_remark: ''
      },
      companyList: null,
      professionList: null,
      formLabelWidth: '120px',
      u_name: "胡昊",
      u_email: "819473021@qq.com",
      p_name: "web前端开发工程师",
      e_name: ["阿里巴巴", "腾讯", "网易"],
      setting: false,
      rank: 1,
      dialogResume: false,
      others: [{
        o_time: '2017-07-07',
        o_title: '蓝鸥IT课程考评系统',
        o_href: 'https://github.com/tosim/LO-ExamSystem',
        o_remark: 'github项目'
      }, {
        o_time: '2017-07-07',
        o_title: '蓝鸥IT课程考评系统',
        o_href: 'https://github.com/tosim/LO-ExamSystem',
        o_remark: 'github项目'
      }, {
        o_time: '2017-07-07',
        o_title: '蓝鸥IT课程考评系统',
        o_href: 'https://github.com/tosim/LO-ExamSystem',
        o_remark: 'github项目'
      }, {
        o_time: '2017-07-07',
        o_title: '蓝鸥IT课程考评系统',
        o_href: 'https://github.com/tosim/LO-ExamSystem',
        o_remark: 'github项目'
      }]
    }
  },

  mounted: function () {
    var $ = layui.jquery
      , element = layui.element();
    element.progress('demo', this.rank * 10 / 0.9 + '%');
    console.log('first');
    console.log(this.user);
    // var self = this;
    this.$http.get(this.domain+'/v1/sessions')//1获取用户信息
      .then((res)=>{
        res = res.data;
        if(res.success === 1){
          this.user = res.data;
          console.log('asdadasd');
          console.log(res.data);
        }else{
          console.log('not login');
          // window.location.href = '/public/login.html';
        }
        // console.log(this.user);
      })
      .then(()=>{
          this.$http.get(this.domain + '/v1/enterprises').then((res)=>{
              res = res.data;
              if(res.success === 1){
                this.companyList = res.data; 
                console.log(this.companyList);
              }
          })
          this.$http.get(this.domain + '/v1/professions').then((res)=>{
              res = res.data;
              console.log(res.data);
              if(res.success === 1){
                this.professionList = res.data;
              }
          })
          this.$http.get(this.domain + '/v1/others?u_id='+this.user.u_id).then((res)=>{
              res = res.data;
              if(res.success === 1){
                this.others = res.data; 
                console.log(this.others);
              }else{
                this.others = [];
              }
          })
      })

  },
  methods: {
    showDialogResume:function(){
      this.dialogResume = true;
      this.resume = {
        o_id:-1,
        o_time:'',
        o_title:'',
        o_href:'',
        o_remark:''
      }
    },
    selectCompany: function (item) {
      // console.log(index);
      // console.log(this.companyList);
      // if (this.companyList[index].isSelect) {
      //   this.companyList[index].isSelect = false;
      // } else {
      //   this.companyList[index].isSelect = true;
      // }
      // console.log(this.companyList);
      if(item.isSelect == true){
        item.isSelect = false;
        for(let i = 0;i < this.user.enterprise.length;i++){
          if(this.user.enterprise[i].e_id === item.e_id){
            this.user.enterprise.splice(i,1);
          }
        }
      }else{
        item.isSelect = true;
        this.user.enterprise.push(item);
      }
      
    },
    saveset: function () {
      this.saveuser = false;
      this.setting = false;
      // console.log(this.companyList);
      // console.log(this.user);
      this.$http.put(this.domain+'/v1/users',this.user).then((res)=>{
        console.log(res);
      })
    },
    addResume: function () {
      // this.resume.o_time = '2017-5-5';
      var time = new Date(this.resume.o_time);
      // console.log(time.getFullYear());
      this.resume.o_time = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate();
      console.log('resume:');
      console.log(this.resume);
      if(this.resume.o_id == -1){
        this.resume.u_id = this.user.u_id;
        this.$http.post(this.domain+'/v1/others',this.resume).then((res)=>{
          res = res.data;
          console.log(res);
          this.resume.o_id = res.data;
          this.others.push(this.resume);
        });
      }else{
        this.$http.put(this.domain+'/v1/others',this.resume).then((res)=>{
          res = res.data;
          console.log(res);
          this.others[this.resume.index] = res.data;
        });
      }

      // console.log(this.others);
      this.dialogResume = false;
      
    },
    userset: function () {
      this.saveuser = true;
      this.setting = true;
      // this.$http.get(this.domain + '/v1/enterprises').then((res)=>{
      //     res = res.data;
      //     if(res.success === 1){
      //       this.companyList = res.data;
            for(let i = 0;i < this.companyList.length;i++){
            // this.companyList[i].isSelect
              for(let j = 0;j < this.user.enterprise.length;j++){
                if(this.companyList[i].e_id === this.user.enterprise[j].e_id){
                  this.companyList[i].isSelect = true;
                  break;
                }else{
                  this.companyList[i].isSelect = false;
                }
              }
            }
            
      //       console.log(this.companyList);
      //     }
      // })
      
    },
    resumeEdit(index, row, resume) {
      console.log(index);
      console.log(row.date);
      resume.o_time = row.o_time;
      resume.o_title = row.o_title;
      resume.o_href = row.o_href;
      resume.o_remark = row.o_remark;
      resume.o_id = this.others[index].o_id;
      resume.u_id = this.user.u_id;
      resume.index = index;
      this.dialogResume = true;
    },
    resumeDelete(index, others) {
      this.$http.delete(this.domain + '/v1/others/'+others[index].o_id).then((res)=>{
        res = res.data;
        console.log(res);
      });
      others.splice(index, 1);
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

