<template>
  <div>
    <div id="dial">
      <div id="cont">
        <el-form ref="form" :model="SingleQues" label-width="80px">
          <el-row :span="24" class="row-1">
            <el-col :span="12">
              <el-form-item label="试题类型">
                <el-select v-model="SingleQues.typeval" placeholder="请选择" style="width:100%;">
                  <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="标签">
                <el-select v-model="SingleQues.tags" multiple filterable placeholder="请选择试题标签" style="width:100%;">
                  <el-option v-for="item in tagOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24" class="row-1">
            <el-col :span="12">
              <el-form-item label="试题分数">
                <el-input v-model="SingleQues.fraction" placeholder="请输入分数"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="难度">
                <el-select v-model="SingleQues.diffc" placeholder="请选择难度" style="width:100%;">
                  <el-option v-for="i in difficulty" :key="i.value" :label="i.label" :value="i.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            </el-col>
          </el-row>
          <el-row :span="24" class="row-2">
            <el-form-item label="试题内容">
              <el-input type="textarea" :rows="5" class="textarea-1" v-model="SingleQues.cont"></el-input>
            </el-form-item>
          </el-row>
          <el-form-item v-if="SingleQues.typeval === '4'">
            <span>填空符请用三个连续下划线表示，否则无法识别</span>
          </el-form-item>
          <el-row :span="24">
            <el-col :span="24">
              <table class="layui-table" v-if="SingleQues.typeval ==='2'||SingleQues.typeval ==='1'">
                <colgroup>
                  <col width="60">
                  <col>
                  <col width="100">
                  <col width="60">
                  <col>
                </colgroup>
                <thead>
                  <tr>
                    <th>选项</th>
                    <th>描述</th>
                    <th>正确答案</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tr v-for="item in SingleQues.tableData" :key="item.swit_1">
                  <td>{{item.swit_1}}</td>
                  <td>
                    <el-input type="textarea" :rows="4" v-model="item.content" class="textarea-1"></el-input>
                  </td>
                  <td>
                    <input type="radio" v-model="SingleQues.SingleChooseAns" :value="item.radi_lab" v-if="SingleQues.typeval === '1'">
                    <input type="checkbox" v-model="SingleQues.checkAns" :value="item.radi_lab" v-if="SingleQues.typeval === '2'">
                  </td>
                  <td>
                    <span class="dele" @click="delswit(item)">删除</span>
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    <el-button type="primary" @click="getRad">添加选项</el-button>
                  </td>
                </tr>
              </table>
  
              <el-form-item label="选项" v-if="SingleQues.typeval ==='3'">
                <el-radio class="radio" v-model="SingleQues.judgeAns" label="1">正确</el-radio>
                <el-radio class="radio" v-model="SingleQues.judgeAns" label="0">错误</el-radio>
              </el-form-item>
  
              <el-form-item label="正确答案" v-if="SingleQues.typeval ==='4'||SingleQues.typeval ==='5'||SingleQues.typeval ==='6'">
                <el-input type="textarea" :rows="4" v-model="SingleQues.CurrentBlankAns"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item v-if="SingleQues.typeval === '4'">
            <span>多个填空之间用“|”隔开，单个空有多个标准答案用“&”隔开 如：1&2|3 </span>
          </el-form-item>
  
          <el-form-item label="试题分析">
            <el-input type="textarea" :rows="5" v-model="SingleQues.QuesAnal"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: [
    'currentId',
  ],
  mounted: function () {
    console.log('currentId:' + this.currentId);
  },
  watch: {
    currentId: function (val) {
      console.log('currentId: %s', val);
    },
  },
  methods: {
    getRad() {
      this.SingleQues.tableData.push({
        swit_1: "C",
        content: '测试内容',
        swit_2: false,
        radi_lab: 3,
      });
    }, delswit(item) {
      let ind = this.SingleQues.tableData.indexOf(item);
      this.SingleQues.tableData.splice(ind, 1);
    },
    onSubmit() {
      console.log('submit!');
      console.log(this.SingleQues);
    },
  },
  data() {
    return {
      SingleQues: {
        typeval: '1',//题目类型
        tags: [],//题目标签
        fraction: 0,//分数
        diffc: '',//难度选择 文本的1到4
        cont: '',//题目内容
        judgeAns: -1,//判断正误
        checkAns:[],//多选的选项 数字的 1 2 3
        SingleChooseAns: 2, //单选题的正确答案
        CurrentBlankAns:'',
        QuesAnal:'', //试题分析
        tableData: [{ //单选，多选的选项
          swit_1: 'A',
          content: '测试内容',
          swit_2: false,
          radi_lab: 1,
        }, {
          swit_1: "B",
          content: '测试内容',
          swit_2: false,
          radi_lab: 2,
        }],

      },
      typeOptions: [{
        value: '1',
        label: '单选题'
      }, {
        value: '2',
        label: '多选题'
      }, {
        value: '3',
        label: '判断题'
      }, {
        value: '4',
        label: '填空题'
      }, {
        value: '5',
        label: '简答题'
      }, {
        value: '6',
        label: '编程题'
      }],
      tagOptions: [{
        label: 'html',
        value: '5001'
      }, {
        label: 'css',
        value: '5002'
      }, {
        label: 'javascript',
        value: '5003'
      }],
      difficulty: [{
        value: '1',
        label: '简单'
      }, {
        value: '2',
        label: '中等'
      }, {
        value: '3',
        label: '稍难'
      }, {
        value: '4',
        label: '困难'
      }],
    }
  }
}
</script>

