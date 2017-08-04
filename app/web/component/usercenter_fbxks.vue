<template>
  <div>
    <div class="fbxks-all">
      <div class="fbxks-title">
        <span>发布新考试</span>
      </div>
      <div class="fbxks-body">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
  },
  data() {
  }
}
</script>


<style scoped>
.fbxks-all {
  width: 90%;
  margin: 0 auto;
}

.fbxks-title {
  line-height: 35px;
  width: 90%;
  margin: 50px auto 0 auto;
  padding: 10px 5px;
  border-bottom: 1px solid rgb(212, 212, 212);
}

.fbxks-body {
  font-size: 15px;
  width: 90%;
  margin: 0 auto;
  padding: 10px;
}

.fbxks-title span {
  font-family: "微软雅黑Light";
  font-size: 18px;
}
.fbxks-title span::before {
  background: #FF6547;
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 5px;
  margin-bottom: 2px;
  vertical-align: middle;
  border-radius: 4px;
}
</style>

