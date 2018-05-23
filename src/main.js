// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import './assets/css/reset.css'
import 'lib-flexible'
import { Tab, Tabs } from 'vant';
Vue.config.productionTip = false
Vue.prototype.$ajax = axios
/* eslint-disable no-new */



Vue.use(Tab).use(Tabs);
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
