import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import About from '../views/about.vue'
import ITArticle from '../views/itArticle.vue'
import RecordLife from '../views/recordLife.vue'
import ArticleDetail from '../views/articleDetail.vue'

Vue.use(VueRouter)

const routes = [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/home',
      name:'home',
      component:Home
    },
    {
      path:'/itArticle',
      name:'itArticle',
      component:ITArticle
    },
    {
      path:'/recordLife',
      name:'recordLife',
      component:RecordLife
    },
    {
      path:'/articleDetail/:id',
      name:'articleDetail',
      component:ArticleDetail
    },
    {
      path:'/about',
      name:'about',
      component:About
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
