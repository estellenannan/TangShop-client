/*
* 包含n个用于直接更新状态数据的方法的对象
* */
import {
  RECEIVE_CATEGORYS,
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER
}
  from
    './mutation-types'

export default {

  [RECEIVE_ADDRESS](state, {address}) {//和actions里面commit的参数要对应
    // 也就是得和state.js里面定义好的属性一一对应
    state.address = address;
  },
  [RECEIVE_CATEGORYS](state, {categorys}) {
    state.categorys = categorys;
  },
  [RECEIVE_SHOPS](state, {shops}) {
    state.shops = shops;
  },
  [RECEIVE_USER](state, {user}) {
    state.user = user;
  },
  [RESET_USER](state) {
    state.user = {}
  },

}
