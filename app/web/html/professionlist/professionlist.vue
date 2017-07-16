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
    </div>
</template>

<script>
import Head from "component/head.vue";
export default {
    data() {
        return {
            professionlist: [],
            totalnum: 0,
            currpage: 1,
        }
    },
    components: {
        "lo-head": Head
    },
  mounted: function () {
       this.fetch(); 
    },
    computed: {
        lists() {
            return this.professionlist;
        }
    },
    methods: {
       fetch(){
            this.$http.get(`http://127.0.0.1:7001/getprofessionlist?page=${this.currpage}`).then(res => {
                   console.log(res)
                    this.totalnum = res.data.data.totalnum;
                    this.professionlist = res.data.data.professionlist;
                    console.log(res.data.data.professionlist);
                    console.log(this.professionlist)
                   layui.laypage({
                        cont: 'page1', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                        pages: this.totalnum, //通过后台拿到的总页数
                        curr: this.currpage , //当前页
                        skin: 'yahei', //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                        jump: function (obj, first) { //触发分页后的回调
                            if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                                this.currpage = obj.curr;
                                console.log(this.currpage);
                                fetch();
                            }
                        }
                    });
            })
        },
    }

}
</script>

<style>

</style>
