<template>
  <div id="all">
    <el-dialog title="添加试题" :visible.sync="dialogVisible" size="small" :before-close="handleClose">
      <dial></dial>
      <div slot="footer" class="dialog-footer " style="text-align: center;">
        <button class="layui-btn layui-btn-normal" type="primary" @click="dialogVisible = false">保存</button>
        <button class="layui-btn layui-btn-normal" type="primary" @click="dialogVisible = false">保存并关闭</button>
        <button class="layui-btn layui-btn-normal" type="primary" @click="dialogVisible = false">保存并新增</button>
        <button class="layui-btn layui-btn-primary" @click="dialogVisible = false">取消</button>
      </div>
    </el-dialog>
    <!-- 下面开始主界面绘制。。。 -->
  
    <div class="div-1">
      <el-row :span="24">
        <el-col :span="8">
          <div class="layui-form-item">
            <label class="layui-form-label">关键字检索</label>
            <div class="layui-input-block">
              <input type="text" class="layui-input" />
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="layui-form-item">
            <label class="layui-form-label">标签检索</label>
            <div class="layui-input-block">
              <input type="text" class="layui-input" />
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="layui-form-item">
            <label class="layui-form-label">难度检索</label>
            <div class="layui-input-block">
              <input type="text" class="layui-input" />
            </div>
          </div>
        </el-col>
      </el-row>
      <div style="text-align:center;">
        <button class="layui-btn">查询</button>
        <button class="layui-btn layui-btn-primary">重置</button>
      </div>
    </div>
    <div class="div-1">
      <div class=" div-2 ">
        <div class="layui-btn-group ">
          <button class="layui-btn layui-btn-small" @click="dialogVisible = true">新增</button>
          <button class="layui-btn layui-btn-small">批量新增</button>
          <button class="layui-btn layui-btn-small">导入试题</button>
          <button class="layui-btn layui-btn-small">批量删除</button>
          <button class="layui-btn layui-btn-small">导出</button>
        </div>
      </div>
      <el-row>
        <el-table ref="multipleTable" :data="tableData2" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="试题内容" width="320" show-overflow-tooltip>
            <template scope="scope">{{ scope.row.content }}</template>
          </el-table-column>
          <el-table-column prop="type" label="题型" width="120">
          </el-table-column>
          <el-table-column prop="tag" label="标签" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="diff" label="难度" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="ans" label="标准答案" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="frac" label="分数" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template scope="scope">
              <span class="dele" @click="delswit2(scope.row)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <div id="page1" style="margin-top:12px;text-align:center;"></div>
      </el-row>
      
    </div>
  
    <!-- <el-button @click="dialogVisible = true">点击打开 Dialog</el-button> -->
  </div>
</template>

<script>
import dial from '../../component/addNewQuesComp/addSingleNewQues'

export default {
  components: {
    "dial": dial
  },
  mounted:function () {
    this.drawPag();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    drawPag(){
      let  _this = this;
      layui.laypage({
      cont: 'page1', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
      pages: 2, //通过后台拿到的总页数
      curr: _this.currpage, //当前页
      skin: 'yahei', //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
      jump: function (obj, first) { //触发分页后的回调
        if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
          _this.currpage = obj.curr;
          console.log(_this.currpage);
          _this.drawPag();
        }
      }
    });
    },

    delswit2(item) {
      let ind = this.tableData2.indexOf(item);
      this.tableData2.splice(ind, 1);
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
  },
  data() {
    return {
      currpage:1,
      radio: 1,
      dialogVisible: false,
      multipleSelection: [],

      tableData2: [{
        content: '这个是题目的内容，阿拉啦啦啦啦啦啦啦',
        type: '单选题',
        tag: "css",
        diff: "难",
        ans: "B",
        frac: 5,
      }, {
        content: '这个是题目的内容，阿拉啦啦啦啦啦啦啦',
        type: '单选题',
        tag: "css",
        diff: "难",
        ans: "B",
        frac: 5,
      }],
    }
  },
}

</script>

<style>
@import "./addNewQues.css";
</style>
