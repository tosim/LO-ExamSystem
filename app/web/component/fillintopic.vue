<template>
  <div class="one-fillin">
    <div class="topic-title">
      {{examindex+"、"+titleContent}}
    </div>
    <div class="topic-content">
      <div v-for="item in airNum" :key="item.value">
        第{{item}}空：
        <el-input placeholder="请输入内容" style="margin-top:10px;width:80%" :value="answer"></el-input>
      </div>
    </div>
  </div>
</template>

<style scoped>
.one-fillin {
  border: 2px solid white;
  padding: 4px;
  clear: both;
  margin: 2px auto 25px;
  width: 96%;
  height: auto;
}

.topic-title {
  padding-top: 2px;
  font-size: 16px;
  color: #444444;
  font-weight: bold;
  height: auto;
  line-height: 20px;
  margin-bottom: 8px;
  padding-bottom: 2px;
  border-bottom: 1px solid #EFEFEF;
}
</style>


<script>
export default {
  props: {
    examindex: {
      default: '1'
    },
    titleContent: {
      default: '以下哪个是并___选择器（）___'
    },
    answer: []
  },
  data() {
    return {
      chooseanswer: "",
      airNum: 1,
    }
  },
  methods: {
  },
  created() {
    this.airNum = (this.titleContent.split('___')).length - 1;
  }
}
</script>

