/*
* 包含n个用于直接更新状态数据的方法的对象
* */

import Vue from 'vue';

import {
  RECEIVE_CATEGORYS,
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from './mutation-types';

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
    state.user = {};
  },
  [RECEIVE_INFO](state, {info}) {
    state.info = info;
  },
  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings;
  },
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods;
  },
  [INCREMENT_FOOD_COUNT](state, {food}) {
    if (food.count) {
      food.count++
    } else {//新属性用set方法
      Vue.set(food, 'count', 1);// 新添加的属性有数据绑定 ==>界面会更新
      state.cartFoods.push(food);//更新到的food也保存到购物车数组中，方便调用
    }
  },
  [DECREMENT_FOOD_COUNT](state, {food}) {
    if (food.count > 0) {
      food.count--;
      //如果购物车没有食物，清空它
      if (food.count === 0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  [CLEAR_CART](state) {
//把购物车中所有food的count的数量记为0；重置cartFoods
    state.cartFoods.forEach(food => food.count = 0);
    state.cartFoods = [];
  }

}
