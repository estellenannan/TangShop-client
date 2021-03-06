//主入口文件
import Vue from 'vue';

import App from './App.vue';
import router from './router';
import TopHeader from './components/TopHeader/TopHeader.vue';
import store from './store';
import 'swiper/dist/css/swiper.min.css';
//注册全局组件
Vue.component('TopHeader', TopHeader);

new Vue({
  el: '#app',
   /*components: { App },
   template: '<App/>'*/
  /*
  * render：function (createElement) {  函数返回的标签会被渲染到el中
* return createElement(App)}  //<App/>*/
  render: h => h(App),//函数类型 参数是函数 箭头函数返回值是
  router,
  store
});











