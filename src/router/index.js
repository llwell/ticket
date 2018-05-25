import Vue from 'vue'
import Router from 'vue-router'
import TicketIn from '@/components/TicketIn'
import Personage from '@/components/Personage'
import Home from '@/components/Home'
import test from '@/components/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
      path: '/TicketIn',
      name: 'TicketIn',
      component: TicketIn,
    },{
      path: '/Personage',
      name: 'Personage',
      component: Personage,
    },{
      path: '/test',
      name: 'test',
      component: test,
    }
  ]
})



