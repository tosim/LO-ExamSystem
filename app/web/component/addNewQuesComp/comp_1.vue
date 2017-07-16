<template>
    <div>
        <el-row :span="24" class="row-1">
            <el-col :span="12">
                <div class="layui-form-item">
                    <label class="layui-form-label">试题类型</label>
                    <div class="layui-input-block">
                        <el-select v-model="value" placeholder="请选择" style="width:100%;">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="layui-form-item">
                    <label class="layui-form-label">所属目录</label>
                    <div class="layui-input-block">
                        <el-input v-model="Catalog" placeholder="请选择试题分类"></el-input>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :span="24" class="row-1">
            <el-col :span="12">
                <div class="layui-form-item">
                    <label class="layui-form-label">试题分数</label>
                    <div class="layui-input-block">
                        <el-input v-model="fraction" placeholder="请输入分数"></el-input>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="layui-form-item">
                    <label class="layui-form-label">难度</label>
                    <div class="layui-input-block">
                        <el-select v-model="tes" placeholder="请选择难度" style="width:100%;">
                            <el-option v-for="i in difficulty" :key="i.value" :label="i.label" :value="i.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :span="24" class="row-2">
            <div class="layui-form-item">
                <label class="layui-form-label">试题内容</label>
                <div class="layui-input-block">
                    <el-input type="textarea" :rows="5" class="textarea-1" id="textarea_1"></el-input>
                </div>
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fraction: 0,
            value: '',
            tes: '',
            Catalog: '',
            options: [{
                value: '1',
                label: '单选题'
            }, {
                value: '2',
                label: '多选题'
            }, {
                value: '3',
                label: '判断题'
            }, {
                value: '4',
                label: '填空题'
            }, {
                value: '5',
                label: '简答题'
            }, {
                value: '6',
                label: '编程题'
            }],
            difficulty: [{
                value: '1',
                label: '简单'
            }, {
                value: '2',
                label: '中等'
            }, {
                value: '3',
                label: '稍难'
            }, {
                value: '4',
                label: '困难'
            }],

        }
    }
}
</script>

<style>

</style>
