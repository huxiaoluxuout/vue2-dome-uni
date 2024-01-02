<template>
  <view>
    <zshu-navbar title="A!" size="16">
      <!--      <template #center>
              <view style="width: 90%;background-color:royalblue;">444</view>
            </template>-->

    </zshu-navbar>

    <view style="position: fixed;top: 50%;left:50%;background-color:#fff;z-index: 10;">
      <button @click="ylxEmit('haha')">xixi</button>
    </view>

  </view>
</template>

<script>
import mixinsPullDownRefresh from "@/mixins/mixinsPullDownRefresh";
import mixinsNextPageManager from "@/mixins/mixinsNextPageManager";

export default {
  mixins: [mixinsPullDownRefresh, mixinsNextPageManager],
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
    ylxOnReachBottom() {
      console.log('ylxOnReachBottom');
      // this.ylxNextPageManager.setDataList([])
      // console.log(this.ylxNextPageManager.getPage());
      // console.log(this.ylxNextPageManager.getDataList());

    },

  }
}
</script>

<style>

</style>
