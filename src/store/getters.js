/*
包含n个get计算属性的方法
* */
export default {
  totalCount(state) {//来获取商品的总数量
    return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
  },
  totalPrice(state) {//来获取商品的总价格
    return state.cartFoods.reduce((pre, food) => pre + food.price * food.count, 0)
  },
  positiveRatingCount(state) {//来获取评价满意的总数量
    return state.ratings.reduce((pre, rating) => pre + (rating.rateType === 0 ? 1 : 0), 0)
  },
}
