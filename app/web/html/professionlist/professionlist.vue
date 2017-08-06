<template>
    <div id="all">
        <lo-bkhead></lo-bkhead>
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
                            <th>职业ID</th>
                            <th>职业名称</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) of professionlist" :key="item" >
                            <td>{{item.p_id}}</td>
                            <td>{{item.p_name}}</td>
                            <td><el-button type="text" @click="removeprofession(index)" style="margin-right:10%">删除</el-button>
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
        <el-button type="primary" @click="dialogVisible = true">添加新职业</el-button>
        </el-col>
        </el-row>
        <el-dialog title="添加职业" :visible.sync="dialogVisible" :before-close="handleClose1" class="addprofessiondia">
            <div class="dia">
                <div class="cont">
                    <el-row class="row_1">
                        <el-col :span="8">
                            <el-col class="label_1" style="text-align:center;"><span>职业名称</span></el-col>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="请输入职业名称" class="input_1" v-model="p_name"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="row_1" type="flex" justify="center">
                        <!-- t_ochoose_num: 0,
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
                            t_code_score:0,  -->
                        <div class="paperarea">
                            <!--一条  -->
                          <el-row v-for="(item,index) in testpaper" :key="item" class="onetestpaper" style="text-align:center;width:100%" >
                              <el-col :span="20">
                                  <span>单选题：{{item.t_ochoose_num}}</span>
                                  <span>多选题：{{item.t_mchoose_num}}</span>
                                  <span>判断题：{{item.t_judge_num}}</span>
                                  <span>填空题：{{item.t_fill_num}}</span>
                                  <span>简答题：{{item.t_squestion_num}}</span>
                                  <span>编程题：{{item.t_code_num}}</span>
                              </el-col>
                              <el-col :span="2" style="margin-top:0"><a  @click="updatetestpaper(index)"><font color="#58B7FF">修改</font></a></el-col>
                              <el-col :span="2" style="margin-top:0"><a  @click="removetestpaper(index)"><font color="#58B7FF">删除</font></font></a></el-col>
                          </el-row>
                        </div>
                    </el-row>
                    <el-row class="row_1" type="flex" justify="center">
                        <el-col :span="8" style="text-align:center;">
                            <el-button type="primary" @click="dialogFormVisible = true" class="addpaper">添加试卷</el-button>
                        </el-col>
                        <el-col :span="8"></el-col>
                        <el-col :span="8"></el-col>
                    </el-row>
                    <div class="tagarea">
                    <el-row class="row_1">
                        <el-col :span="8">
                            <el-col class="label_1"><span>对应标签</span></el-col>
                        </el-col>
                        <el-col :span="8">
                         <el-select v-model="choosetag" multiple placeholder="请选择标签">
                            <el-option
                            v-for="item in taglist"
                            :key="item.tag_id"
                            :label="item.tag_name"
                            :value="item.tag_id">
                            </el-option>
                        </el-select>
                        </el-col>
                    </el-row>
                    </div>
                    <div class="footerarea">
                        <span slot="footer" class="dialog-footer">
                            <el-row>
                                <el-col :span="24">
                                    <el-button type="primary" @click="confirm()">确 定</el-button>
                                </el-col>
                            </el-row>
                        </span>
                    </div>
                </div>
            </div>
        </el-dialog>
        <!--添加试卷  -->
        <el-dialog title="添加试卷" :visible.sync="dialogFormVisible" :before-close="handleClose">
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
                <h2 class="score">{{newpaper.t_ochoose_num*newpaper.t_ochoose_score+newpaper.t_mchoose_num*newpaper.t_mchoose_score+newpaper.t_judge_num*newpaper.t_judge_score+newpaper.t_fill_num*newpaper.t_fill_score}}</h2>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="checkpaper()">确 定</el-button>
            </div>
        </el-dialog>
        <!--修改试卷 -->
        <el-dialog title="添加试卷" :visible.sync="updatedialogFormVisible" :before-close="handleClose2">
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
               <h1 class="score">{{newpaper.t_ochoose_num*newpaper.t_ochoose_score+newpaper.t_mchoose_num*newpaper.t_mchoose_score+newpaper.t_judge_num*newpaper.t_judge_score+newpaper.t_fill_num*newpaper.t_fill_score}}</h1>
            </el-form>
            <div slot="footer" class="dialog-footer">
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
        <!--警告框  -->
         <el-dialog
        title="提示"
        :visible.sync="WarnVisible2"
        size="tiny"
        :before-close="handleClose">
        <span>请填写完信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="WarnVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="WarnVisible2= false">确 定</el-button>
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
        <!--添加职业成功  -->
         <el-dialog
        title="提示"
        :visible.sync="SuccessVisible2"
        size="tiny"
        :before-close="handleClose">
        <span>添加职业成功</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="SuccessVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="SuccessVisible2 = false">确 定</el-button>
        </span>
        </el-dialog>
        <!--修改职业成功  -->
        <el-dialog
        title="提示"
        :visible.sync="SuccessVisible3"
        size="tiny"
        :before-close="handleClose">
        <span>修改职业成功</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="SuccessVisible3 = false">取 消</el-button>
            <el-button type="primary" @click="SuccessVisible3 = false">确 定</el-button>
        </span>
        </el-dialog>

    





    </div>
