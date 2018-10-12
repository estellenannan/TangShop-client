<template>
  <section class="msite">
    <!--首页头部-->
    <TopHeader :title="address.name">
      <span class="header_search" slot="header_left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="header_right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </TopHeader>

    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide"
               v-for="(smallArrs,index) in secondCategorysArr" :key="index">
            <a href="javascript:" class="link_to_food"
               v-for="(everyCategory,index) in smallArrs" :key="index">
              <div class="food_container">
                <img :src="baseImgUrl+everyCategory.image_url" alt="">
              </div>
              <span>{{everyCategory.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </section>
</template>

<script>
  import {mapState} from 'vuex';
  import Swiper from 'swiper';

  import ShopList from '../../components/ShopList/ShopList.vue';

  export default {
    data() {
      return {
        baseImgUrl: 'https://fuss10.elemecdn.com'
      }
    },
    components: {
      ShopList
    },
    computed: {
      ...mapState(['address', 'categorys']),

      //要显示的值由已有data数据来确定 利用计算属性
      secondCategorysArr() {
        //根据页面展示数据的要求对categorys这个大数组拆分成一个二维数组
        const {categorys} = this;
        const bigArray = [];//要展示几屏就有几个smallArr
        let smallArr = [];//smallArr根据页面要求里面放8个对象 然后换成新的
        categorys.forEach(category => {//category为每一个对象
          if (smallArr.length === 0) {
            bigArray.push(smallArr);// 当小数组为空数组时, 将小数组保存到大数组
          }
          smallArr.push(category);

          if (smallArr.length === 8) {
            smallArr = [];
          }
        });
        return bigArray
      }
    },
    watch: {// 注意: 状态数据变化后, 更新对应的界面是异步进行的
      // 必须在状态数据更新之后执行利用 vm.$nextTick( [callback] )
      categorys(value) {
        this.$nextTick(() => {
            //初始化显示列表之后执行
            new Swiper('.swiper-container', {
              loop: true, // 循环模式
              pagination: { // 如果需要分页器
                el: '.swiper-pagination'
              },
            })
          }
        )
      }

    },
    mounted() {
      //   ajax请求 测试获取地址数据 保存到state中
      this.$store.dispatch('getAddress');
      //   异步ajax请求 获取商品列表  保存到state中
      this.$store.dispatch('getFoodCategorys');

    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          > span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
