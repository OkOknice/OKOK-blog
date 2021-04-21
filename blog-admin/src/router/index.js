import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/index.vue'
import Register from '../views/register/register.vue'
import Login from '../views/login/login.vue'
import Home from '../views/home/home.vue'
import UserInfo from '../views/userInfo/userInfo.vue'
import FundList from '../views/fund/fundList.vue'
import CreateLabel from '../views/label/createLabel.vue'
import LabelList from '../views/label/labelList.vue'
import CreateArticle from '../views/article/createArticle.vue'
import ArticleList from '../views/article/articleList.vue'
import UserList from '../views/setUser/userList.vue'
import CreateUser from '../views/setUser/createUser.vue'
import NotFound from '../views/404/404.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode:'history', 
    routes:[
        {
            path:"/",
            redirect:'/index'
        },
        {
            path:'/index',
            component:Index,
            children:[
                {
                    path:'',
                    component:Home
                },
                {
                    path:'/home',
                    name:'home',
                    component:Home
                },
                {
                    path:'/user/userInfo',
                    name:'userInfo',
                    component:UserInfo
                },
                {
                    path:'/fund/fundList',
                    name:'fundList',
                    component:FundList
                },
                {
                    path:'/label/createLabel',
                    name:'createLabel',
                    component:CreateLabel
                },
                {
                    path:'/label/labelList',
                    name:'labelList',
                    component:LabelList
                },
                {
                    path:'/article/createArticle',
                    name:'createArticle',
                    component:CreateArticle
                },
                {
                    path:'/article/editArticle/:id',
                    name:'editArticle',
                    component:CreateArticle
                },
                {
                    path:'/article/articleList',
                    name:'articleList',
                    component:ArticleList
                },
                {
                    path:'/admin/createUser',
                    name:'createUser',
                    component:CreateUser
                },
                {
                    path:'/admin/userList',
                    name:'userList',
                    component:UserList
                },
                {
                    path:'/user/editUser/:id',
                    name:'editUser',
                    component:CreateUser
                },
            ]
        },
        {
            path:"/register",
            name:'register',
            component:Register
        },
        {
            path:"/login",
            name:'login',
            component:Login
        },
        {
            path:"*",
            name:'notFound',
            component:NotFound
        }
    ]
})

//路由守卫，判断 token 是否存在 如果存在可以继续在下个页面访问，不存在返回登录页面
router.beforeEach((to,from,next) =>{
    let isLogin = localStorage.okokToken ? true : false
    if(to.path === '/login' || to.path === '/register') {
        next()
    } else {
        isLogin ? next() : next('/login')
    }
})

export default router