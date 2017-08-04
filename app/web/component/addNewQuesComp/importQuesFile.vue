<template>
    <div>
        <div id="dial">
            <div id="cont">
                <div class="layui-form-item">
                    <label class="layui-form-label">下载模板</label>
                    <div class="layui-input-block cent">
                        <button class="layui-btn layui-btn-small layui-btn-primary">Word模板</button>
                    </div>
                </div>
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
                    <label class="layui-form-label">试题文件</label>
                    <div class="layui-input-block">
                        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传doc文件，且不超过9MB</div>
                        </el-upload>
                    </div>
                </div>
                <el-row>
                    <div class="layui-form-item">
                        <el-input type="textarea" :rows="7" v-model="cont"></el-input>
                    </div>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }
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
            fileList: [{
                name: 'food.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }, {
                name: 'food2.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }],
            cont: '',
        }
    }
}
</script>

<style>
.cent {
    padding-top: 5px;
}
</style>