</template>

<script>
import Head from "component/head.vue";
export default {
    data() {
        return {
            updatedialogFormVisible:false,
            dialogVisible: false,
            dialogFormVisible: false,
            WarnVisible:false,
            WarnVisible2:false,
            SuccessVisible:false,
            SuccessVisible2:false,
            SuccessVisible3:false,
            p_id:-1,
            professionlist: [],
            taglist: [],
            choosetag: [],
            totalnum: 0,
            currpage: 1,
            // checkboxgroup: [],
            choosetag:[],
            testpaper:[],
            newpaper: {
                t_id:-1,
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
            profession:{},
            p_name:'',
            tag:[],
            professiondata : {},
            formLabelWidth: '45%',
            
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
    filters:{
        Zero:function(value){
            if(value === ''){
                return 0;
            }
        }
    },
    methods: {
        chooseRate(){
            // console.log("chooseRate");
            alert('choosed');
        },
        fetch() {
            this.$http.get(`http://127.0.0.1:7001/getprofessionlist?page=${this.currpage}`).then(res => {
                this.totalnum = res.data.data.totalnum;
                this.professionlist = res.data.data.professionlist;
                layui.laypage({
                    cont: 'page1', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                    pages: this.totalnum, //通过后台拿到的总页数
                    curr: this.currpage, //当前页
                    skin: 'yahei', //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                    jump: function (obj, first) { //触发分页后的回调
                        if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                            this.currpage = obj.curr;
                            this.fetch();
                        }
                    }
                });
            })
        },
        gettaglist() {
            this.$http.get(`http://127.0.0.1:7001/getalltag`).then(res => {
                console.log(res.data.data.taglist)
                this.taglist = res.data.data.taglist;
                console.log("start---------");
                console.log(this.taglist);
                console.log("end---------");
            })
        },
        confirm(){
         const p_id = this.p_id;
         console.log("p_id");
         console.log(p_id);
         if(p_id === -1){
             this.addprofession();
         }else{
            this.update();
         }
        },
        addprofession() {
            let _this = this;
            console.log("p_name");
            console.log(this.p_name)
            console.log("tag");
            console.log(this.choosetag)
            console.log("paper");
            console.log(this.testpaper);
            if (this.p_name !== '' && this.choosetag.length > 0 && this.testpaper.length > 0) {
                const pt_rate = 100 / this.choosetag.length;
                console.log(pt_rate);
                for (let item of this.choosetag) {
                    let onetag = {
                        tag_id: item,
                        pt_rate: pt_rate,
                    };
                    this.tag.push(onetag);
                }

                this.professiondata = {
                    p_name: this.p_name,
                    testpaper: this.testpaper,
                    tag: this.tag,
                };
                this.$http.post(`http://127.0.0.1:7001/addprofession`, this.professiondata, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        _this.professiondata = {};
                        _this.p_name = '';
                        _this.p_id=-1;
                        _this.testpaper = [];
                        _this.tag = [];
                        _this.choosetag = [];
                        _this.fetch();
                        _this.SuccessVisible2 = true;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                this.dialogVisible = false;
            }else{
                this.WarnVisible2 = true;
                }
        },

        update(){
           let _this = this;
            console.log("p_name");
            console.log(this.p_name)
            console.log("tag");
            console.log(this.choosetag)
            console.log("paper");
            console.log(this.testpaper);
            if (this.p_name !== '' && this.choosetag.length > 0 && this.testpaper.length > 0) {
                const pt_rate = 100 / this.choosetag.length;
                console.log(pt_rate);
                for (let item of this.choosetag) {
                    let onetag = {
                        tag_id: item,
                        pt_rate: pt_rate,
                    };
                    this.tag.push(onetag);
                }

                this.professiondata = {
                    p_id:this.p_id,
                    p_name: this.p_name,
                    testpaper: this.testpaper,
                    tag: this.tag,
                };
                this.$http.post(`http://127.0.0.1:7001/updateprofession`, this.professiondata, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        _this.professiondata = {};
                        _this.p_id = -1;
                        _this.p_name = '';
                        _this.testpaper = [];
                        _this.tag = [];
                        _this.choosetag = [];
                        _this.fetch();
                        _this.SuccessVisible3 = true;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                this.dialogVisible = false;
            }else{
                this.WarnVisible2 = true;
            }
        },
        checkpaper() {
            // let _this = this;
            const newpaper = this.newpaper;
            console.log(this.newpaper);
            console.log(".......");
            var totalscore = newpaper.t_ochoose_num * newpaper.t_ochoose_score + newpaper.t_mchoose_num * newpaper.t_mchoose_score + newpaper.t_judge_num * newpaper.t_judge_score + newpaper.t_fill_num * newpaper.t_fill_score;
            console.log(totalscore);
            if (totalscore !== 100) {
                this.WarnVisible = true;
            } else {
                console.log(typeof newpaper.t_id)
                if(newpaper.t_id === -1){
                    this.dialogFormVisible = false;
                }else{
                    this.updatedialogFormVisible = false;
                };
                const onepaper = {
                    t_ochoose_num: newpaper.t_ochoose_num,
                    t_mchoose_num: newpaper.t_mchoose_num,
                    t_judge_num: newpaper.t_judge_num,
                    t_fill_num: newpaper.t_fill_num,
                    t_squestion_num: newpaper.t_squestion_num,
                    t_code_num: newpaper.t_code_num,
                    t_ochoose_score: newpaper.t_ochoose_score,
                    t_mchoose_score: newpaper.t_mchoose_score,
                    t_judge_score: newpaper.t_judge_score,
                    t_fill_score: newpaper.t_fill_score,
                    t_squestion_score: newpaper.t_squestion_score,
                    t_code_score: newpaper.t_code_score,
                }
                console.log(onepaper);
                this.testpaper.push(onepaper);
                console.log(this.testpaper);
                this.SuccessVisible = true;
                this.turntozero(newpaper);
            }
        },
        canceladdprofession() {
            this.dialogVisible = false;
            this.testpaper = [];
            this.turntozero(this.newpaper);
        },
        canceladdpaper() {
            this.dialogFormVisible = false;
            this.turntozero(this.newpaper);
        },
        handleClose1(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    this.choosetag=[];
                    this.testpaper=[];
                    this.p_name='';
                    this.p_id=-1;
                    done();
                })
                .catch(_ => { });
        },
       handleClose2(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                const newpaper = this.newpaper;
                 const onepaper = {
                    t_ochoose_num: newpaper.t_ochoose_num,
                    t_mchoose_num: newpaper.t_mchoose_num,
                    t_judge_num: newpaper.t_judge_num,
                    t_fill_num: newpaper.t_fill_num,
                    t_squestion_num: newpaper.t_squestion_num,
                    t_code_num: newpaper.t_code_num,
                    t_ochoose_score: newpaper.t_ochoose_score,
                    t_mchoose_score: newpaper.t_mchoose_score,
                    t_judge_score: newpaper.t_judge_score,
                    t_fill_score: newpaper.t_fill_score,
                    t_squestion_score: newpaper.t_squestion_score,
                    t_code_score: newpaper.t_code_score,
                };
                console.log(onepaper);
                this.testpaper.push(onepaper);
                this.turntozero(this.newpaper);  
                    done();
                })
                .catch(_ => { });
        },
      handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {  
                    done();
                })
                .catch(_ => { });
        },
        turntozero(newpaper) {
            newpaper.t_id = -1;
            newpaper.t_ochoose_num = 0;
            newpaper.t_ochoose_score = 0;
            newpaper.t_mchoose_num = 0;
            newpaper.t_mchoose_score = 0;
            newpaper.t_judge_num = 0;
            newpaper.t_judge_score = 0;
            newpaper.t_fill_num = 0;
            newpaper.t_fill_score = 0;
            newpaper.t_squestion_num = 0;
            newpaper.t_code_num = 0;
        },

        removeprofession(index) {
            const _this = this;
            console.log(this.professionlist[index].p_id);
            this.$http.get(`http://127.0.0.1:7001/deleteprofession?p_id=${this.professionlist[index].p_id}`)
                .then(res => {
                    console.log(res);
                    this.professionlist.splice(index, 1);
                })
                .catch(err => {
                    console.log(err);
                });

        },
        updateprofession(index) {
            this.fetch();
            console.log(this.professionlist);
            this.dialogVisible = true;
            this.profession = this.professionlist[index];
            console.log(this.profession);
            this.p_id = this.profession.p_id;
            this.p_name = this.profession.p_name;
            this.testpaper = this.profession.testpaper;
            for (let item of this.profession.tag) {
                this.choosetag.push(item.tag_id);
            }
            console.log(this.choosetag);
        },

        updatetestpaper(index) {
            this.updatedialogFormVisible = true;
            this.newpaper = this.testpaper[index];
            this.testpaper.splice(index,1);
        },
        removetestpaper(index){
            console.log("11111");
            console.log(this.testpaper);
            this.testpaper.splice(index,1);
            console.log(this.professionlist);
        },

    }
}
</script>

<style scoped>
#all{
    padding-top:70px;
}
.label_1{
    height: 36px;
    line-height: 36px;
}
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
.paperarea{
    width: 100%;
    margin-top: 5%;
}
.onetestpaper{
    margin: 5%;
}

.addprofessiondia{
    width: 100%;
}

.score{
    color: #FF4949;
    font-size: larger;
    font-weight: bolder;
    font-style: italic;
    width: 10%;
    margin: auto;
}
</style>
