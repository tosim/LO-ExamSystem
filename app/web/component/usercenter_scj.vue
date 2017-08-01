<template>
  <div class="scj-all">
    <div class="scj-title">
      <!--<span>收藏题目总数（{{scj_num}}）</span>-->
    </div>
    <div class="scj-filter">
      <div class="filter-type">
        <!--  如果被选中，触发ajax同时，将按钮的class换成filteritem-select  -->
        <span style="font-weight:700">题型：</span>
        <a href="javascript:void(0)" v-for="item in type" :key="item.value" :class="{filteritem:!item.selected,'filteritem-select':item.selected}" @click="taggleTypes(item)">{{item.name}}</a>
      </div>
      <div class="filter-tags">
        <span style="font-weight:700">类型：</span>
        <!--  如果被选中，触发ajax同时，将按钮的class换成filteritem-select  -->
        <a href="javascript:void(0)" v-for="item in tags" :key="item.value" :class="{filteritem:!item.selected,'filteritem-select':item.selected}" @click="taggleTags(item)">{{item.tag_name}}</a>
      </div>
    </div>
    <div class="scj-body">
      <el-table :data="scj" style="width: 100%">
        <el-table-column prop="q_content" label="题目">
        </el-table-column>
        <el-table-column prop="tags" label="知识点" width="180">
        </el-table-column>
        <el-table-column prop="q_id" label="来自" width="180">
        </el-table-column>
        <el-table-column label="查看" width="180">
          <template scope="scope">
            <el-button style="margin-top:2px;" class="layui-btn layui-btn-small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scj_num: 1,
      filter:{
        q_types:new Set(),
        q_tags:new Set()
      },
      user:null,
      type: [{name:"单选题",value:1,selected:false}, {name:"多选题",value:2,selected:false}, {name:"填空题",value:3,selected:false}, {name:"判断题",value:4,selected:false}, {name:"简答题",value:5,selected:false}, {name:"编程题",value:6,selected:false}],
      tags: ["html", "css", "javascript"],
      scj: []
    }
  },
  mounted:function(){
    this.$http.get(this.domain+'/v1/sessions')//1获取用户信息
      .then((res)=>{
        res = res.data;
        if(res.success === 1){
          this.user = res.data;
          console.log('asdadasd');
          console.log(res.data);
        }else{
          console.log('not login');
          // window.location.href = '/public/login.html';
        }
        // console.log(this.user);
      })
      .then(()=>{
        this.$http.get(this.domain+'/v1/quecollection/tags?u_id='+this.user.u_id).then((res)=>{
          res = res.data;
          console.log(res.data);
          this.tags = res.data;
        })
      })
      .then(()=>{
        var qs={};
        qs.q_types = [];
        qs.q_tags = [];
        qs.u_id = this.user.u_id;
        this.$http.post(this.domain+'/v1/quecollection',qs).then((res)=>{
          res = res.data;
          console.log('---------------------------------');
          console.log(res);
          console.log('---------------------------------');
          for(let i of res.data){
            i.q_content = i.q_content.split(';;')[0];
            if(i.q_content.length > 20){
              i.q_content = i.q_content.substring(0,20) + '...';
            }
            i.tags = i.tags.join('/');
          }
          this.scj = res.data;
        });
      })
  },
  methods:{
    showDetail(item){
      console.log(item);
    },
    getU_ques(){
      var qs={};
      qs.q_types = [];
      qs.q_tags = [];
      qs.u_id = this.user.u_id;
      this.filter.q_types.forEach(function(item){
        // qs = qs + 'q_types[]=' + item.toString() + '&';
        qs.q_types.push(item.toString());
      });
      this.filter.q_tags.forEach(function(item){
        qs.q_tags.push(item.toString());
        // qs = qs + 'q_tags[]=' + item.toString() + '&';
      });
      console.log(qs);
      this.$http.post(this.domain+'/v1/quecollection',qs).then((res)=>{
        res = res.data;
        console.log('---------------------------------');
        console.log(res);
        console.log('---------------------------------');
        for(let i of res.data){
          i.q_content = i.q_content.split(';;')[0];
          if(i.q_content.length > 20){
            i.q_content = i.q_content.substring(0,20) + '...';
          }
          i.tags = i.tags.join('/');
        }
        this.scj = res.data;
      });
    },
    taggleTypes(item){
      if(this.filter.q_types.has(item.value)){
        this.filter.q_types.delete(item.value);
        item.selected = false;
      }else{
        this.filter.q_types.add(item.value);
        item.selected = true;
      }
      this.getU_ques();

      // console.log(this.filter.q_types);
    },
    taggleTags(item){
      if(this.filter.q_tags.has(item.tag_id)){
        this.filter.q_tags.delete(item.tag_id);
        item.selected = false;
      }else{
        this.filter.q_tags.add(item.tag_id);
        item.selected = true;
      }
      this.getU_ques();
      // console.log(this.filter.q_tags);
    },
  }
}
</script>

<style scoped>
.scj-all {
  width: 90%;
  margin: 0 auto;
}

.scj-title {
  line-height: 35px;
  width: 90%;
  margin: 50px auto 0;
  padding: 10px 5px;
  border-bottom: 1px solid rgb(212, 212, 212);
}

.scj-title span {
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  white-space: nowrap;
}

.scj-filter {
  width: 89%;
  margin: 0 auto;
  overflow: hidden;
  background: #f5f5f5;
  padding: 15px 10px 10px;
}

.scj-filter a {
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

.filter-type {
  margin-bottom: 10px;
}

.filteritem:hover {
  border-color: #1abc9c;
  color: #25bb9b;
}

.filteritem-select {
  background: #1abc9c !important;
  border-color: #1abc9c !important;
  color: #FFF !important;
}

.scj-body {
  width: 90%;
  margin: 10px auto;
}
</style>
