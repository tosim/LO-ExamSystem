<template>
  <div class="one-short">
    <div class="topic-title">
      {{examindex+"、"+titleContent}}
    </div>
    <div class="topic-content">
      <el-input type="textarea" :rows="2" placeholder="请输入答案" v-model="chooseanswer"></el-input>
    </div>
  </div>
</template>

<style scoped>
.one-short {
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
}

.topic-content {
  clear: both;
  padding-top: 5px;
  padding-left: 24px;
  padding-bottom: 10px;
  border-bottom: 1px solid #EFEFEF;
  color: #333333;
}

.el-radio-group {
  width: 90%;
}

.el-radio__label {
  font-size: 16px;
}

.el-radio {
  width: 100%;
  line-height: 30px;
  margin-bottom: 2px;
}

.el-radio:hover {
  background: rgb(239, 239, 239);
}

.el-radio+.el-radio {
  margin-left: 0;
}
</style>


<script>
export default {
  props: {
    examindex: {
      default: '1'
    },
    titleContent: {
      default: '以下哪个是并选择器（）'
    }
  },
  data() {
    return {
      singleoptions:
      [{
        value: 1,
        label: "A、item"
      }, {
        value: 2,
        label: "B、span.item"
      }, {
        value: 3,
        label: "C、span,.item"
      }, {
        value: 4,
        label: "D、span .item"
      }],
      chooseanswer: ""
    }
  },
  methods: {
  }
}
</script>

