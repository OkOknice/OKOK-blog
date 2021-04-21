<template>
    <div class="index">
        <HeaderNav></HeaderNav>
        <LeftNav></LeftNav>
        <div class="rightContainer">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import HeaderNav from '../components/HeaderNav'
import LeftNav from '../components/LeftNav.vue'
export default {
    name:'index',
    components:{
        HeaderNav,
        LeftNav
    }
}
</script>

<style lang="scss" scoped>
    .index {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .rightContainer{
            position:relative;
            top:0;
            left:180px;
            width:calc(100% - 180px);
            height:calc(100% - 71px);
            overflow: auto;
        }
    }
</style>