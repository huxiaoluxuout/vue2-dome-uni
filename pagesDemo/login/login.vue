<template>
  <view class="content">

    <view class="btn-login" @click="wxGetUserProfile">
      手机号快捷登录
      <button class="btn-get-phone-number" open-type="getPhoneNumber" @getphonenumber="getMobilePhone"></button>
    </view>


  </view>
</template>

<script>


import {wechatLogin, wechatPhone} from "@/network/apis/lang_duo";

export default {
  name: "login",
  data() {
    return {
      userInfo: {},
    };
  },

  methods: {

    // 获取用户信息
    wxGetUserProfile: function () {
      uni.getUserProfile({
        lang: 'zh_CN',
        desc: '获取你的昵称、头像、地区及性别',
        success: (res) => {
          // console.log('获取用户信息',res)
          this.userInfo = res
        },
        // 失败回调
        fail: (err) => {
          console.error(err)
        }
      })

    },


    // 获取手机号
    getMobilePhone(e) {
      console.log('获取手机号', e)

      if (e.detail.errMsg === 'getPhoneNumber:ok') {
        console.log(this.userInfo)
        return
        wechatPhone({
          code: e.detail.code
        }).then(res => {
          console.log(res)
        })
      }

    },


  }
}
</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200rpx;
  .btn-login {
    width: 60%;
    background: #C8151D;
    border-radius: 50px;
    opacity: 1;
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
    padding: 5px 0;
    position: relative;

    .btn-get-phone-number {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: transparent;
    }

    .btn-get-phone-number::after {
      border: none;
    }
  }



}


</style>
