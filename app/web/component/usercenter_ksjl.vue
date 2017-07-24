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
            <el-select v-model="filter_onetime" placeholder="请选择排序方式">
              <el-option label="日期由近至远" value="neartofar"></el-option>
              <el-option label="日期由远至近" value="fartonear"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="ksjl-body">
      <el-row :gutter="20">
        <el-col :span="8" v-for="item in ksjl" :key="item.value">
          <div class="oneksjl">
            <div class="oneksjl-top">
              {{item.title}}
            </div>
            <div class="oneksjl-center">
              <span v-if="item.type==1">随机训练</span>
              <span v-if="item.type==2">专项训练</span>
              <span v-if="item.type==3">企业考试</span>
            </div>
            <div class="oneksjl-bottom">
              <div class="oneksjl-bottom-t">
                <i class="layui-icon" style="color:gray !important;">&#xe60e;</i>
                <span>完成时间：{{item.endtime}}</span>
              </div>
              <div class="oneksjl-bottom-b">
                <i class="layui-icon" style="color:gray !important;">&#xe600;</i>
                <span>得分：{{item.score}}</span>
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
  data() {
    return {
      begin_date: '',
      end_date: '',
      filter_onetime: '',
      ksjl_num: 1,
      ksjl: [
        {
          type: 1,
          title: "HTML专项训练",
          endtime: "2017-07-15",
          score: 99,
        },
        {
          type: 1,
          title: "HTML专项训练",
          endtime: "2017-07-15",
          score: 99,
        },
        {
          type: 1,
          title: "HTML专项训练",
          endtime: "2017-07-15",
          score: 99,
        },
        {
          type: 1,
          title: "HTML专项训练",
          endtime: "2017-07-15",
          score: 99,
        },
        {
          type: 1,
          title: "HTML专项训练",
          endtime: "2017-07-15",
          score: 99,
        },
        {
          type: 1,
          title: "HTML专项训练",
          endtime: "2017-07-15",
          score: 99,
        }
      ]
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
