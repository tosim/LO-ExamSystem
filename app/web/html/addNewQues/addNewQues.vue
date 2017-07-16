<template>
  <div id="all">
    <el-dialog title="添加试题" :visible.sync="dialogVisible" size="small" :before-close="handleClose">
      <div id="dial">
        <div id="cont">
          <el-row :span="24" class="row-1">
            <el-col :span="12">
              <el-col class="inputer-1" :span="12">试题类型</el-col>
              <el-col :span="12">
                <el-select v-model="value" placeholder="请选择" class="inputer-2">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="12">
              <el-col class="inputer-1" :span="12">所属目录</el-col>
              <el-col :span="12">
                <el-input v-model="Catalog" placeholder="请选择试题分类" class="inputer-2"></el-input>
              </el-col>
            </el-col>
          </el-row>
          <el-row :span="24" class="row-1">
            <el-col :span="12">
              <el-col :span="12" class="inputer-1">试题分数</el-col>
              <el-col :span="12">
                <el-input v-model="fraction" placeholder="请输入分数" class="inputer-2"></el-input>
              </el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="12" class="inputer-1">难度</el-col>
              <el-col :span="12">
                <el-select v-model="tes" placeholder="请选择难度" class="inputer-2">
                  <el-option v-for="i in difficulty" :key="i.value" :label="i.label" :value="i.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-col>
          </el-row>
          <el-row :span="24" class="row-2">
            <el-col :span="2" class="inputer-3">试题内容</el-col>
            <el-col :span="21" style="width: 654px;">
              <el-input type="textarea" :rows="5" class="textarea-1" id="textarea_1"></el-input>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="24">
              <table class="layui-table">
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
                <tr v-for="item in tableData" :key="item.swit_1">
                  <td>{{item.swit_1}}</td>
                  <td>
                    <el-input type="textarea" :rows="4" v-model="item.content" class="textarea-1"></el-input>
                  </td>
                  <td>
                    <input type="radio" name="trueAns" :value="item.radi_lab" title="" :checked="item.swit_2">
                  </td>
                  <td>
                    <span class="dele" @click="delswit(item)">删除</span>
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    <button class="layui-btn" @click="getRad">添加选项</button>
                  </td>
                </tr>
              </table>
            </el-col>
          </el-row>
          <div class="row-2">
            <el-col :span="2" class="inputer-4">试题分析</el-col>
            <el-col :span="21" style="width: 654px;">
              <el-input type="textarea" :rows="4" class="textarea-1"></el-input>
            </el-col>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer " style="text-align: center;">
        <button class="layui-btn layui-btn-normal" type="primary" @click="dialogVisible = false">保存</button>
        <button class="layui-btn layui-btn-normal" type="primary" @click="dialogVisible = false">保存并关闭</button>
        <button class="layui-btn layui-btn-normal" type="primary" @click="dialogVisible = false">保存并新增</button>
        <button class="layui-btn layui-btn-primary" @click="dialogVisible = false">取 消</button>
      </div>
  
    </el-dialog>
    <!-- 下面开始主界面绘制。。。 -->


    <el-button @click="dialogVisible = true">点击打开 Dialog</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    getRad() {
      // alert(this.radio);
      this.tableData.push({
        swit_1: "C",
        content: '测试内容',
        swit_2: false,
        radi_lab: 3,
      });
    },
    delswit(item) {
      let ind = this.tableData.indexOf(item);
      this.tableData.splice(ind, 1);
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    }
  },
  data() {
    return {
      radio: 1,
      dialogVisible: false,
      options: [{
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
      value: '',
      tes: '',
      Catalog: '',
      fraction: 0,
      tableData: [{
        swit_1: 'A',
        content: '测试内容',
        swit_2: true,
        radi_lab: 1,
      }, {
        swit_1: "B",
        content: '测试内容',
        swit_2: false,
        radi_lab: 2,
      }],
    }
  },
}

</script>

<style>
#all {
  width: 650px;
  margin: 0 auto;
  font-size: 16px;
  padding-top: 25px;
  font-family: Microsoft YaHei;
}

#dial {
  width: 100%;
  height: 500px;
  overflow: auto;
  overflow-x: none;
}

#cont {
  width: 80%;
  margin: 0 auto;
}

.inputer-2 {
  width: 290px;
}

.inputer-1 {
  width: 70px;
  line-height: 36px;
  text-align: center;
}

.inputer-3 {
  width: 70px;
  line-height: 125px;
  text-align: center;
}

.inputer-4 {
  width: 70px;
  line-height: 100px;
  text-align: center;
}

.row-1 {
  margin-bottom: 12px;
}

.row-2 {
  height: 125px;
}

.textarea-1 {
  height: 95px;
  margin: 0;
  padding: 0;
  width: 100%
}

.layui-table td,
.layui-table th {
  text-align: center;
  vertical-align: middle;
}

.dele {
  color: #01AAED;
  cursor: pointer;
}

.el-dialog__body {
  margin-bottom: 0;
  padding-bottom: 0;
}
</style>
