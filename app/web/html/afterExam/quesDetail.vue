<template>
    <div id="all">
        <div id="container">
            <div id="quesBlock">
                <el-row class="quesBlock-lab">题目：
                    <font class="aux-words">(本题平均正确率：{{QuesDet.CurrentAvg}})</font>
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
                        <i class="layui-icon">&#xe619;</i> 825
                    </button>
                    <button class="layui-btn layui-btn-primary layui-btn-big" style="border:none;">
                        <i class="layui-icon">&#x1006;</i> 举报
                    </button>
                </el-row>
            </div>
            <fieldset class="layui-elem-field layui-field-title">
                <legend>讨论</legend>
                <div class="layui-field-box">
                    <div class="discBlock">
                        <div class="disc">
                            <div>
                                <div class="disc-01">
                                    <div style="height:50px;width:50px;background-color:black;"></div>
                                </div>
                                <div class="disc-02">
                                    <div class="disc-02-1">孤独的码农</div>
                                    <div>2017-07-07 19:19:58</div>
                                </div>
                            </div>
                            <el-row class="disc-1">
                                这么简单的题目我居然做错了，简直是日了狗了。。。
                            </el-row>
                            <button class="layui-btn layui-btn-primary layui-btn-small" style="border:none;">
                                <i class="layui-icon">&#xe619;</i>&nbsp;&nbsp;825
                            </button>
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
            QuesDet: {
                CurrentAvg: '78.24%',
                content: '岁月不饶人是老子说的吗？',
                q_answer: 'F',
                q_analysis: '这种题目我用脚指头想都知道答案肯定是错的，。。好吧其实我还是猜的23333~\n根据百度所知，本句来自宋代诗人吴潜的《如梦令》\n插遍门前杨柳。又是清明时候。岁月不饶人,鬓影星星知否。知否。且尽一杯春酒。',

            }
        }
    },
    components: {

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

#discBlock {
    height: 250px;
}

#container {
    width: 60%;
    margin: 0 auto;
}

.disc {
    padding: 10px 20px;
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
}

.disc-1 {
    clear: both;
    padding-top: 8px;
}

.aux-words {
    color: #A1A1A1;
}

#quesBlock {
    width: 60%;
    margin: 0 auto;
    border: 1px solid #A1A1A1;
    padding: 24px 48px;
}

.quesBlock-con {
    padding-left: 20px;
    margin-bottom: 12px;
}

.quesBlock-lab {
    margin-bottom: 12px;
}
</style>

