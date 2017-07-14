<template>
  <div id="all">
      <div>
        <el-row :span="24" class="row-1">
            <el-col :span="12">
                <el-col class="inputer-1" :span="12">试题类型</el-col>
                    <el-col :span="12">
                        <el-select v-model="value" placeholder="请选择" class="inputer-2">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
            </el-col>
            <el-col :span="12">
                <el-col  class="inputer-1" :span="12">所属目录</el-col>
                <el-col :span="12">
                    <el-input  v-model="Catalog" placeholder="请选择试题分类" class="inputer-2"></el-input>
                </el-col>
            </el-col>
        </el-row>
        <el-row :span="24" class="row-1">
            <el-col :span="12">
                <el-col :span="12" class="inputer-1" >试题分数</el-col>
                <el-col :span="12"><el-input v-model="fraction" placeholder="请输入分数" class="inputer-2"></el-input></el-col>
            </el-col>
            <el-col :span="12">
                <el-col :span="12" class="inputer-1">难度</el-col>
                <el-col :span="12">
                    <el-select v-model="tes" placeholder="请选择难度" class="inputer-2">
                        <el-option
                        v-for="i in difficulty"
                        :key="i.value"
                        :label="i.label"
                        :value="i.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>
        </el-row>
      </div>
    
  </div>
</template>

<script>
export default {
 data() {
      return {
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
          label: '问答题'
        }, {
          value: '6',
          label: '编程题'
        }],
        difficulty:[{
          value: '1',
          label: '简单'
        },{
          value: '2',
          label: '中等'
        },{
          value: '3',
          label: '稍难'
        },{
          value: '4',
          label: '困难'
        }],
        value: '',
        tes: '',
        Catalog:'',
        fraction:0,
      }
    }
}
</script>

<style>
  #all{width: 650px;margin: 0 auto;font-size: 16px;padding-top: 25px;
  font-family: Microsoft YaHei;}
  .inputer-2{width: 250px;}
  .inputer-1{width: 70px;line-height: 36px;}
  .row-1{margin-bottom: 12px;}
</style>
