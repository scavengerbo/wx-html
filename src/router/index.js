/* eslint no-multiple-empty-lines:0 */
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import hello from '@/components/Hello'
import agencyMatters from '@/components/agencyMatters'
import ApprovalList from '@/components/ApprovalList'
import workList from '@/components/workList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/hello',
      name: 'hello',
      component: hello
    },
    {
      path: '/agencyMatters',
      name: 'agencyMatters',
      component: agencyMatters
    },
    {
      path: '/ApprovalList',
      name: 'ApprovalList',
      component: ApprovalList
    },
    {
      path: '/workList',
      name: 'workList',
      component: workList
    }
  ]
})

new Router().beforeEach((to, from, next) => {
  if (to.path.startsWith('/login')) {
    window.sessionStorage.removeItem('userName')
    next()
  } else if (to.path.startsWith('/register')) {
    next()
  } else {
    let token = window.sessionStorage.getItem('users')
    // console.log(token)
    if (!token) {
      // 未登录  跳回主页面
      next({path: '/login'})
    } else {
      next()
    }
  }
})

