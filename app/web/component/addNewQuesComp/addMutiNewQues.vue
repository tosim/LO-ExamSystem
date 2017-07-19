<template>
    <div>
        <div id="dial">
            <div id="cont">
                <div class="layui-form-item">
                    <label class="layui-form-label">题目标签</label>
                    <div class="layui-input-inline">
                        <el-select v-model="Catalog" multiple filterable required placeholder="请选择试题标签" style="width:100%;">
                            <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="layui-form-mid layui-word-aux">如果导入的试题中没有指定标签，将使用此处的标签作为默认</div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">快速模板</label>
                    <div class="layui-input-block cent">
                        <button class="layui-btn layui-btn-small layui-btn-primary">单选题</button>
                        <button class="layui-btn layui-btn-small layui-btn-primary">多选题</button>
                        <button class="layui-btn layui-btn-small layui-btn-primary">判断题</button>
                        <button class="layui-btn layui-btn-small layui-btn-primary">填空题</button>
                        <button class="layui-btn layui-btn-small layui-btn-primary">简答题</button>
                        <button class="layui-btn layui-btn-small layui-btn-primary">编程题</button>
                    </div>
                </div>
                <el-row>
                    <div class="layui-form-item">
                        <el-input type="textarea" :rows="11" v-model="cont"></el-input>
                    </div>
                </el-row>
                <div class="layui-form-item">
                    <el-input type="textarea" :rows="5" v-model="checkAs"></el-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    methods: {

    },
    data() {
        return {
            Catalog: [],
            options5: [{
                label: 'html',
                value: '5001'
            }, {
                label: 'css',
                value: '5002'
            }, {
                label: 'javascript',
                value: '5003'
            }],
            cont: "(题型:单选题)(标准答案:A)(分数:5)(试题分析:无)\n公益性文化事业是保障公民及泵文化权益的重要途径。大力发展公益性文化事业，始终坚持放在首位的是（ ）\nA.繁荣文化市场\nB.经济效益\nC.社会效益\nD.创新文化体制",
            checkAs:"检查完毕\n数据格式检查成功数：5 道试题\n数据格式检查失败数：0 道试题\n点击”导入“按钮，将执行导入操作。"
        }
    }
}
</script>

<style>
.cent {
    padding-top: 5px;
}
</style>

