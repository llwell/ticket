import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Play from '@/components/Play'
import Home from '@/components/Home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
      path: '/list',
      name: 'list',
      component: List,
    },{
      path: '/play',
      name: 'play',
      component: Play
    }
  ]
})



