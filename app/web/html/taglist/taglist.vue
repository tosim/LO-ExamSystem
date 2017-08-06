<template>
    <div id="all">
        <lo-bkhead></lo-bkhead>
        <div class="content"></div>
        <el-row>
          <div class="layui-btn-group "style="margin-left:54.6%">
          <button class="layui-btn layui-btn-small" @click="addtagformVisible = true">批量新增</button>
          <button class="layui-btn layui-btn-small" @click="delMut()">批量删除</button>
        </div>
        </el-row>
        <el-row type="flex" justify="center" style="text-align:center">
            <el-col :span="6.3" style="text-align:center">
    <!-- 标签列表 -->
    <el-table ref="multipleTable" :data="taglist" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="标签ID" width="120">
            <template scope="scope">{{ scope.row.tag_id }}</template>
        </el-table-column>
        <el-table-column label="标签名称" width="120">
            <template scope="scope">{{ scope.row.tag_name}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120">
            <template scope="scope">
                <el-button type="text" @click="updatetag(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
    </el-table>
        </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <div id="page1" class="page1"></div>
        </el-row>
        <!--添加标签  -->

    <el-dialog title="添加标签" :visible.sync="addtagformVisible" :before-close="handleClose">
        <el-row >
            <el-col :span="24" style="text-align: right;padding-right:20%;">
               <el-button type="primary" size="small" @click="addtaginput">添加</el-button>
               <el-button type="primary" size="small" @click="removetaginput">删除</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="padding-left:0;">
        <el-form :model="tagform" >
            <el-form-item  style="padding-right:20%"  label="标签名称" v-for="(item,index) in tagform.taglist" :key="item" :label-width="formLabelWidth">
                <el-input type="text" v-model="item.tag_name" placeholder="请输入要添加的标签" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addtag()">确 定</el-button>
        </div>
    </el-dialog>

    <!--修改标签  -->
    <el-dialog title="修改标签" :visible.sync="updatetagformVisible" :before-close="handleClose2">
        <el-row>
            <el-col :span="24" style="padding-left:0;">
        <el-form :model="tagform" >
            <el-form-item  style="padding-right:20%"  label="标签名称"  v-for="(item,index) in tagform.taglist" :key="item" :label-width="formLabelWidth">
                <el-input type="text" v-model="currentItem.tag_name" placeholder="请输入要添加的标签" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="updateonetag()">确 定</el-button>
        </div>
    </el-dialog>

    <!--成功对话框-->
        <el-dialog
        title="提示"
        :visible.sync="SuccessVisible"
        size="tiny"
        :before-close="handleClose">
        <span>提交成功</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="WarnVisible = false">取 消</el-button>
            <el-button type="primary" @click="SuccessVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import Head from "component/head.vue";
export default {
     data(){
         return{
             SuccessVisible:false,
             addtagformVisible:false,
             updatetagformVisible:false,
             formLabelWidth: '45%',
             multipleSelection: [],
             currentItem:{},
             totalnum:0,
             currpage:1,
             taglist:[],
              tagform: {
              taglist: [
                    {
                        tag_name: '',
                    }
                ],
            },
         }
     },
    components: {
        "lo-head": Head
    },
     mounted: function () {
       this.gettaglist();
     },
     methods:{
         addtaginput(){
            var onetag ={
                tag_name:'',
            };
            this.tagform.taglist.push(onetag);
        },
        removetaginput(){
            let lastindex = this.tagform.taglist.length;
           this.tagform.taglist.splice(lastindex-1,1);
        },
        gettaglist() {
            let _this = this;
            _this.$http.get(`http://127.0.0.1:7001/gettaglist?page=${_this.currpage}`).then(res => {
                console.log(res.data.data.taglist)
                _this.totalnum = res.data.data.totalnum;
                _this.taglist = res.data.data.taglist;
                 layui.laypage({
                    cont: 'page1', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                    pages: _this.totalnum, //通过后台拿到的总页数
                    curr: _this.currpage, //当前页
                    skin: 'yahei', //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                    jump: function (obj, first) { //触发分页后的回调
                        if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                            _this.currpage = obj.curr;
                           _this.gettaglist();
                        }
                    }
                });
            })
        },
        addtag() {
            this.addtagformVisible = false;
            console.log(this.tagform);
            var tag_namelist = {tag_namelist:[]};
            this.tagform.taglist.forEach(function (value) {
                tag_namelist.tag_namelist.push(value.tag_name);
            })
            console.log(tag_namelist);
            this.$http.post(`http://127.0.0.1:7001/addtaglist`, tag_namelist, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                console.log(res);
                this.tagform.taglist =[{
                    tag_name:'',
                }];
                this.gettaglist();
            })
            .catch(error => {
                        console.log(error);
                    });
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    this.tagform.taglist =[{
                    tag_name:'',
                }];
                    done();
                })
                .catch(_ => { });
        },
       handleClose2(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    this.gettaglist();
                    this.currentItem = {};
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
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delMut() {
            let dellist = [];
            for (let item of this.multipleSelection) {
                this.getIndex(item);
                dellist.push(item.tag_id);
            }
            if (dellist.length !== 0) {
                console.log(dellist);
                this.$http.post(`http://127.0.0.1:7001/deltetaglist`, dellist).then(res => {
                    console.log(res);
                })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
    getIndex(item) {
      let ind = this.taglist.indexOf(item);
      this.taglist.splice(ind, 1);
    },
    updatetag(item){
        console.log(item);
        this.currentItem = item;
        this.updatetagformVisible = true;
    },
     updateonetag() {
         console.log(this.currentItem)
         this.$http.post(`http://127.0.0.1:7001/updatetag`, this.currentItem).then(res => {
             console.log(res);
             this.currentItem = {};
             this.updatetagformVisible =false;
         })
             .catch(err => {
                 console.log(err);
             });
     },
    },
    
    
}
</script>

<style>
  .content{
      margin-top: 70px;
  }
</style>
