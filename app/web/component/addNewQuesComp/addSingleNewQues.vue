<template>
  <div>
    <div id="dial">
      <div id="cont">
        <el-form ref="form" :model="SingleQues" label-width="80px">
          <el-row :span="24" class="row-1">
            <el-col :span="12">
              <el-form-item label="试题类型">
                <el-select v-model="SingleQues.q_type" placeholder="请选择" style="width:100%;">
                  <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="标签">
                <el-select v-model="SingleQues.tag" multiple filterable placeholder="请选择试题标签" style="width:100%;">
                  <el-option v-for="item in taglist" :key="item.tag_id" :label="item.tag_name" :value="item.tag_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24" class="row-1">
            <!-- <el-col :span="12">
              <el-form-item label="试题分数">
                <el-input v-model="SingleQues.fraction" placeholder="请输入分数"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item label="难度">
                <el-select v-model="SingleQues.q_difficulty" placeholder="请选择难度" style="width:100%;">
                  <el-option v-for="i in difficulty" :key="i.value" :label="i.label" :value="i.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24" class="row-2">
            <el-form-item label="试题内容">
              <el-input type="textarea" :rows="5" class="textarea-1" v-model="SingleQues.q_content.main"></el-input>
            </el-form-item>
          </el-row>
          <el-form-item v-if="SingleQues.q_type === 4">
            <span>填空符请用三个连续下划线表示，否则无法识别</span>
          </el-form-item>
          <el-row :span="24">
            <el-col :span="24">
              <table class="layui-table" v-if="SingleQues.q_type ===2||SingleQues.q_type ===1">
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
                <tr v-for="(item,index) in SingleQues.tableData" :key="item.swit_1">
                  <td>{{item.swit_1}}</td>
                  <td>
                    <el-input type="textarea" :rows="4" v-model="item.content" class="textarea-1"></el-input>
                  </td>
                   <td>
                    <input type="radio" name='singlechos' v-model="SingleQues.SingleChooseAns" :value="item.radi_lab" v-if="SingleQues.q_type === 1">
                    <input type="checkbox" v-model="SingleQues.checkAns" :value="item.radi_lab" v-if="SingleQues.q_type === 2">
                  </td> 
                  <td>
                    <span class="dele" @click="delswit(index)">删除</span>
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    <el-button type="primary" @click="getRad">添加选项</el-button>
                  </td>
                </tr>
              </table>
  
              <el-form-item label="选项" v-if="SingleQues.q_type ===3">
                <el-radio class="radio" v-model="SingleQues.judgeAns" label="1">正确</el-radio>
                <el-radio class="radio" v-model="SingleQues.judgeAns" label="0">错误</el-radio>
              </el-form-item>
  
              <el-form-item label="正确答案" v-if="SingleQues.q_type ===4||SingleQues.q_type ===5||SingleQues.q_type ===6">
                <el-input type="textarea" :rows="4" v-model="SingleQues.q_answer"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item v-if="SingleQues.q_type === 4">
            <span>多个填空之间用“|”隔开，单个空有多个标准答案用“&”隔开 如：1&2|3 </span>
          </el-form-item>
  
          <el-form-item label="试题分析">
            <el-input type="textarea" :rows="5" v-model="SingleQues.q_analysis"></el-input>
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
    'currentItem',
  ],
  mounted: function () {
    console.log(this.currentItem);
    if (this.currentItem !== '') {
      this.analysData();
    }
    this.gettaglist();
  },
  watch: {
    currentItem: function (val) {
      if (this.currentItem !== '') {
        this.analysData();
      }
    },
  },
  methods: {
    analysData() {
      this.SingleQues = this.currentItem;
      for (let i = 0; i < this.currentItem.tag.length; i++) {
        this.SingleQues.tag[i] = this.currentItem.tag[i].tag_id;
      }
      if (this.SingleQues.q_type === 1 || this.SingleQues.q_type === 2) {
        var tmp = this.SingleQues.q_content.split(/;;/g);
        this.SingleQues.q_content = {
          main:tmp[0],
          items: tmp.slice(1),
        };
        this.SingleQues.SingleChooseAns = 0;
        this.SingleQues.judgeAns = '';
        this.SingleQues.checkAns = [];
        this.SingleQues.tableData = [];
        for (let i = 0; i < this.SingleQues.q_content.items.length; i++) {
          var tpm = this.SingleQues.q_content.items[i].split(/^([\S\s])\.(.*)/);
          this.SingleQues.tableData.push({
            swit_1:tpm[1],
            content:tpm[2],
            radi_lab:i+1,
          })
          if(this.SingleQues.q_type===1 && this.SingleQues.SingleChooseAns === 0){
            this.SingleQues.SingleChooseAns = this.SingleQues.q_answer === tpm[1]?i+1:this.SingleQues.SingleChooseAns;
          }

        }
        if (this.SingleQues.q_type === 2) {
          let tpm = this.SingleQues.q_answer.split('&');
          for(let i = 0,j = 0;i< this.SingleQues.q_content.items.length; i++ ){
            if(this.SingleQues.tableData[i].swit_1 === tpm[j]){
              this.SingleQues.checkAns[j++] = i+1;
            }
          }
        }
      } else if (this.SingleQues.q_type === 3) {
        //判断题
      } else if (this.SingleQues.q_type === 4) {
        var origin = this.SingleQues.q_content;
        this.SingleQues.q_content = {};
        this.SingleQues.q_content.main = origin; //填空题内容              
        // this.SingleQues.q_content.blankNum = origin.match(/_{3}/g); //空格个数
      } else if (this.SingleQues.q_type === 5) { // 简答题
      } else if (this.SingleQues.q_type === 6) { // 编程题
      }
    },
    getRad() {
      this.SingleQues.tableData.push({
        swit_1: "E",
        content: '测试内容',
        radi_lab: 5,
      });
    }, 
    delswit(index) {
      this.SingleQues.tableData.splice(index, 1);
    },
    onSubmit() {
      console.log('submit!');
      console.log(this.SingleQues);
    },
    gettaglist() {
      let _this = this;
      this.$http.get(`http://192.168.0.107:7001/getalltag`).then(res => {
        _this.taglist = res.data.data.taglist;
      })
    },
  },
  data() {
    return {
      SingleQues: {
        q_id: 2014,
        q_content: {
          main: '这里是题目',
          items: ['a....', 'b.....'],
        },
        q_type: 1,//1是单选 2是多选 3是判断。。。看addSingleNewQues.vue
        tag: [],
        q_difficulty: 9,
        q_answer:'',
        q_analysis:'',

        judgeAns: -1,//判断正误
        checkAns: [],//多选的选项 数字的 1 2 3
        SingleChooseAns: 2, //单选题的正确答案

        tableData: [{ //单选，多选的选项
          swit_1: 'A',
          content: '测试内容',
          radi_lab: 1,
        }, {
          swit_1: "B",
          content: '测试内容',
          radi_lab: 2,
        }],

      },
      taglist: [{

      }],
      typeOptions: [{
        value: 1,
        label: '单选题'
      }, {
        value: 2,
        label: '多选题'
      }, {
        value: 3,
        label: '判断题'
      }, {
        value: 4,
        label: '填空题'
      }, {
        value: 5,
        label: '简答题'
      }, {
        value: 6,
        label: '编程题'
      }],

      difficulty: [{
        value: 1,
        label: '一段'
      }, {
        value: 2,
        label: '二段'
      }, {
        value: 3,
        label: '三段'
      }, {
        value: 4,
        label: '四段'
      }, {
        value: 5,
        label: '五段'
      }, {
        value: 6,
        label: '六段'
      }, {
        value: 7,
        label: '七段'
      }, {
        value: 8,
        label: '八段'
      }, {
        value: 9,
        label: '九段'
      }],
    }
  }
}
</script>

