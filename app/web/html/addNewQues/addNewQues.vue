<template>
  <div id="all">
    <!-- 创建考试 -->

    <el-dialog title="创建考试" :visible.sync="dialogFormVisible">
      <el-form :model="exam">
        <el-form-item label="企业名称" :label-width="formLabelWidth">
           <el-input placeholder="请输入内容" v-model="enterprise.e_name" :disabled="true" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="职业" :label-width="formLabelWidth">
          <el-select v-model="exam.p_id" placeholder="请选择职业">
            <el-option v-for="(item,index) in professionlist" :key="item" :label="item.p_name" :value="item.p_id"></el-option>
          </el-select>
        </el-form-item>
       <el-form-item label="持续时间" :label-width="formLabelWidth">
      <el-select v-model="exam.last_time" placeholder="请选择持续时间">
        <el-option label="30" value="30"></el-option>
        <el-option label="60" value="60"></el-option>
        <el-option label="90" value="90"></el-option>
      </el-select>
    </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer " style="text-align: center;">
        <button class="layui-btn layui-btn-normal" type="primary" @click="submitexam">保存</button>
        <button class="layui-btn layui-btn-primary" @click="dialogVisible = false">取消</button>
      </div>
    </el-dialog>

    <el-dialog title="添加试题" :visible.sync="dialogVisible" size="small" :before-close="handleClose">
      <dial v-bind:currentItem="currentItem" :enterprise="enterprise" :examId="examId" @fetch="fetch" ref="dial"></dial>
      <div slot="footer" class="dialog-footer " style="text-align: center;">
        <button class="layui-btn layui-btn-normal" type="primary" @click="submitDia">保存</button>
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
      <div class=" div-2 ">
        <div class="layui-btn-group ">
          <button class="layui-btn layui-btn-small" @click="dialogFormVisible = true">创建考试</button>
          <button class="layui-btn layui-btn-small" @click="editblock()">新增</button>
          <button class="layui-btn layui-btn-small" @click="MutiVisible = true">批量新增</button>
          <button class="layui-btn layui-btn-small" @click="ImportVisible = true">导入试题</button>
          <button class="layui-btn layui-btn-small" @click="delMut()">批量删除</button>
          <button class="layui-btn layui-btn-small">导出</button>
        </div>
      </div>
      <el-row>
        <el-table ref="multipleTable" :data="questionlist" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="试题内容" width="320" show-overflow-tooltip>
            <template scope="scope">{{ scope.row.q_content }}</template>
          </el-table-column>
          <el-table-column prop="type" label="题型" width="120">
            <template scope="scope">
              <span style="padding:5px;">{{typeNam[scope.row.q_type]}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="tag" label="标签" show-overflow-tooltip>
            <template scope="scope">
              <span v-for="ite in scope.row.tag" :key="ite.tag_name" style="padding:5px;">{{ite.tag_name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="q_difficulty" label="难度" show-overflow-tooltip>
            <template scope="scope">
              <span style="padding:5px;">{{diffNam[scope.row.q_difficulty]}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="q_answer" label="标准答案" show-overflow-tooltip>
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
    this.fetch();
    this.gettaglist();
    this.getprofession();
  },
  methods: {
    submitDia(){
      this.dialogVisible = false;
      this.$refs.dial.onSubmit()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    delMut() {
      let items = this.multipleSelection;
      let deitems = [];
      for (let i = 0; i < items.length; i++) {
        this.delswit2(items[i]);
        deitems.push(items[i].q_id);
      }
      if (deitems.length !== 0) {
        console.log(deitems);
        this.$http.post(`http://127.0.0.1:7001/batchdelete`, deitems).then(res => {
          console.log(res);
        });
      }

    },
    gettaglist() {
      let _this = this;
      this.$http.get(`http://127.0.0.1:7001/getalltag`).then(res => {
        _this.taglist = res.data.data.taglist;
      })
    },
    fetch(){
      let _this = this;
       this.$http.get(`http://127.0.0.1:7001/getexamquestionlist?examid=${this.examId}`).then(res => {
        this.questionlist = res.data.data.questionlist;
        console.log(this.questionlist)
      })
    },
    fetchData() {
      let _this = this;
      let pkage = {
        query:this.query,
        page:this.currpage,
      }
      _this.$http.post(`http://127.0.0.1:7001/search`,pkage).then(res => {
        console.log(res);
        _this.totalnum = res.data.data.totalnum;
        _this.questionlist = res.data.data.questionlist;
        layui.laypage({
          cont: 'page1', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
          pages: _this.totalnum, //通过后台拿到的总页数
          curr: _this.currpage, //当前页
          skin: 'yahei', //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
          jump: function (obj, first) { //触发分页后的回调
            if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
              _this.currpage = obj.curr;
              _this.fetchData();
            }
          }
        });
      })
    },
    delswit2(item) {
      let ind = this.questionlist.indexOf(item);
      this.questionlist.splice(ind, 1);
    },
    editblock() {
      this.currentItem = '';
      this.dialogVisible = true;
    },
    editswit2(item) {
      this.currentItem = item;
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
    que(){
      this.currpage = 1;
      this.fetchData();
    },
    reset(){
      this.query.firs = '';
      this.query.serd = [];
      this.query.thre = '1-9';

    },
    getprofession(){
      let _this = this;
      this.$http.get(`http://127.0.0.1:7001/getallprofession`).then(res => {
        this.professionlist = res.data.data.professionlist;
      })
    },
    submitexam(){
      this.exam.e_id = this.enterprise.e_id;
      this.exam.start_time = Date.parse(new Date()); 
       this.$http.post(`http://127.0.0.1:7001/addexam`, this.exam, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => {
                       console.log(res);
                       this.exam={
                          e_id:-1,
                          p_id:'',
                          start_time:'',
                          last_time:30,
                        }
                        this.examId= res.data.data.examId;
                        this.dialogFormVisible = false;
                    })
                    .catch( err=> {
                        console.log(err);
                    });
  }
  },
  data() {
    return {
      formLabelWidth: '120px',
      examId:-1,
      enterprise:{
        e_id:2,
        e_name:'阿里巴巴',
      },
      exam:{
         e_id:-1,
         p_id:'',
         start_time:'',
         last_time:'',
      },
      professionlist:[],
      dialogFormVisible:false,
      currpage: 1,
      currentItem: '',
      totalnum: 1,
      query:{
        firs:'',
        serd:[],
        thre:'1-9',
      },
      taglist: [{

      }],
      dialogVisible: false,
      MutiVisible: false,
      ImportVisible: false,
      multipleSelection: [],
      tagNam: {
        "5001": "css",
        "5002": "html",
        "5003": "javascript"
      },
      diffNam: [
        "空段",
        "一段",
        "二段",
        "三段",
        "四段",
        "五段",
        "六段",
        "七段",
        "八段",
        "九段"
      ],
      typeNam: [
        "保留题",
        "单选题",
        "多选题",
        "判断题",
        "填空题",
        "简答题",
        "编程题",
      ],
      questionlist: [{
        q_id: 2014,
        q_content: '这个是题目的内容，阿拉啦啦啦啦啦啦啦',
        q_type: 1,//1是单选 2是多选 3是判断。。。看addSingleNewQues.vue
        tag: [{
          tag_id: 2,
          tag_name: "css"
        }],
        q_difficulty: 9,
        q_answer: "awda",
        q_analysis: "wada",
        ans: "B",
      }, {
        q_id: 2015,
        q_content: '这个是题目的内容，阿拉啦啦啦啦啦啦啦',
        q_type: '1',
        tag: [{
          tag_id: 2,
          tag_name: "css"
        }],
        q_difficulty: 9,
        ans: "B",
      }, {
        q_id: 2016,
        q_content: '这个是题目的内容，阿拉啦啦啦啦啦啦啦',
        q_type: '1',
        tag: [{
          tag_id: 2,
          tag_name: "css"
        }],
        q_difficulty: "4",
        ans: "C",
      }],
    }
  },
}

</script>

<style>
@import "./addNewQues.css";
</style>
