<template>
  <div class="star " :class="`star-${size}`">   <!--还可以用'star-'+size-->
    <span class="star-item" :class="starsClass"
          v-for="(starsClass,index) in starsClasses" :key="index"></span>
  </div>
</template>

<script>
  export default {
    props: {
      score: Number,
      size: Number
    },
    computed: {
      //把所有切换星星的类名放在同一个数组里面 根据得分来放入对应的类名
      //  on half off 遍历后各自分配 最后返回一个数组
      starsClasses () {
        const CLASS_ON = 'on';
        const CLASS_OFF = 'off';
        const CLASS_HALF = 'half';
        const starsClassesArr = [];

        const {score} = this;//得到评分

        let scoreInteger = Math.floor(score);//取整后的得分
        let scoreDecimal = score * 10 - scoreInteger * 10;//小数部分防止相减发生误差*10

        //进行得分判断开始往里面添加对应类名
        for (let i = 0; i < scoreInteger; i++) {
          starsClassesArr.push(CLASS_ON);
        }
        if (scoreDecimal >= 5) {
          starsClassesArr.push(CLASS_HALF);
        }
        while (starsClassesArr.length < 5) {
          starsClassesArr.push(CLASS_OFF);
        }

        return starsClassesArr;
      }

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')
</style>
