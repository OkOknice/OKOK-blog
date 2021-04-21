<template>
    <div class="home">
       <div class="container">
           <h1 class="title">欢迎来到OKOK博客后台管理系统</h1>
       </div>
    </div>
</template>

<script>
export default {
    name:'home'
}
</script>

<style lang="scss" scoped>
    .home {
        width:100%;
        height: 100%;
        background:url(../../assets/showcase.png) no-repeat;
        background-size: 100% 100%;
        .container{
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding-top: 200px;
            background-color: rgba(0, 0, 0, 0.7);
            text-align: center;
            color: white;
            .title{
                font-size:30px;
            }
        }
    }
</style>