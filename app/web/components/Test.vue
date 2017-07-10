<template>
  <div>
      <h1>{{msg}}</h1>
      <button @click="fetch()">测试按钮</button>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
        msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
      fetch(){
        console.log(this.$http);
        console.log('aaa');
        this.$http.get(`http://127.0.0.1:7001/v1/test`).then(res=> {
            console.log('res', res);
            
        });
      }
  }
}
</script>

<style>
</style>
