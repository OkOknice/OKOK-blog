<template>
  <div id="app">
    <Header :class="{'navHeaderClass':navHeaderClass}"></Header>
    <el-row justify="center" class="content" type="flex">
      <el-col :xl="40" :xs="40">
        <router-view/>
      </el-col>
    </el-row>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name:'app',
  components:{
    Header,
    Footer
  },
  data (){
    return {
      navHeaderClass:false
    }
  },
  mounted (){
    window.addEventListener('scroll',this.watchScroll)
  },
  methods:{
    //吸顶效果
    watchScroll (){
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if(scrollTop > 70){
        this.navHeaderClass = true
      } else {
        this.navHeaderClass = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  #app{
    font-family: "microsoft yahei";
    transition:all 1s;
    .content{
      background-color: #f9f9f9;
      padding: 30px 0;
    }
    .navHeaderClass{
      position:fixed;
      top:0;
      z-index:9999;
      width:100%;
      box-shadow: 0 5px 5px #cccccc;
    }
  }
  
</style>

