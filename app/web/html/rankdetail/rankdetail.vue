<template>
  <div class="rankdetail_all">
    <div class="gray"></div>
    <lo-head></lo-head>
    <div class="rankdetail_head">
      <div class="head_img">
        <img src="../../asset/images/rankhead.png" alt="head">
      </div>
    </div>
    <div class="rankdetail_body">
      <div class="rank_content">
        <div class="rank_box">
          <div class="rankdetail_title">
            <span>{{rank.rankName}}</span>
          </div>
          <div class="rankdetail_main">
            <div class="main_title">
              <ul>
                <li>总榜</li>
              </ul>
              <span style="color: #888;font-size: 14px;margin-top: 10px;float: right;">您的排名：{{rank.myRank}}</span>
            </div>
            <table>
              <tbody>
                <tr>
                  <th width="41">排名</th>
                  <th width="122">用户</th>
                  <th width="41">刷题数</th>
                  <th width="41">{{rank.rankAttribute}}</th>
                </tr>
                <tr v-for="(item,index) in rank.rankData" :key="item.value">
                  <td>
                    <span :class="(index+1)>3?'top-browse':'top'+(index+1)" style="float: none;padding: 1px 6px;font-size: 12px;color:white;">
                      {{(index+1)}}
                    </span>
                  </td>
                  <td>
                    <a href="javascript:void(0)" class="head-pic">
                      <img :src="'/public/img/'+item.u_img" alt="img">
                    </a>
                    <a href="javascript:void(0)" style="display: inline-block;white-space: nowrap;width: 4em;overflow: hidden;text-overflow: ellipsis;}" @click="lookUser(item.u_id)">{{item.u_name}}</a>
                  </td>
                  <td>
                    <span>{{item.doQues_num}}</span>
                  </td>
                  <td>
                    <span>{{item.attribute}}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="rank_bar">
        <div class="rank_box">
          <div class="bar_title">
            <span>榜单查看</span>
          </div>
          <div class="bar_body">
            <ul>
              <li v-for="(item,index) in list" :key="item.value">
                <span :class="index>2?'top-browse':'top'+(index+1)" style="float: none;padding: 1px 6px;font-size: 12px;color:white;">
                  {{index+1}}
                </span>
                <a :href="'/public/rankdetail.html?'+item.query" class="list_hover">
                  {{item.name}}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '../../component/head.vue';
export default {
  data() {
    return {
      rank:{
        rankName: 'web前端开发工程师',
        myRank: '110',
        rankAttribute: '段位',
        rankData: [{
          rank:'1',
          u_img: 'head.png',//这是每个排行榜不同的属性，职业就是段位，标签就是正确率
          u_name: '王小虎',
          brushQuestion_num: '233',
          attribute: '9段'
        },
        {
          rank:'2',
          u_img: 'head.png',//这是每个排行榜不同的属性，职业就是段位，标签就是正确率
          u_name: '王小虎1',
          brushQuestion_num: '233',
          attribute: '9段'
        },
        {
          rank:'3',
          u_img: 'head.png',//这是每个排行榜不同的属性，职业就是段位，标签就是正确率
          u_name: '王小虎2',
          brushQuestion_num: '233',
          attribute: '9段'
        },
        {
          rank:'4',
          u_img: 'head.png',//这是每个排行榜不同的属性，职业就是段位，标签就是正确率
          u_name: '王小虎3',
          brushQuestion_num: '233',
          attribute: '9段'
        },
        {
          rank:'5',
          u_img: 'head.png',//这是每个排行榜不同的属性，职业就是段位，标签就是正确率
          u_name: '王小虎4',
          brushQuestion_num: '233',
          attribute: '9段'
        }],
      },
      list: ["web前端开发工程师", "java工程师", "HTML", "css", "javascript", "java"]
    }
  },
  methods:{
    lookUser(u_id){
      console.log(u_id);
      window.location.href = '/public/look_usercenter.html?u_id='+u_id;
    }
  },
  components: {
    'lo-head': Head,
  },
  mounted:function(){
    this.$http.get(this.domain + '/v1/rank/list')
    .then((res)=>{
      res = res.data;
      if(res.success !== 1) return;
      console.log(res.data);
      this.list = res.data.map(function(item){
        var name = '';
        var query = '';
        if(item.tag_id){
          name = item.tag_name;
          query = 'tag_id='+item.tag_id;
        }else if(item.p_id){
          name = item.p_name;
          query = 'p_id='+item.p_id;
        }else if(item.exam_id){
          name = item.e_name + item.p_name + item.exam_id;
          query = 'exam_id='+item.exam_id;
        }
        
        return {name:name,query:query};
      });
    })
    .then(()=>{
      var url = require('url');
      var query = url.parse(window.location.href,true).query;
      var tag_id = query.tag_id;
      var p_id = query.p_id;
      var exam_id = query.exam_id;
      if(!tag_id && !p_id && !exam_id){
        p_id = 1;
      }
      if(p_id){
        this.$http.get(this.domain + '/v1/rank/single?p_id='+p_id).then((res)=>{
          res = res.data;
          if(res.success!==1) return;
          this.rank = res.data;
          console.log(this.rank);
        })
      }else if(tag_id){
        this.$http.get(this.domain + '/v1/rank/single?tag_id='+tag_id).then((res)=>{
          res = res.data;
          if(res.success!==1) return;
          this.rank = res.data;
          console.log(this.rank);
        })
      }else if(exam_id){
        this.$http.get(this.domain + '/v1/rank/single?exam_id='+exam_id).then((res)=>{
          res = res.data;
          if(res.success!==1) return;
          this.rank = res.data;
          console.log(this.rank);
        })
      }

    })
    
  }
}
</script>

