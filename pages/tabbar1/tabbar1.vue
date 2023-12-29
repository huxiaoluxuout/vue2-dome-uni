<template>
  <view>
    000

    <button @click="navigateTo('pages/A1/A1')"> 页面1</button>
    <button @click="testHandler" style="margin-top: 20px;">GPS</button>

    <tabbar :INDEX="0"></tabbar>

  </view>
</template>

<script>
import ZshuNavbar from "@/components/zshu-components/zshu-navbar.vue";
import {navigateTo} from "@/utils/tools";
import permision from "@/js_sdk/wa-permission/permission.js"

export default {
  components: {ZshuNavbar},
  data() {
    return {}
  },
  methods: {
    navigateTo,

    testHandler() {
      this.requestAndroidPermission('android.permission.ACCESS_FINE_LOCATION')
     /* let result = permision.checkSystemEnableLocation() //返回true或false
      console.log(result)
      if(!result){
        permision.gotoAppPermissionSetting()
      }*/
      /*let result = permision.judgeIosPermission("location")
      console.log(result)*/
    },
    // vue的method里编写如下代码
    async requestAndroidPermission(permisionID) {
      var result = await permision.requestAndroidPermission(permisionID)
      var strStatus
      if (result == 1) {
        strStatus = "已获得授权"
      } else if (result == 0) {
        strStatus = "未获得授权"
      } else if (result == -1){
        strStatus = "被永久拒绝权限"
         // let result = permision.checkSystemEnableLocation() //返回true或false
         console.log(result)
         if(result == -1){
           permision.gotoAppPermissionSetting()
         }
      }
      console.log(strStatus)

    },
  }
}
</script>

<style>

</style>
