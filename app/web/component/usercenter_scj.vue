<template>
  <div class="scj-all">
    <div class="scj-title">
      <span>收藏题目总数（{{scj_num}}）</span>
    </div>
    <div class="scj-filter">
      <div class="filter-type">
        <!--  如果被选中，触发ajax同时，将按钮的class换成filteritem-select  -->
        <span style="font-weight:700">题型：</span>
        <a href="javascript:void(0)" v-for="item in type" :key="item.value" class="filteritem">{{item}}</a>
      </div>
      <div class="filter-tags">
        <span style="font-weight:700">类型：</span>
        <!--  如果被选中，触发ajax同时，将按钮的class换成filteritem-select  -->
        <a href="javascript:void(0)" v-for="item in tags" :key="item.value" class="filteritem">{{item}}</a>
      </div>
    </div>
    <div class="scj-body">
      <el-table :data="scj" style="width: 100%">
        <el-table-column prop="name" label="题目">
        </el-table-column>
        <el-table-column prop="knowledge" label="知识点" width="180">
        </el-table-column>
        <el-table-column prop="from" label="来自" width="180">
        </el-table-column>
        <el-table-column label="查看" width="180">
          <template scope="scope">
            <el-button style="margin-top:2px;" class="layui-btn layui-btn-small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scj_num: 1,
      type: ["单选题", "多选题", "填空题", "判断题", "简答题", "编程题"],
      tags: ["html", "css", "javascript"],
      scj: [
        {
          name: "以下哪个是并选择器（ ）",
          knowledge: "HTML/CSS",
          from: "HTML/CSS专项练习"
        },
        {
          name: " 浏览器在一次 HTTP 请求中，需要传输一个 4097 字节的文本数据给服务端，可以采用那些方式?",
          knowledge: "HTML/CSS",
          from: "HTML/CSS专项练习"
        }
      ]
    }
  }
}
</script>

<style scoped>
.scj-all {
  width: 90%;
  margin: 0 auto;
}

.scj-title {
  line-height: 35px;
  width: 90%;
  margin: 50px auto 0;
  padding: 10px 5px;
  border-bottom: 1px solid rgb(212, 212, 212);
}

.scj-title span {
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  white-space: nowrap;
}

.scj-filter {
  width: 89%;
  margin: 0 auto;
  overflow: hidden;
  background: #f5f5f5;
  padding: 15px 10px 10px;
}

.scj-filter a {
  border-radius: 12px;
  border: 1px solid #eaeaea;
  display: inline-block;
  padding: 2px 10px;
  color: #333;
  font-size: 12px;
  margin-right: 2px;
  background: #FFF;
  margin-bottom: 5px;
  line-height: 16px;
  position: relative;
}

.filter-type {
  margin-bottom: 10px;
}

.filteritem:hover {
  border-color: #1abc9c;
  color: #25bb9b;
}

.filteritem-select {
  background: #1abc9c;
  border-color: #1abc9c;
  color: #FFF;
}

.scj-body {
  width: 90%;
  margin: 10px auto;
}
</style>
