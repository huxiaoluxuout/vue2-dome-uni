<template>
  <view>
    <zshu-navbar title="A!" size="16"
                 :navbar-style="{backgroundImage: `linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)`}">
      <!--            <template #center>
                    <view style="width: 90%;background-color:royalblue;">444</view>
                  </template>-->

    </zshu-navbar>

    <button @click="$u.route('/pagesDemo/A3/A3')">A3</button>


    <view style="position: fixed;top: 50%;left:50%;transform:translateX(-50%);background-color:#fff;z-index: 10;">
      <button @click="toPrePage">传参/返回上一页</button>
    </view>

  </view>
</template>

<script>


import instanceUniEventBus from "@/utils/common/uniEventBus/instanceUniEventBus";
import useUniEventBusVue2 from "@/utils/common/uniEventBus/useUniEventBusVue2";

export default {
  mixins: [useUniEventBusVue2],

  data() {
    return {}
  },
  onLoad() {
    instanceUniEventBus.onPageNotice((data) => {
      console.log('onPageNotice-data', data)
    })
  },

  methods: {
    ylxOnPullDown() {
      console.log('1 onPullDown');
    },
    toPrePage() {
      console.log('1 toPrePage');
    },
  }
}
</script>

<style>

</style>
