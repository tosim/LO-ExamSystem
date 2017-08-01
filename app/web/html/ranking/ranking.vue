<template>
  <div class="ranking_all">
    <div class="gray"></div>
    <lo-head></lo-head>
    <div class="rank_head">
      <div class="head_img">
        <img src="../../asset/images/rankhead.png" alt="head">
      </div>
    </div>
    <div class="ranking_body">
      <div style="margin-right:-50px;">
        <one-rank v-for="item in rankList" v-if="item.rankData.length > 0" :key="item.rankName" :rankName="item.rankName" :rankAttribute="item.rankAttribute" :myRank="item.myRank" :myImg="item.myImg" :myName="item.myName" :myAttribute="item.myAttribute" :rankData="item.rankData"></one-rank>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '../../component/head.vue';
import OneRank from '../../component/oneRank.vue';
export default {
  data() {
    return {
      rankList: [{
        rankName: 'web前端工程师',
        rankAttribute: '段位',//这是每个排行榜不同的属性，职业就是段位，标签就是正确率
        myRank: '110',
        myImg: 'head.png',
        myName: '我',
        myAttribute: '100',//这是段位分，要转换成段位显示
        rankData: [{
          
          userImg: 'head.png',
          userName: '王小虎',
          attribute: '1000'//这是段位分，要转换成段位显示
        },
        {
          
          userImg: 'head.png',
          userName: '王小虎',
          attribute: '1000'//这是段位分，要转换成段位显示
        },
        {
          
          userImg: 'head.png',
          userName: '王小虎',
          attribute: '1000'//这是段位分，要转换成段位显示
        },
        {
          
          userImg: 'head.png',
          userName: '王小虎',
          attribute: '1000'//这是段位分，要转换成段位显示
        },
        {
          
          userImg: 'head.png',
          userName: '王小虎',
          attribute: '1000'//这是段位分，要转换成段位显示
        }]
      },
      {
        rankName: 'java工程师',
        rankAttribute: '段位',//这是每个排行榜不同的属性，职业就是段位，标签就是正确率
        myRank: '110',
        myImg: 'head.png',
        myName: '我',
        myAttribute: '100',//这是段位分，要转换成段位显示
        rankData: [{
          
          userImg: 'head.png',
          userName: '王小虎',
          attribute: '1000'//这是段位分，要转换成段位显示
        },
        {
          
          userImg: 'head.png',
          userName: '王小虎',
          attribute: '1000'//这是段位分，要转换成段位显示
        },
        {
          
          userImg: 'head.png',
          userName: '王小虎',
          attribute: '1000'//这是段位分，要转换成段位显示
        },
        {
          
          userImg: 'head.png',
          userName: '王小虎',
          attribute: '1000'//这是段位分，要转换成段位显示
        },
        {
          
          userImg: 'head.png',
          userName: '王小虎',
          attribute: '1000'//这是段位分，要转换成段位显示
        }]
      }]
    }
  },
  components: {
    'lo-head': Head,
    'one-rank': OneRank
  },
  mounted:function(){
    this.$http.get(this.domain + '/v1/rank').then((res)=>{
      res = res.data;
      console.log(res.data);
      if(res.success === 1){
        this.rankList = res.data;
      }
    })
  }
}
</script>

<style scoped>
.rank_head {
  background-color: #f6a4b0;
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

.ranking_all {
  background: #eee;
  height: auto;
  min-height: 100%;
}

.ranking_body {
  margin: 0 auto;
  width: 960px;
  padding-bottom: 250px;
}
</style>
