/*
* 包含n个用于间接更新状态数据的方法的对象
* * 前后台的交互都在actions里面
* 在这里引入接口函数和mutation-types里的常量利用commit进行触发mutations里面的函数
* */

/** 在api接口函数的参数里面可以放({commit，state})
 * 在{commit('RECEIVE_ADDRESS为mutation-types里的常量')}从而触发mutations里面的函数
 * 还要根据api连接后台的接口函数的传参形式进行传参*/

import {
  reqAddress,
  reqFoodCategorys, reqLogout,
  reqShops
} from '../api/index';

import {
  RECEIVE_CATEGORYS,
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER
} from './mutation-types'

export default {
  //发异步请求获取商家地址

  async getAddress({commit, state}) {
    const {latitude, longitude} = state;
    // 发送ajax请求{code: 0, data: address}
    const result = await reqAddress(latitude + ',' + longitude);
    if (result.code === 0) {//请求成功
      const address = result.data;
      //commit触发mutations  // address与state.js的属性名一一对应
      commit(RECEIVE_ADDRESS, {address})//commit传参和mutations里面的函数对应
    }
  },
  //发异步请求获取Categorys
  async getFoodCategorys({commit}) {
    const result = await reqFoodCategorys();
    if (result.code === 0) {//请求成功 // {code: 0, data: categorys}
      const categorys = result.data;
      //commit触发mutations
      commit(RECEIVE_CATEGORYS, {categorys})
    }

  },
  //发异步请求获取商家
  async getShops({commit, state}) {

    const {latitude, longitude} = state;

    const result = await reqShops(latitude, longitude);
    // {code: 0, data: shops}
    if (result.code === 0) {//请求成功
      const shops = result.data;
      //commit触发mutations  // address与state.js的属性名一一对应
      commit(RECEIVE_SHOPS, {shops});
    }
  },
  //同步保存uesr
  saveUser({commit}, user) {
    commit(RECEIVE_USER, {user});
  },
  // 异步退出登陆的action
  async logout({commit}) {
    const result = await reqLogout();
    if (result.code === 0) {
      commit(RESET_USER);
    }
  }

}
