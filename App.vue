<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
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
  }
}
</script>

<style lang="scss">
@import "@/uni_modules/uview-ui/index.scss";

@import '@/common/style/app.scss';
@import '@/common/style/free.css';


</style>
