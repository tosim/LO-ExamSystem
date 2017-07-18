<template>
  <div>
    <div id="dial">
      <div id="cont">
        <el-row :span="24" class="row-1">
          <el-col :span="12">
            <div class="layui-form-item">
              <label class="layui-form-label">试题类型</label>
              <div class="layui-input-block">
                <el-select v-model="currentContent.typeval" placeholder="请选择" style="width:100%;">
                  <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="layui-form-item">
              <label class="layui-form-label">标签</label>
              <div class="layui-input-block">
                <el-select v-model="currentContent.tags" multiple filterable placeholder="请选择试题标签" style="width:100%;">
                  <el-option v-for="item in tagOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :span="24" class="row-1">
          <el-col :span="12">
            <div class="layui-form-item">
              <label class="layui-form-label">试题分数</label>
              <div class="layui-input-block">
                <el-input v-model="currentContent.fraction" placeholder="请输入分数"></el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="layui-form-item">
              <label class="layui-form-label">难度</label>
              <div class="layui-input-block">
                <el-select v-model="currentContent.diffc" placeholder="请选择难度" style="width:100%;">
                  <el-option v-for="i in difficulty" :key="i.value" :label="i.label" :value="i.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :span="24" class="row-2">
          <div class="layui-form-item">
            <label class="layui-form-label">试题内容</label>
            <div class="layui-input-block">
              <el-input type="textarea" :rows="5" class="textarea-1" v-model="currentContent.cont"></el-input>
            </div>
          </div>
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
              <tr v-for="item in currentContent.tableData" :key="item.swit_1">
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
        <div class="layui-form-item">
          <label class="layui-form-label">试题分析</label>
          <div class="layui-input-block">
            <el-input type="textarea" :rows="5" class="textarea-1" id="textarea_1"></el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: [
    'currentContent',
  ],
  methods: {
    getRad() {
      this.tableData.push({
        swit_1: "C",
        content: '测试内容',
        swit_2: false,
        radi_lab: 3,
      });
    }, delswit(item) {
      let ind = this.tableData.indexOf(item);
      this.tableData.splice(ind, 1);
    },
  },
  data() {
    return {
      cont:'',
      typeval: '',
      tags: [],
      fraction: 0,
      diffc: '',
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

