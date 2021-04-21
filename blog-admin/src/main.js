import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import store from './store'
import router from './router'
import axios from './api/http'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css';
import './style.scss'
import './utils/day'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(mavonEditor)
Vue.prototype.$axios = axios
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
