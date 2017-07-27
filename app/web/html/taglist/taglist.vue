<template>
    <div id="all">
        <lo-head></lo-head>
        <div class="content"></div>
        <el-row type="flex" justify="center">
            <el-col :span="12">
                <table class="layui-table" lay-even="" lay-skin="row">
                    <colgroup>
                        <col width="150">
                        <col width="150">
                        <col width="200">
                        <col>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>标签ID</th>
                            <th>标签名称</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) of taglist" :key="item" >
                            <td>{{item.tag_id}}</td>
                            <td>{{item.tag_name}}</td>
                            <td><el-button type="text" @click="removetag(index)" style="margin-right:10%">删除</el-button>
                            <el-button type="text" @click="updateprofession(index)">修改</el-button></td>
                        </tr>
    
                    </tbody>
                </table>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <div id="page1" class="page1"></div>
        </el-row>
        <el-row type="flex" justify="center">
        <el-col style="text-align:center;">
       <el-button type="primary" @click="addtagformVisible = true">添加标签</el-button>
        </el-col>
        </el-row>
        <!--添加标签  -->

    <el-dialog title="添加标签" :visible.sync="addtagformVisible" :before-close="handleClose">
        <el-row >
            <el-col :span="24" style="text-align: right;padding-right:20%;">
               <el-button type="primary" @click="addtaginput">批量添加</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="padding-left:0;">
        <el-form :model="tagform" >
            <el-form-item  style="padding-right:20%"  label="标签名称"  v-for="(item,index) in tagform.taglist" :key="item.tag_name" :label-width="formLabelWidth">
                <el-input type="text" v-model="item.tag_name" placeholder="请输入要添加的标签" auto-complete="off"></el-input>

            </el-form-item>
        </el-form>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addtagformVisible = false">取 消</el-button>
            <el-button type="primary" @click="addtag()">确 定</el-button>
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
             formLabelWidth: '45%',
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
     addtag(){
       this.addtagformVisible = false;
        console.log(this.tagform);
        },
     handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {  
                    done();
                })
                .catch(_ => { });
        },
     }
}
</script>

style>
  
</style>
