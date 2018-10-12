/*
* 路由器对象模块
* */
import Vue from 'vue';
import VueRouter from 'vue-router';

import MSite from '../pages/MSite/MSite.vue';
import Search from '../pages/Search/Search.vue';
import Order from '../pages/Order/Order.vue';
import Profile from '../pages/Profile/Profile.vue';
import Login from '../pages/Login/Login.vue';

Vue.use(VueRouter);
export default new VueRouter({
  //配置了所有的路由
  routes: [
    //每一个对象一个对应的路由 还得配置默认的根路由为首页
    {
      path: '/msite',
      component: MSite,
      meta: {
        showFooter:true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter:true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter:true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter:true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {//默认的跟陆有
      path: '/',
      redirect: '/msite'
    }
  ]
});
