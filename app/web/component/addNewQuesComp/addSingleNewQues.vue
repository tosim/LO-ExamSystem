<template>
  <div>
    <div id="dial">
      <div id="cont">
        <dia></dia>
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
import dia from './comp_1'

export default {
  components: {
    "dia": dia
  },
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
  }
}
</script>

