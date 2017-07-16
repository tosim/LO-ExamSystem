<template>
    <div id="all">
        <lo-head></lo-head>
        <div class="content"></div>
        <el-row type="flex" justify="center">
            <el-col :span="12">
                1223
                <table class="layui-table" lay-even="" lay-skin="row">
                    <colgroup>
                        <col width="150">
                        <col width="150">
                        <col width="200">
                        <col>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>职业ID</th>
                            <th>职业名称</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item of professionlist" :key="item">
                            <td>{{item.p_id}}</td>
                            <td>{{item.p_name}}</td>
                            <td></td>
                        </tr>
    
                    </tbody>
                </table>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <div id="page1" class="page1"></div>
        </el-row>
        <el-button type="text" @click="dialogVisible = true">添加新职业</el-button>
        <el-dialog title="添加职业" :visible.sync="dialogVisible" :before-close="handleClose" >
            <div class="dia">
                <div class="cont">
                    <el-row class="row_1">
                        <el-col :span="8">
                            <el-col class="label_1">职业名称</el-col>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="请输入职业名称" class="input_1"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="row_1" type="flex" justify="center">
                        <div class="paperarea">
    
                        </div>
                    </el-row>
                    <el-row class="row_1" type="flex" justify="center">
                        <el-col :span="24">
                            <el-button type="primary" @click="dialogFormVisible = true" class="addpaper">添加试卷</el-button>
                        </el-col>
                    </el-row>
                    <div class="tagarea">
                        <el-row class="row_1" type="flex" justify="center">
                            <el-col :span="24">
                                <el-checkbox-group v-model="checkboxgroup">
                                    <el-checkbox-button class="tagbutton" v-for="item in taglist" :label="item.tag_name" :key="item.tag_id">{{item.tag_name}}</el-checkbox-button>
                                </el-checkbox-group>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="footerarea">
                        <span slot="footer" class="dialog-footer">
                            <el-row>
                                <el-col :span="12">
                                    <el-button @click="dialogVisible = false">取 消</el-button>
                                </el-col>
                                <el-col :span="8">
                                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                                </el-col>
                            </el-row>
                        </span>
                    </div>
                </div>
            </div>
        </el-dialog>
    
        <el-dialog title="添加试卷" :visible.sync="dialogFormVisible">
            <el-form :model="newpaper">
                <el-form-item label="单选题数量" :label-width="formLabelWidth">
                    <el-input v-model="newpaper.t_ochoose_num" auto-complete="off" class="forminput"></el-input>
                </el-form-item>
                <el-form-item label="分数" :label-width="formLabelWidth">
                    <el-input v-model="newpaper.t_ochoose_score" auto-complete="off" class="forminput"></el-input>
                </el-form-item>
                <el-form-item label="多选题数量" :label-width="formLabelWidth">
                    <el-input v-model="newpaper.t_mchoose_num" auto-complete="off" class="forminput"></el-input>
                </el-form-item>
                <el-form-item label="分数" :label-width="formLabelWidth">
                    <el-input v-model="newpaper.t_mchoose_score" auto-complete="off" class="forminput"></el-input>
                </el-form-item>
                <el-form-item label="判断题数量" :label-width="formLabelWidth">
                    <el-input v-model="newpaper.t_judge_num" auto-complete="off" class="forminput"></el-input>
                </el-form-item>
                <el-form-item label="分数" :label-width="formLabelWidth">
                    <el-input v-model="newpaper.t_judge_score" auto-complete="off" class="forminput"></el-input>
                </el-form-item>
                <el-form-item label="填空题数量" :label-width="formLabelWidth">
                    <el-input v-model="newpaper.t_fill_num" auto-complete="off" class="forminput"></el-input>
                </el-form-item>
                <el-form-item label="分数" :label-width="formLabelWidth">
                    <el-input v-model="newpaper.t_fill_score" auto-complete="off" class="forminput"></el-input>
                </el-form-item>
                <el-form-item label="简答题数量" :label-width="formLabelWidth">
                    <el-input v-model="newpaper.t_squestion_num" auto-complete="off" class="forminput"></el-input>
                </el-form-item>
                <el-form-item label="分数" :label-width="formLabelWidth">
                    <el-input v-model="newpaper.t_squestion_score" auto-complete="off" class="forminput" :disabled="true"></el-input>
                </el-form-item>
               <el-form-item label="编程题数量" :label-width="formLabelWidth">
                    <el-input v-model="newpaper.t_code_num" auto-complete="off" class="forminput"></el-input>
                </el-form-item>
                <el-form-item label="分数" :label-width="formLabelWidth">
                    <el-input v-model="newpaper.t_code_score" auto-complete="off" class="forminput" :disabled="true"></el-input>
                </el-form-item>
                <h2 style="">{{newpaper.t_ochoose_num*newpaper.t_ochoose_score+newpaper.t_mchoose_num*newpaper.t_mchoose_score+newpaper.t_judge_num*newpaper.t_judge_score+newpaper.t_fill_num*newpaper.t_fill_score}}</h2>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:350px;">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="checkpaper()">确 定</el-button>
            </div>
        </el-dialog>
       <!--警告对话框  -->
       <el-dialog
        title="提示"
        :visible.sync="WarnVisible"
        size="tiny"
        :before-close="handleClose">
        <span>总分必须为100</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="WarnVisible = false">取 消</el-button>
            <el-button type="primary" @click="WarnVisible = false">确 定</el-button>
        </span>
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
    data() {
        return {
            dialogVisible: false,
            dialogFormVisible: false,
            WarnVisible:false,
            SuccessVisible:false,
            professionlist: [],
            taglist: [],
            choosetag: [],
            totalnum: 0,
            currpage: 1,
            checkboxgroup: [],
            testpaper:[],
            newpaper: {
                t_ochoose_num: 0,
                t_mchoose_num: 0,
                t_judge_num: 0,
                t_fill_num: 0,
                t_squestion_num: 0,
                t_code_num: 0,
                t_ochoose_score: 0,
                t_mchoose_score: 0,
                t_judge_score:0,
                t_fill_score:0,
                t_squestion_score:0,
                t_code_score:0,
            },
            formLabelWidth: '45%'
        }
    },
    components: {
        "lo-head": Head
    },
    mounted: function () {
        this.fetch();
        this.gettaglist();
        console.log("taglis = ");
        console.log(this.taglist);
        console.log("end\n");
    },
    computed: {
        lists() {
            return this.professionlist;
            return this.taglist;
        }
    },
    methods: {
        fetch() {
            let _this = this;
            _this.$http.get(`http://127.0.0.1:7001/getprofessionlist?page=${_this.currpage}`).then(res => {
                _this.totalnum = res.data.data.totalnum;
                _this.professionlist = res.data.data.professionlist;
                layui.laypage({
                    cont: 'page1', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                    pages: _this.totalnum, //通过后台拿到的总页数
                    curr: _this.currpage, //当前页
                    skin: 'yahei', //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                    jump: function (obj, first) { //触发分页后的回调
                        if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                            _this.currpage = obj.curr;
                            _this.fetch();
                        }
                    }
                });
            })
        },
        gettaglist() {
            // var _this = this;
            this.$http.get(`http://127.0.0.1:7001/getalltag`).then(res => {
                console.log(res.data.data.taglist)
                this.taglist = res.data.data.taglist;
                console.log("start---------");
                console.log(this.taglist);
                console.log("end---------");
            })
        },
        checkpaper(){
            const newpaper = this.newpaper;
            var totalscore = newpaper.t_ochoose_num*newpaper.t_ochoose_score+newpaper.t_mchoose_num*newpaper.t_mchoose_score+newpaper.t_judge_num*newpaper.t_judge_score+newpaper.t_fill_num*newpaper.t_fill_score;
               console.log(totalscore);
            if(totalscore !==100){
              this.WarnVisible=true; 
            }else{
                this.dialogFormVisible=false;
                const onepaper ={
                    t_ochoose_num:newpaper.t_ochoose_num,
                    t_mchoose_num:newpaper.t_mchoose_num,
                    t_judge_num:newpaper.t_judge_num,
                    t_fill_num:newpaper.t_fill_num,
                    t_squestion_num: newpaper.t_squestion_num,
                    t_code_num: newpaper.t_code_num,
                    t_ochoose_score:newpaper.t_ochoose_score,
                    t_mchoose_score:newpaper.t_mchoose_score,
                    t_judge_score:newpaper.t_judge_score,
                    t_fill_score:newpaper.t_fill_score,
                    t_squestion_score: newpaper.t_squestion_score,
                    t_code_score: newpaper.t_code_score,
                } 
                this.testpaper.push(onepaper);
                console.log(this.testpaper);
            }   
        },
       
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        }
    }

}
</script>

<style scoped>
.el-form-item {
    width: 45%;
    float: left
}

.dia {
    width: 650px;
    height: 500px;
    overflow: auto;
    overflow-x: none;
}

.cont {
    width: 90%;
    margin: 0 auto;
}

.addpaper {
    margin-top: 20px;
}

.tagarea {
    margin-top: 50px;
    margin-left: 0px;
    text-align: center;
}

.footerarea {
    margin-top: 50px;
    text-align: center;
}

.tagbutton {
    margin-left: 0px;
}

.forminput {
    width: 45%;
}
</style>
