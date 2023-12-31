<script>


import {getLogin} from "@/network/apis/test_api";

export default {
  onLaunch: function () {
    console.log('App Launch')
    this.loginApi()
    uni.getSystemInfo({
      success(res) {
        // #ifdef MP
        if (res.brand && res.brand !== "devtools" && process.env.NODE_ENV === 'development') {
          // 打开调试
          uni.setEnableDebug({
            enableDebug: options.query?.isDebugger === '1'
          })
        }
        // #endif

      }
    })
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  methods: {
    loginApi() {
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
    }
  }
}
</script>

<style lang="scss">
@import "@/uni_modules/uview-ui/index.scss";

@import '@/common/style/app.scss';
@import '@/common/style/free.css';


</style>
