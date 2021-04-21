<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
  name: 'App',
  //目的是：不让 vuex 的数据刷新之后消失
  created (){
    if(localStorage.okokToken) {
      let decode = jwt_decode(localStorage.okokToken)
      this.$store.dispatch('set_isAuthorzation',!this.isEmpty(decode))
      this.$store.dispatch('set_user',decode)
    }
  },
  methods:{
    //判断穿进去的值是否是空字符串
    isEmpty (value){
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      )
    }
  }
}
</script>

<style lang="scss">
  html,body,#app{
    width:100%;
    height:100%;
  }
</style>
