<template>
  <div id="all">
    <el-dialog title="添加试题" :visible.sync="dialogVisible" size="small" :before-close="handleClose">
      <dial v-bind:currentContent="currentContent"></dial>
      <div slot="footer" class="dialog-footer " style="text-align: center;">
        <button class="layui-btn layui-btn-normal" type="primary" @click="dialogVisible = false">保存</button>
        <button class="layui-btn layui-btn-normal" type="primary" @click="dialogVisible = false">保存并关闭</button>
        <button class="layui-btn layui-btn-normal" type="primary" @click="dialogVisible = false">保存并新增</button>
        <button class="layui-btn layui-btn-primary" @click="dialogVisible = false">取消</button>
      </div>
    </el-dialog>
  
    <el-dialog title="批量添加试题" :visible.sync="MutiVisible" size="small" :before-close="handleClose">
      <dial2></dial2>
      <div slot="footer" class="dialog-footer " style="text-align: center;">
        <button class="layui-btn layui-btn-normal" type="primary" @click="MutiVisible = false">检查格式</button>
        <button class="layui-btn layui-btn-normal" type="primary" @click="MutiVisible = false">导入</button>
        <button class="layui-btn layui-btn-primary" @click="MutiVisible = false">取消</button>
      </div>
    </el-dialog>
  
    <el-dialog title="导入试题" :visible.sync="ImportVisible" size="small" :before-close="handleClose">
      <dial3></dial3>
      <div slot="footer" class="dialog-footer " style="text-align: center;">
        <button class="layui-btn layui-btn-normal" type="primary" @click="ImportVisible = false">导入</button>
        <button class="layui-btn layui-btn-primary" @click="ImportVisible = false">关闭</button>
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
          <button class="layui-btn layui-btn-small" @click="editblock()">新增</button>
          <button class="layui-btn layui-btn-small" @click="MutiVisible = true">批量新增</button>
          <button class="layui-btn layui-btn-small" @click="ImportVisible = true">导入试题</button>
          <button class="layui-btn layui-btn-small" @click="delMut()">批量删除</button>
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
            <template scope="scope">{{ scope.row.tag }}</template>
          </el-table-column>
          <el-table-column prop="diff" label="难度" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="ans" label="标准答案" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="frac" label="分数" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template scope="scope">
              <span class="dele" @click="editswit2(scope.row)">编辑</span>
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
import dial2 from '../../component/addNewQuesComp/addMutiNewQues'
import dial3 from '../../component/addNewQuesComp/importQuesFile'

export default {

  components: {
    "dial": dial,
    "dial2": dial2,
    "dial3": dial3,
  },
  mounted: function () {
    this.drawPag();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    delMut() {
      let items = this.multipleSelection;
      for (let i = 0; i < items.length; i++) {
        this.delswit2(items[i]);
      }
    },

    drawPag() {
      let _this = this;
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
    editblock() {
      this.currentContent = {
        cont:'',
        typeval: '',
        tags: '',
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
      },
      this.dialogVisible = true;
    },
    editswit2(item) {
      this.currentContent = {
        cont:item.content,
        typeval: item.type,
        tags: item.tag,
        fraction: item.frac,
        diffc: item.diff,
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

      this.dialogVisible = true;

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
      currpage: 1,
      radio: 1,
      dialogVisible: false,
      MutiVisible: false,
      ImportVisible: false,
      multipleSelection: [],
      currentContent: {
        cont:'',
        typeval: '',
        tags: '',
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
      },
      tableData2: [{
        content: '这个是题目的内容，阿拉啦啦啦啦啦啦啦',
        type: '单选题',
        tag: ["css"],
        diff: "困难",
        ans: "B",
        frac: 5,
      }, {
        content: '这个是题目的内容，阿拉啦啦啦啦啦啦啦',
        type: '单选题',
        tag: ["css"],
        diff: "困难",
        ans: "B",
        frac: 5,
      }, {
        content: '这个是题目的内容，阿拉啦啦啦啦啦啦啦阿拉啦啦啦啦啦啦啦阿拉啦啦啦啦啦啦啦阿拉啦啦啦啦啦啦啦阿拉啦啦啦啦啦啦啦阿拉啦啦啦啦啦啦啦',
        type: '单选题',
        tag: ["html","css"],
        diff: "困难",
        ans: "C",
        frac: 5,
      }],
    }
  },
}

</script>

<style>
@import "./addNewQues.css";
</style>
