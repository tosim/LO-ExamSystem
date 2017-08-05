<template>
  <div class="comexam_all">
    <div class="gray"></div>
    <lo-head></lo-head>
    <div class="comexam_head">
      <div class="head_img">
        <img src="../../asset/images/com_exam.png" alt="head">
      </div>
    </div>
    <div class="comexam_body">
      <div class="comexam_title">
        <span>热门专场</span>
      </div>
      <div class="comexam-bar">
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
      <div class="comexam-main">
        <div class="one-ks" v-for="(item,index) in examList" :key="item.value" @mouseenter="showBtn(index)" @mouseleave="hideBtn">
          <div class="ks-img">
            <img :src="'/public/img/'+item.exam_img" alt="top">
          </div>
          <div class="ks-info">
            <h3>{{item.exam_title}}</h3>
            <div class="exam-detail">
              <div class="exam-date">
                {{item.exam_date}}
              </div>
              <div class="exam-join">
                <span style="color:#25bb9b">{{item.exam_participate}}</span>
                人参加
              </div>
            </div>
          </div>
          <button class="layui-btn layui-btn-small layui-btn-normal look-detail comming-btn" v-show="showbtn==index&&item.type==1" @click="goToExam(item)">立即考试</button>
          <button class="layui-btn layui-btn-small look-detail" v-show="showbtn==index&&item.type==2">即将开始</button>
          <button class="layui-btn layui-btn-small look-detail end-btn" v-show="showbtn==index&&item.type==3">已结束</button>
        </div>
        <div class="clear"></div> 
      </div>
    </div>
  </div>
</template>

<script>
import Head from '../../component/head.vue';
export default {
  mounted:function(){
    this.$http.get(this.domain+'/v1/e_exam/1').then((res)=>{
      res = res.data;
      if(res.success !== 1) return;
      // console.log(res);
      
      this.originList = res.data.map(function(item){
        var time = new Date(item.start_time);
        var tmp = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
        var start = time.getTime();
        var now = new Date().getTime();
        console.log(now);
        console.log('start'+ start);
        var type;
        if(now < start){
          type = 1;
        }else if(now >= start && now <= start + item.last_time*60*1000){
          type = 2;
        }else{
          type = 3;
        }
        return {
          type:type,
          exam_id:item.exam_id,
          exam_img:'head.png',
          exam_title:item.e_name+item.p_name+item.exam_id,
          exam_date:tmp,
          exam_participate:item.participate,
          exam_last:item.last_time
        }
      });
      this.examList = this.originList ;
      console.log(this.examList);
    })
  },
  methods: {
    goToExam(item){
      // console.log(item);
      window.localStorage.examType = 3;
      window.localStorage.examId = item.exam_id;
      window.localStorage.examTitle = item.exam_title;
      window.location.href = '/public/exam.html';

    },
    selected: function (selectLi) {
      this.activeName = selectLi;
      if(selectLi === '正在进行'){
        this.examList = this.originList.filter(function(item){
          var start = new Date(item.exam_date).getTime();
          var now = new Date().getTime();
          return now >= start && now <= (start+item.exam_last);
        })
      }else if(selectLi === '已结束'){
        this.examList = this.originList.filter(function(item){
          var start = new Date(item.exam_date).getTime();
          var now = new Date().getTime();
          return now >= (start+item.exam_last);
        })
      }else if(selectLi === '即将开始'){
        this.examList = this.originList.filter(function(item){
          var start = new Date(item.exam_date).getTime();
          var now = new Date().getTime();
          return now < start;
        })
      }else{
        this.examList = this.originList;
      }
    },
    showBtn: function (index1) {
      this.showbtn = index1;
    },
    hideBtn: function () {
      this.showbtn = -1;
    }
  },
  data() {
    return {
      originList:[{
        exam_img: 'head.png',
        exam_title: '蓝鸥前端开发考试',
        exam_date: '2017/07/25 20:25',
        exam_participate: 119
      },
      {
        exam_img: 'head.png',
        exam_title: '蓝鸥前端开发考试',
        exam_date: '2017/07/25 20:25',
        exam_participate: 119
      },
      {
        exam_img: 'head.png',
        exam_title: '蓝鸥前端开发考试',
        exam_date: '2017/07/25 20:25',
        exam_participate: 119
      },
      {
        exam_img: 'head.png',
        exam_title: '蓝鸥前端开发考试',
        exam_date: '2017/07/25 20:25',
        exam_participate: 119
      },
      {
        exam_img: 'head.png',
        exam_title: '蓝鸥前端开发考试',
        exam_date: '2017/07/25 20:25',
        exam_participate: 119
      }
      ],
      activeName: '全部',
      professionList: [],
      examList:[] ,
      showbtn: -1
    }
  },
  components: {
    'lo-head': Head
  }
}
</script>

<style scoped>
.select a {
  color: #25bb9b !important;
}
.comming-btn:hover {
  background: rgb(75,178,255) !important;
}
.end-btn {
  background: rgb(188,188,188);
}
.end-btn:hover {
  background: rgb(176, 176, 176) !important;
}
.clear {
  clear:both;
}
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
  width: 211px;
  height: 144px;
  overflow: hidden;
  background: #eee;
  display: block;
}

.ks-img img {
  width: 211px;
  height: 144px;
}

.one-ks {
  margin-right: 14px;
  cursor: pointer;
  position: relative;
  float: left;
  width: 211px;
  height: 208px;
  margin: 0 17px 25px 0;
  border: 1px solid #eee;
}
.one-ks:hover {
  border: 1px solid black;
}
.comexam-main {
  margin-top: 40px;
  padding: 20px;
}

.select a {
  color: #25bb9b !important;
}

.comexam-bar {
  float: left;
  padding: 10px;
  font-size: 14px;
}

.comexam-bar ul {
  float: left;
  letter-spacing: -4px;
  white-space: nowrap;
}

.comexam-bar ul li {
  letter-spacing: 0;
  display: inline-block;
  margin-right: 1px;
  position: relative;
  border-right: 1px solid #ededed;
}

.comexam-bar ul li a {
  padding: 0 10px;
  color: #888;
}
.comexam_title {
  line-height: 35px;
  width: 97%;
  margin: 50px auto 0 auto;
  padding: 10px 5px;
  border-bottom: 1px solid rgb(212, 212, 212);
}

.comexam_title span {
  font-family: "微软雅黑Light";
  font-size: 18px;
}

.comexam_title span:before {
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

.comexam_head {
  background-color: rgb(28, 48, 53);
  padding-top: 60px;
}

.head_img {
  height: 200px;
  width: 960px;
  margin: 0 auto 20px;
  position: relative;
}

.gray {
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(238, 238, 238);
  width: 100%;
  height: 100%;
  z-index: -1;
}

.comexam_all {
  background: #eee;
  height: auto;
  min-height: 100%;
}

.comexam_body {
  margin: 0 auto;
  width: 960px;
  background: white;
}
</style>
