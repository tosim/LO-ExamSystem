<template>
    <div id="all">
        <div id="container">
            <div id="quesBlock">
                <el-row class="quesBlock-lab">题目：
                    <span class="aux-words">(本题平均正确率：{{QuesDet.CurrentAvg}})</span>
                </el-row>
                <el-row class="quesBlock-con">
                    {{QuesDet.content}}
                </el-row>
                <el-row class="quesBlock-lab">标准答案：</el-row>
                <el-row class="quesBlock-con">
                    {{QuesDet.q_answer}}
                </el-row>
                <el-row class="quesBlock-lab">答案解析：</el-row>
                <el-row class="quesBlock-con">
                    {{QuesDet.q_analysis}}
                </el-row>
                <el-row style="text-align:center;">
                    <button class="layui-btn layui-btn-primary layui-btn-big" style="border:none;">
                        <i class="layui-icon">&#xe600;</i> 收藏
                    </button>
                    <button class="layui-btn layui-btn-primary layui-btn-big" style="border:none;">
                        <i class="layui-icon">&#xe619;</i> {{agreN}}
                    </button>
                    <button class="layui-btn layui-btn-primary layui-btn-big" style="border:none;">
                        <i class="layui-icon">&#x1006;</i> 举报
                    </button>
                </el-row>
            </div>
            <fieldset class="layui-elem-field layui-field-title ">
                <legend>讨论</legend>
                <div class="layui-field-box">
                    <div class="discBlock">
                        <div v-for="(item,index) in taklist" :key="index">
                            <div class="disc">
                                <div>
                                    <div class="disc-01">
                                        <img v-bind:src="item.imgPath" style="height:50px;width:50px;"></img>
                                    </div>
                                    <div class="disc-02">
                                        <div class="disc-02-1">{{item.userName}}</div>
                                        <div style="font-size:12px;color:#7f7f7f;">{{item.time}}</div>
                                    </div>
                                </div>
                                <el-row class="disc-1">
                                    {{item.content}}
                                </el-row>
                                <button class="layui-btn layui-btn-primary layui-btn-small" style="border:none;">
                                    <i class="layui-icon">&#xe619;</i>&nbsp;&nbsp;{{item.agreeNum}}
                                </button>
                            </div>
                            <div class="clipline" v-if="index+1!=taklist.length"></div>
                        </div>
                        <div id="page1"></div>
                        <div>
                            <el-input type="textarea" :rows="5" class="speakBolck" v-model="content" placeholder="我要评论"></el-input>
                            <button class="layui-btn" style="margin-bottom:12px;">提交评论</button>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            totalnum: 2,
            currpage: 1,
            agreN:8,
            content:'',
            QuesDet: {
                CurrentAvg: '78.24%',
                content: '岁月不饶人是老子说的吗？',
                q_answer: 'F',
                q_analysis: '这种题目我用脚指头想都知道答案肯定是错的，。。好吧其实我还是猜的23333~\n根据百度所知，本句来自宋代诗人吴潜的《如梦令》\n插遍门前杨柳。又是清明时候。岁月不饶人,鬓影星星知否。知否。且尽一杯春酒。',

            },
            taklist: [{
                imgPath: '',
                userName: '孤独的码农',
                time: '2017-07-07 19:19:58',
                content: '这么简单的题目我居然做错了，简直是日了狗了。。。',
                agreeNum: 826,
            }, {
                imgPath: '',
                userName: '孤独的码农',
                time: '2017-07-07 19:19:58',
                content: '这么简单的题目我居然做错了，简直是日了狗了。。。',
                agreeNum: 5,
            }, {
                imgPath: '',
                userName: '孤独的码农',
                time: '2017-07-07 19:19:58',
                content: '这么简单的题目我居然做错了，简直是日了狗了。。。',
                agreeNum: 10,
            }, {
                imgPath: '',
                userName: '孤独的码农',
                time: '2017-07-07 19:19:58',
                content: '这么简单的题目我居然做错了，简直是日了狗了。。。',
                agreeNum: 2,
            },],

        }
    },
    components: {

    },
    mounted: function () {
        let _this = this;
        layui.laypage({
            cont: 'page1', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
            pages: _this.totalnum, //通过后台拿到的总页数
            curr: _this.currpage, //当前页
            skin: 'yahei', //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
            jump: function (obj, first) { //触发分页后的回调
                if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                    _this.currpage = obj.curr;
                    // _this.fetchData();
                }
            }
        });
    },
    methods: {

    }
}
</script>

<style scope>
#all {
    width: 80%;
    margin: 0 auto;
    font-size: 16px;
    padding-top: 25px;
    font-family: Microsoft YaHei;
}

.clipline {
    width: 92%;
    /* height: 1px; */
    float: left;
    border-bottom: 1px dotted #DFDFDF;
    /* background-color: ; */
}

body {
    background-color: #eee;
}

.discBlock {
    /* height: 250px;  */
    padding-left:20px;
    background-color: #fff;
}

#container {
    width: 60%;
    margin: 0 auto;
}

.disc {
    padding-top: 18px;
    padding-bottom: 2px;
}

.disc-01 {
    float: left;
}

.disc-02 {
    float: left;
    margin-left: 8px;
}

.disc-02-1 {
    margin-top: 4px;
    margin-bottom: 12px;
    color: #4F99CF;
}

.disc-1 {
    clear: both;
    padding: 12px 0;
}

.aux-words {
    color: #A1A1A1;
    font-size: 12px;
}

#quesBlock {
    margin: 0 auto;
    background-color: #fff;
    padding: 24px 48px;
}

.quesBlock-con {
    padding-left: 20px;
    margin-bottom: 12px;
}

.quesBlock-lab {
    margin-bottom: 12px;
}
.speakBolck{
    width: 92%;
    margin-bottom: 12px;
}
</style>