<style scoped>
.head-pic {
  width: 30px;
  height: 30px;
  border-radius: 15px;
}

.head-pic img {
  width: 30px;
  height: 30px;
}

.list_hover {
  margin-left: 10px;
}

.list_hover:hover {
  color: #25bb9b;
}

.bar_body ul li {
  border-bottom: 1px solid #ddd;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
}

.bar_body {
  padding: 20px;
}

.bar_title {
  padding: 15px;
  line-height: normal;
  position: relative;
  height: 26px;
}

.top1 {
  background: #ff6745;
}

.top2 {
  background: #00bc9b;
}

.top3 {
  background: #d4d4d4;
}

.top-browse {
  background: #a4b2ba;
}

table {
  color: #888;
  table-layout: fixed;
  max-width: 100%;
  width: 100%;
  text-align: center;
  border: 1px solid #f0f0f0;
  font-size: 14px;
  border-collapse: collapse;
  border-spacing: 0;
}

tbody {
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
}

tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}

table th {
  background: #EDEDED;
  color: #888;
  padding: 10px;
  font-weight: 400;
}

table td {
  padding: 12px 10px;
  border-bottom: 1px dashed #D9D9D9;
}

.main_title {
  height: 42px;
  background: #FFF;
  border-bottom: 2px solid #00bc9b;
  border-top: none;
}

.main_title ul {
  height: 42px;
  float: left;
  letter-spacing: -4px;
  white-space: nowrap;
}

.main_title ul li {
  width: 68px;
  height: 42px;
  background: #00bc9b;
  color: #FFF;
  letter-spacing: 0;
  display: inline-block;
  margin-right: 1px;
  position: relative;
  line-height: 42px;
  text-align: center;
}

.rankdetail_main {
  padding: 20px;
}

.rankdetail_title span,
.bar_title span {
  font-size: 16px;
  line-height: 16px;
  float: left;
  font-weight: 700;
  white-space: nowrap;
}

.rankdetail_title span:before,
.bar_title span:before {
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

.rankdetail_title {
  padding: 15px;
  height: 26px;
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

.rank_box {
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  margin-bottom: 10px;
  background: #fff;
}

.rank_content {
  float: left;
  width: 690px;
  margin: 0 10px 0 0;
}

.rank_bar {
  width: 260px;
  float: left;
}

.rankdetail_all {
  background: #eee;
  height: auto;
  min-height: 100%;
}

.rankdetail_body {
  margin: 0 auto;
  width: 960px;
  padding-bottom: 250px;
}

.rankdetail_head {
  background-color: #f6a4b0;
  padding-top: 60px;
}
</style>
