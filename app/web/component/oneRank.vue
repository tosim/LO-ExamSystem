<template>
  <div class="one_rank">
    <div class="onerank_title">
      <span>{{rankName}}</span>
    </div>
    <div class="onerank_main">
      <div class="onerank_body">
        <table>
          <tbody>
            <tr>
              <td width="61">排行</td>
              <td width="132">用户</td>
              <td width="77">{{rankAttribute}}</td>
            </tr>
            <tr v-for="(item,index) in rankData" :key="index">
              <td width="61">
                <span :class="'top'+(index+1)" style="float: none;padding: 1px 6px;font-size: 12px;color:white;">
                  {{index+1}}
                </span>
              </td>
              <td width="132">
                <a href="javascript:void(0)" class="head-pic">
                  <img :src="'/public/img/'+myImg" alt="img">
                </a>
                <a href="javascript:void(0)" style="display: inline-block;white-space: nowrap;width: 4em;overflow: hidden;text-overflow: ellipsis;}">{{item.u_name}}</a>
              </td>
              <td width="77">{{item.attribute}}</td>
            </tr>
            <!--  用户自己的排行  -->
            <tr>
              <td width="61">
                <span class="top1" style="float: none;padding: 1px 6px;font-size: 12px;color:white;">
                  {{myRank}}
                </span>
              </td>
              <td width="132">
                <a href="javascript:void(0)" class="head-pic">
                  <img :src="'/public/img/'+myImg" alt="img">
                </a>
                <a href="javascript:void(0)" style="display: inline-block;white-space: nowrap;width: 4em;overflow: hidden;text-overflow: ellipsis;}">{{myName}}</a>
              </td>
              <td width="77">{{myAttribute}}</td>
            </tr>
          </tbody>
        </table>
        <a href="#" class="lookAll">查看全部榜单 ></a>
      </div>
      <div class="look_more">
        <a href=""></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'rankName',
    'rankAttribute',//这是每个排行榜不同的属性，职业就是段位，标签就是正确率
    'myRank',
    'myImg',
    'myName',
    'myAttribute',//这是段位分，要转换成段位显示
    'rankData' 
  ],
  mounted:function(){

  }
}
</script>

<style scoped>

.lookAll {
  background: #d0d0d0;
  color: #fff;
  display: block;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  text-align: center;
}

.lookAll:hover {
  color: #25bb9b;
}

.head-pic {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: block;
  float: left;
  margin-right: 10px;
  overflow: hidden;
}

.head-pic img {
  width: 30px;
  height: 30px;
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

.top4,
.top5 {
  background: #a4b2ba;
}

.one_rank {
  float: left;
  width: 270px;
  margin: 0 50px 20px 0;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  background: #fff;
}

.onerank_title {
  height: 16px;
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
}

table {
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

table td {
  padding: 12px 10px;
  border-bottom: 1px dashed #D9D9D9;
}

.onerank_title span {
  font-size: 16px;
  line-height: 16px;
  float: left;
  font-weight: 700;
  white-space: nowrap;
}

.onerank_title span:before {
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


