<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;"
             :class="{on: loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;"
             :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号"
                     v-model="phone">
              <button :disabled="computeTime>0 || !isRightPhone" class="get_verification"
                      @click.prevent="sendCode" :class="{right_phone_numbers:isRightPhone}">
                {{computeTime ? `已发送(${computeTime}s)` : '获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名">
              </section>
              <section class="login_verification">
                <input :type="isShowPwd ? 'text' : 'password'" maxlength="8" placeholder="密码">
                <div class="switch_button " @click="isShowPwd=!isShowPwd"
                     :class="isShowPwd ? 'on' : 'off'">
                  <div class="switch_circle" :class="{right:isShowPwd}"></div><!--让小圆球移动的-->
                  <span class="switch_text">{{isShowPwd ? 'abc' : '...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"
                     ref='captcha' @click="updateCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script>

  import {Toast, MessageBox} from 'mint-ui'

  //PwdLogin获取账号密码登录,SendCode获取短信验证码,SmsLogin手机号验证码登录
  import {reqPwdLogin, reqSendCode, reqSmsLogin} from '../../api';//在组件内部发送请求

  export default {
    data() {
      return {
        loginWay: true,//true代表短信登录的提示 false是密码登录
        phone: '', // 手机号
        code: '', // 短信验证码
        name: '', // 用户名
        pwd: '', // 密码
        computeTime: 0, // 倒计时剩余的时间
        isShowPwd: false, // 是否显示密码
        captcha: '', // 图形验证码
      }
    },
    computed: {
      isRightPhone() {
        return /^1\d{10}$/.test(this.phone);
      }
    },
    methods: {
      async sendCode() {
        this.computeTime = 30;
        const timer = setInterval(() => {
          if (this.computeTime === 0) {
            clearInterval(timer);
            return
          }
          this.computeTime--
        }, 1000);
        //异步发送短信验证码
        let result = await reqSendCode(this.phone);
        if (result.code === 0) {//验证码发送成功
          Toast('验证码已发送')
        } else {//失败了的原因验证码还没填写或者验证码不正确
          this.computeTime = 0;
          MessageBox.alert(result.msg).then(action => {
            console.log('ok');
          });
        }

      },
      updateCaptcha() { //每次点击图片就更新一个新的图片来显示
        //一个对象，持有注册过 ref 特性 的所有 DOM 元素和组件实例。
        return this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now();
      },

      async login() {//请求登录时短信验证码登录还是账号密码登录
        let result;
        if (this.loginWay) {
          //请求登录时短信验证码登录
          const {phone, code} = this;
          if (!this.isRightPhone) {
            return MessageBox.alert('请输入正确手机号')
          } else if (!/^\d{6}/.test(code)) {
            return MessageBox.alert('请输入正确验证码')
          }
                //发送登录的请求
          result = await reqSmsLogin({ phone, code})
        } else {//请求登录时账号密码登录 判断名字。。。是否正确
          const {name, pwd, captcha} = this;
          if (!name) {
            return MessageBox.alert('用户名必须指定');
          } else if (!pwd) {
            return MessageBox.alert('密码必须指定')
          } else if (!/^\.{4}/.test(captcha)) {
            return MessageBox.alert('请输入正确验证码')
          }
          //发送登录的请求
          result = await reqPwdLogin({name, pwd, captcha})
        }

          // 根据请求的结果进行相应处理
          if (result.code === 0) {//成功了
            this.computeTime = 0;
            //保存用户信息
            this.$store.dispatch('saveUser',user);

            // 跳转到个人中心界面
            this.$router.replace('/profile');
          } else {//失败了
            return MessageBox.alert(result.msg)
          }
      }


    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          > a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        > form
          > div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_numbers
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s, border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                > .switch_circle
                //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              > a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        > .iconfont
          font-size 20px
          color #999
</style>
