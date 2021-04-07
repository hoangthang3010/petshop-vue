import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from './router/index'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(Antd);

Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
Vue.use(VueMaterial)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
})  
