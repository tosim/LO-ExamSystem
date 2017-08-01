<template>
  <div class="ksjl-all">
    <div class="ksjl-title">
      <span>考试记录总数（{{ksjl_num}}）</span>
    </div>
    <div class="ksjl-filter">
      <el-row>
        <el-col :span="8">
          <div class="filter-left">
            <span>排序：</span>
            <el-select v-model="filter_onetime" @change="sor()" placeholder="请选择排序方式">
              <el-option label="日期由近至远" value=-1 ></el-option>
              <el-option label="日期由远至近" value=1 ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="ksjl-body">
      <el-row :gutter="20">
        <el-col :span="8" v-for="item in ksjl" :key="item.value" >
          <div class="oneksjl" @click="goToDetail(item.h_id)">
            <div class="oneksjl-top">
              {{item.h_title}}
            </div>
            <div class="oneksjl-center">
              <span>{{item.h_tag + item.h_title}}</span>
            </div>
            <div class="oneksjl-bottom">
              <div class="oneksjl-bottom-t">
                <i class="layui-icon" style="color:gray !important;">&#xe60e;</i>
                <span>考试时间：{{item.h_date}}</span>
              </div>
              <div class="oneksjl-bottom-b">
                <i class="layui-icon" style="color:gray !important;">&#xe600;</i>
                <span>得分：{{item.h_grade}}</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- <el-table :data="ksjl" style="width: 100%">
                    <el-table-column label="考试时间">
                      {{ksjl.beginTime}}---{{ksjl.endTime}}
                    </el-table-column>
                    <el-table-column label="考试类型">
                      {{ksjl.from}}
                    </el-table-column>
                    <el-table-column label="查看" width="220">
                      <a href="" class="el-button">查看详情</a>
                    </el-table-column>
                  </el-table> -->
    </div>
  </div>
</template>

<script>
export default {
  props:['uid'],
  mounted:function(){
    this.$http.get(this.domain + '/v1/examhistory?u_id='+this.uid).then((res)=>{
      res = res.data;
      if(res.success === 1){
        this.ksjl = res.data;
        for(let i in this.ksjl){
          this.ksjl[i].h_tag = this.ksjl[i].h_tag.toUpperCase();
          var time = new Date(this.ksjl[i].h_date);
          this.ksjl[i].h_date = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate();
        }
        this.ksjl_num = this.ksjl.length;
      }
    })
  },
  data() {
    return {
      begin_date: '',
      end_date: '',
      filter_onetime: '',
      ksjl_num: 1,
      ksjl: [
      ]
    }
  },
  methods:{
    sor(){
      // console.log('change');
      // console.log(this.filter_onetime);
      var v = this.filter_onetime;
      function getcmp(v){

        return function(a,b){
          if(a.h_date > b.h_date){
            return v;
          }else if(a.h_date < b.h_date){
            return -1*v;
          }else{
            return 0;
          }
        }

      }
      this.ksjl.sort(getcmp(v));
      // console.log(this.ksjl);
    },
    goToDetail(h_id){
      window.location.href = '/public/afterExam.html?h_id='+h_id;
      // console.log(h_id);
    }
  }
}
</script>

<style scoped>
.oneksjl {
  width: 100%;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  padding: 15px 0;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 10px;
  height: 240px;
}

.oneksjl:hover {
  color: rgb(170, 193, 155);
  border-color: #9c9c9c;
}

.oneksjl-top {
  height: 60px;
  overflow: hidden;
  padding: 0 25px;
  text-align: center;
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.8;
}

.oneksjl-center {
  background: #dec78f;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: #fff;
  margin-bottom: 8px;
}

.oneksjl-bottom {
  font-size: 13px;
  padding: 0 15px;
}

.oneksjl-bottom-t,.oneksjl-bottom-b {
  height: 30px;
  line-height: 30px;
}

.block {
  float: left;
}

.ksjl-all {
  width: 90%;
  margin: 0 auto;
}

.filter-left {
  float: left;
}

.filter-right {
  margin-left: 40%;
  float: left;
}

.filter-right span {
  float: left;
}

.ksjl-title {
  line-height: 35px;
  width: 90%;
  margin: 50px auto 0;
  padding: 10px 5px;
  border-bottom: 1px solid rgb(212, 212, 212);
}

.ksjl-title span {
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  white-space: nowrap;
}

.ksjl-filter {
  width: 89%;
  margin: 0 auto;
  overflow: hidden;
  background: #f5f5f5;
  padding: 15px 10px 10px;
}

.ct-filter a {
  border-radius: 12px;
  border: 1px solid #eaeaea;
  display: inline-block;
  padding: 2px 10px;
  color: #333;
  font-size: 12px;
  margin-right: 2px;
  background: #FFF;
  margin-bottom: 5px;
  line-height: 16px;
  position: relative;
}

.filter-left {
  margin-bottom: 10px;
}

.ksjl-body {
  width: 770px;
  margin: 10px auto;
}
</style>
