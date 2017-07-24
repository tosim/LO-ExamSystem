<template>
  <div class="one-judgment">
    <div class="topic-title">
      {{examindex+"、"+titleContent}}
    </div>
    <div class="topic-content">
      <el-radio-group v-model="chooseanswer">
        <el-radio v-for="singleoption in singleoptions" :key="singleoption.value" :label="singleoption.label" :value="singleoption.value"></el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<style scoped>
.one-judgment {
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
  padding-bottom: 2px;
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
        label: "A、对"
      }, {
        value: 2,
        label: "B、错"
      }],
      chooseanswer: ""
    }
  },
  methods: {
  }
}
</script>

