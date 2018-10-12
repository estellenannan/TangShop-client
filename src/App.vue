<!--根vue-->

<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-if="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'

  export default {
    components: {
      FooterGuide
    },
    mounted () {
      //获取得user保存在state里面
      this.$store.dispatch('getUser')
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
</style>
