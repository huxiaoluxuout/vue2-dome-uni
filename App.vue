<script>


import {getLogin} from "@/network/apis/test_api";
import appEventBus from "@/mixins/mixinsAppEventBus";
import {getCID} from "@/utils/test";
import {devEnableDebug} from "@/common/js/devEnableDebug";

export default {
  mixins: [appEventBus],

  onLaunch: function (options) {
    console.log('App Launch')
    devEnableDebug(options)
    this.loginApi()
    getCID()
  },

  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  methods: {
    loginApi() {
      let token = uni.getStorageSync('token') || ''
      if (!token)
        getLogin({
          appscret: "47a610ee35391da40ec7f6b73e15b902",
          mobile: "15856237824",
          pass: "11110000",
          type: 2
        }).then(res => {
          if (res.status === 200) {
            uni.setStorageSync('token', res.token)
          }
        })
    },


  }
}
</script>

<style lang="scss">
/* #ifndef APP-PLUS-NVUE*/

@import "@/uni_modules/uview-ui/index.scss";
@import '@/common/style/app.scss';

/* #endif*/


</style>
