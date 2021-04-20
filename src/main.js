import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from './router/index'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueSplide from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css';

import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import Bus from './components/EventBus'
Vue.use(Bus)
Vue.component('VueSlider', VueSlider)
import JwPagination from 'jw-vue-pagination';
Vue.component('jw-pagination', JwPagination);

Vue.use( VueSplide );
library.add(fab, fas, far)
Vue.component('font-awesome-icon', FontAwesomeIcon)

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
	store
})  
