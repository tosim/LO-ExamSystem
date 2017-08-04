<template>
  <div>
    <div class="lsfbks-all">
      <div class="lsfbks-title">
        <span>考试信息查询</span>
      </div>
      <div class="lsfbks-body">
        <div class="lsfbks-bar">
          <ul>
            <li @click="selected('全部')" :class="{select: activeName == '全部'}">
              <a href="javascript:void(0)">全部</a>
            </li>
            <li @click="selected('正在进行')" :class="{select: activeName == '正在进行'}">
              <a href="javascript:void(0)">正在进行</a>
            </li>
            <li @click="selected('已结束')" :class="{select: activeName == '已结束'}">
              <a href="javascript:void(0)">已结束</a>
            </li>
            <li @click="selected('即将开始')" :class="{select: activeName == '即将开始'}">
              <a href="javascript:void(0)">即将开始</a>
            </li>
            <li v-for="item in professionList" :key="item.value" @click="selected(item)" :class="{select: activeName == item}">
              <a href="javascript:void(0)">{{item}}</a>
            </li>
          </ul>
        </div>
        <div class="lsfbks-main">
          <div class="one-ks" v-for="(item,index) in examList" :key="item.value" @mouseenter="showBtn(index)" @mouseleave="hideBtn">
            <div class="ks-img">
              <img :src="'../asset/images/'+item.examImg" alt="top">
            </div>
            <div class="ks-info">
              <h3>{{item.examName}}</h3>
              <div class="exam-detail">
                <div class="exam-date">
                  {{item.examDate}}
                </div>
                <div class="exam-join">
                  <span style="color:#25bb9b">{{item.joinNum}}</span>
                  人参加
                </div>
              </div>
            </div>
            <button class="layui-btn layui-btn-small look-detail" v-show="showbtn==index">查看详情</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    selected: function (selectLi) {
      this.activeName = selectLi;
    },
    showBtn: function(index1) {
      this.showbtn = index1;
    },
    hideBtn: function() {
      this.showbtn = -1;
    }
  },
  data() {
    return {
      activeName: '全部',
      professionList: ["web前端开发工程师", "java工程师"],
      examList: [{
        examImg: 'head.png',
        examName: '蓝鸥前端开发考试',
        examDate: '2017/07/25 20:25',
        joinNum: 119
      },
      {
        examImg: 'head.png',
        examName: '蓝鸥前端开发考试',
        examDate: '2017/07/25 20:25',
        joinNum: 119
      },
      {
        examImg: 'head.png',
        examName: '蓝鸥前端开发考试',
        examDate: '2017/07/25 20:25',
        joinNum: 119
      },
      {
        examImg: 'head.png',
        examName: '蓝鸥前端开发考试',
        examDate: '2017/07/25 20:25',
        joinNum: 119
      },
      {
        examImg: 'head.png',
        examName: '蓝鸥前端开发考试',
        examDate: '2017/07/25 20:25',
        joinNum: 119
      }
      ],
      showbtn: -1
    }
  }
}
</script>


<style scoped>
.look-detail {
  position: absolute;
  bottom: 10px;
  right: 10px;
  opacity: 1;
}
.look-detail:hover {
  background: rgb(0,176,145);
}
.exam-detail {
  font-size: 12px;
  height: 18px;
}
.exam-date {
  height: 18px;
  line-height: 18px;
}
.exam-join {
  float: right;
  height: 18px;
}

.ks-info {
  padding: 10px;
}

.ks-info h3 {
  font-size: 14px;
  margin-bottom: 5px;
  overflow: hidden;
  width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
  word-wrap: normal;
}

.exam-date {
  float: left;
  background: url(//static.nowcoder.com/images/img/icons/icon-topic.png) 0 2px no-repeat;
  padding-left: 20px;
}

.ks-img {
  width: 237px;
  height: 161px;
  overflow: hidden;
  background: #eee;
  display: block;
}

.ks-img img {
  width: 237px;
  height: 161px;
}

.one-ks {
  margin-right: 14px;
  cursor: pointer;
  position: relative;
  float: left;
  width: 237px;
  height: 225px;
  margin: 0 18px 25px 0;
  border: 1px solid #eee;
}
.one-ks:hover {
  border: 1px solid black;
}
.lsfbks-main {
  margin-top: 40px;
  padding: 20px;
}

.select a {
  color: #25bb9b !important;
}

.lsfbks-bar {
  float: left;
  padding: 10px;
  font-size: 14px;
}

.lsfbks-bar ul {
  float: left;
  letter-spacing: -4px;
  white-space: nowrap;
}

.lsfbks-bar ul li {
  letter-spacing: 0;
  display: inline-block;
  margin-right: 1px;
  position: relative;
  border-right: 1px solid #ededed;
}

.lsfbks-bar ul li a {
  padding: 0 10px;
  color: #888;
}

.lsfbks-all {
  width: 90%;
  margin: 0 auto;
}

.lsfbks-title {
  line-height: 35px;
  width: 90%;
  margin: 50px auto 0 auto;
  padding: 10px 5px;
  border-bottom: 1px solid rgb(212, 212, 212);
}

.lsfbks-body {
  font-size: 15px;
  width: 90%;
  margin: 0 auto;
  padding: 10px;
}

.lsfbks-title span {
  font-family: "微软雅黑Light";
  font-size: 18px;
}

.lsfbks-title span::before {
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


