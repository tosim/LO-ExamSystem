<template>
  <div class="one_comment">
    <div class="comment_title">
      <a :href="userLink" class="user_img"></a>
      <a :href="userLink" class="user_name">{{userName}}</a>
    </div>
    <div class="comment_main">
      <div class="comment_content">
        {{commentContent}}
      </div>
      <div class="comment_legend">
        <span>{{commentDate}}</span>
        <a href="javascript:void(0)" style="float: right;color: #21a88b;margin-left: 15px;">点赞({{zanNum}})</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userLink: '',
    userImg: '',
    userName: '',
    commentContent: '',
    commentDate: '',
    zanNum: ''
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.comment_main {
  padding-left: 50px;
}

.comment_legend {
  margin-top: 10px;
  color: #999;
  font-size: 12px;
}

.comment_content {
  color: #666;
  font-size: 14px;
  line-height: 2;
}

.one_comment {
  border-bottom: 1px solid #E0E0E0;
  padding-bottom: 15px;
  position: relative;
  padding-top: 15px;
}

.comment_title {
  margin-bottom: 10px;
  height: 30px;
  line-height: 30px;
}

.user_img {
  width: 30px;
  height: 30px;
  display: block;
  float: left;
  border: 1px solid #EDEDED;
  overflow: hidden;
  margin-right: 15px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
}

.user_name {
  color: #f2cf2e!important;
  font-size: 14px;
  vertical-align: middle;
  display: inline-block;
  line-height: 30px;
}
</style>


