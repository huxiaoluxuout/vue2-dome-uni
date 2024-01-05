<template>
  <view>


    <button style="margin-top: 20px;font-size: 14px;" @click="toPage">跳转到还未打开过的tabbar页面</button>


  </view>
</template>

<script>

export default {

  methods: {

    toPage() {
      uni.$emit('APP', {eventName: 'tabbar2', param: 1})
      uni.switchTab({
        url:'/pages/tabbar2/tabbar2'
      })
    },

  }
}
</script>

<style>

</style>
