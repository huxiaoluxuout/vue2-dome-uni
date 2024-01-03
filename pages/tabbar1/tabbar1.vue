<template>
  <view>
    000

    <button @click="ylxNavigateTo('pages/A1/A1?aa=66',{name:'莉莉',age:16})"> 页面1</button>
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
    ylxGetInfoFromChild(data) {
      console.log(data)
    },

    testHandler() {

    }

  }
}
</script>

<style>

</style>
