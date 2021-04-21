import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import  mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'swiper/swiper-bundle.css'
import 'element-ui/lib/theme-chalk/index.css';
import axios from './api/http'
import './style.scss'
import './utils/day' 
Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
