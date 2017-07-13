<template>
  <div id="all">
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
            <button style="float:left" class="layui-btn layui-btn-big layui-btn-radius layui-btn-normal" @click="gotoexam = true">开始考试</button>
          </el-col>
          <el-col :span="8">
            <img src="../../asset/images/admin.png" alt="admin" style="margin-left:30px;">
          </el-col>
          <el-col :span="8">
            <button style="float:right" class="layui-btn layui-btn-big layui-btn-radius" @click="gotospecial = true">专项训练</button>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--  开始考试弹窗 -->
    <el-dialog title="随机抽题" :visible.sync="gotoexam" top="25%">
      <el-form :model="exam" label-width="80px">
        <el-form-item label="考试时间">
          <el-select v-model="examtime" placeholder="请选择考试时间">
            <el-option v-for="examtime in examtimes" :key="examtime.value" :label="examtime.label" :value="examtime.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试难度">
          <el-select v-model="exam.difficulty" placeholder="请选择考试难度">
            <el-option label="易" value="1"></el-option>
            <el-option label="中" value="2"></el-option>
            <el-option label="难" value="3"></el-option>
          </el-select>
        </el-form-item>
        <p id="prompt">系统根据您的职业为您智能组卷，祝您考试愉快！</p>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="gotoexam = false">取 消</el-button>
        <el-button type="primary" @click="startExam()">开始考试</el-button>
      </div>
    </el-dialog>
    <!--  专项训练弹窗 -->
    <el-dialog title="专项训练" :visible.sync="gotospecial" top="25%">
      <el-form :model="exam" label-width="80px">
        <el-form-item label="考试时间">
          <el-select v-model="specialtime" placeholder="请选择考试时间">
            <el-option v-for="specialtime in specialtimes" :key="specialtime.value" :label="specialtime.label" :value="specialtime.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择标签">
          <el-select v-model="speciallabel" placeholder="请选择考试标签">
            <el-option v-for="speciallabel in speciallabels" :key="speciallabel.value" :label="speciallabel.label" :value="speciallabel.value">
            </el-option>
          </el-select>
        </el-form-item>
        <p id="prompt">系统根据您选择的标签进行专项训练，祝您考试愉快！</p>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="gotospecial = false">取 消</el-button>
        <el-button type="primary" @click="gotospecial = false">开始专项训练</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import head from 'component/head'
export default {
  data() {
    return {
      gotoexam: false,
      gotospecial: false,
      examtimes: [{
        value: '30',
        label: '30分钟'
      }, {
        value: '60',
        label: '1小时'
      }, {
        value: '90',
        label: '1小时30分钟'
      }],
      specialtimes: [{
        value: '30',
        label: '30分钟'
      }, {
        value: '60',
        label: '1小时'
      }, {
        value: '90',
        label: '1小时30分钟'
      }],
      speciallabels: [{
        value: 'html',
        label: 'html'
      }, {
        value: 'css',
        label: 'css'
      }, {
        value: 'javascript',
        label: 'javascript'
      }],
      exam: {
        difficulty: ''
      },
      examtime: '',
      specialtime: '',
      speciallabel: '',
    }
  },
  components: {
    'lo-head': head
  },
  methods:{
    startExam(type){
      if(typeof type === 'undefined'){
        return;
      }else{

      }
    }
  }
}
</script>

<style scope>
#prompt {
  color: rgb(187,187,187);
  font-family: "微软雅黑";
  font-size: 12px;
}
.el-dialog--small {
  width: 20%;
}

#all {
  width: 100%;
  height: 99%;
  background-image: url("../../asset/images/background.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.content {
  width: 500px;
  min-width: 500px;
  margin: 0 auto;
  padding-top: 13%;
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

