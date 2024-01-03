<template>
  <view>
    000

    <button @click="ylxNavigateTo('pages/A1/A1?aa=66',{})"> 页面1</button>
    <button @click="testHandler" style="margin-top: 20px;">GPS</button>

    <tabbar :INDEX="0"></tabbar>

  </view>
</template>

<script>
import ZshuNavbar from "@/components/zshu-components/zshu-navbar.vue";

import {ylxNavigateTo} from "@/utils/uniTools";

export default {
  components: {ZshuNavbar},
  data() {
    return {}
  },
  methods: {
    ylxNavigateTo,
    ylxGetInfoFromChild({params,callback}) {
      console.log(params)
      setTimeout(()=>{
        callback('hehehe')
      },200)
    },

    testHandler() {

    }

  }
}
</script>

<style>

</style>
