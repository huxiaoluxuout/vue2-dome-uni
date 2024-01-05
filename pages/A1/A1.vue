<template>
  <view>
    <zshu-navbar title="A!" size="16"
                 :navbar-style="{backgroundImage: `linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)`}">
      <!--            <template #center>
                    <view style="width: 90%;background-color:royalblue;">444</view>
                  </template>-->

    </zshu-navbar>

    <view style="position: fixed;top: 50%;left:50%;transform:translateX(-50%);background-color:#fff;z-index: 10;">
      <button @click="ylxUniEmit('haha',callback)">传参/返回上一页</button>
    </view>

  </view>
</template>

<script>
import mixinsPullDownRefresh from "@/mixins/mixinsPullDownRefresh";

import mixinsYlxUniEventBus from "@/mixins/mixinsYlxUniEventBus";

export default {
  mixins: [mixinsPullDownRefresh, mixinsYlxUniEventBus],
  data() {
    return {}
  },

  methods: {

    ylxOnPullDown() {
      console.log('1 onPullDown');
    },

    ylxPullDownCallBack() {
      console.log('2 pullDownCallBack');

    },

    callback(info) {
      console.log('A1', info)
      uni.navigateBack()
    },


  }
}
</script>

<style>

</style>
