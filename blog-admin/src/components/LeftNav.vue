<template>
    <el-row class="leftNav">
         <el-col>
             <el-menu
                router
                :default-active="$route.path"
                mode="vertical"
                background-color="#324057"
                text-color="#fff"
                active-text-color="#409eff" 
                class="el-menu-vertical-demo">
                <router-link to="/home">
                    <el-menu-item index="0">
                        <i class="fa fa-margin fa-server"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                </router-link>
                <template  v-for="item in items" >
                    <el-submenu v-if="item.children && !item.auth" :index="item.path" :key="item.path">
                        <template slot="title">
                            <i :class="'fa fa-margin '+item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </template>
                        <router-link v-for="(citem,cindex) in item.children" 
                            :to="citem.path" :key="cindex">
                            <el-menu-item 
                                v-if="citem.auth && user.auth === citem.auth"
                                :index='citem.path'>
                                <span slot="title">{{citem.name}}</span>
                            </el-menu-item>
                            <el-menu-item 
                                v-else-if="!citem.auth"
                                :index='citem.path'>
                                <span slot="title">{{citem.name}}</span>
                            </el-menu-item>  
                        </router-link>
                    </el-submenu>
                    <el-submenu v-else-if="item.children && user.auth ===item.auth" :index="item.path" :key="item.path">
                        <template slot="title">
                            <i :class="'fa fa-margin '+item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </template>
                        <router-link v-for="(citem,cindex) in item.children" 
                            :to="citem.path" :key="cindex">
                            <el-menu-item 
                                v-if="citem.auth && user.auth === citem.auth"
                                :index='citem.path'>
                                <span slot="title">{{citem.name}}</span>
                            </el-menu-item>
                            <el-menu-item 
                                v-else-if="!citem.auth"
                                :index='citem.path'>
                                <span slot="title">{{citem.name}}</span>
                            </el-menu-item>  
                        </router-link>
                    </el-submenu>
                </template>
             </el-menu>
         </el-col>
    </el-row>
</template>
<script>
export default {
    name:'LeftNav',
    computed:{
        user(){
            return this.$store.state.user
        }
    },
    mounted (){
        console.log(this.$route.meta.auth)
    },
    data() {
        return {
        items: [
            {
                icon:"fa-flag",
                name:"标签管理",
                path:'label',
                children:[
                    {path:"/label/createLabel",name:'新建标签',auth:true},
                    {path:"/label/labelList",name:'标签列表'}
                ]
            },
            {
                icon:"fa-book",
                name:"文章管理",
                path:'article',
                children:[
                    {path:"/article/createArticle",name:'新建文章',auth:true},
                    {path:"/article/articleList",name:'文章列表'}
                ]
            },
            {
                icon: "fa-money",
                name: "资金管理",
                path: "fund",
                auth:true,
                children: [{ path: "/fund/fundList", name: "资金流水"}]
            },
            {
                icon: "fa-check",
                name: "用户管理",
                path: "admin",
                children: [
                    { path: "/admin/createUser", name: "添加用户",auth:true},
                    { path:"/admin/userList",name:'用户列表'}
                ]
            },
            {
                icon: "fa-user",
                name: "信息管理",
                path: "info",
                children: [{ path: "/user/userInfo", name: "个人信息" }]
            },
            
        ]
        };
  }
}
</script>
<style lang="scss" scoped>
    .leftNav{
        position:fixed;
        top:71px;
        left:0;
        min-height: 100%;
        background-color: #324057;
        z-index: 99;
        .el-menu {
            border: none;
        }
        .el-menu-vertical-demo {
            width: 35px;
        }
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 180px;
            // min-height: 400px;
        }
        .el-submenu .el-menu-item {
            min-width: 180px;
        }
        .hiddenDropdown,
        .hiddenDropname {
            display: none;
        }
        .fa-margin {
            margin-right: 10px;
        }
    }
</style>