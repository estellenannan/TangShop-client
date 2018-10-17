/*
*
* 自定义过滤器模块
* */
import Vue from 'vue';
import moment from 'moment';

Vue.filter('dataFormat', function (value, format = 'YYYY-MM-DD HH:mm:ss') {
  return moment(value).format(format);
});
// 定义全局过滤器(处理日期)

