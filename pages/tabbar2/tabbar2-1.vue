<template>
  <view>


  </view>
</template>

<script>

export default {

  data() {
    return {
      eventBusName:'tabbar2',
      eventBusEmit:'emitCallbackTest',
    }
  },

  onLoad: function () {
    const { eventBusName, eventBusEmit } = this;
    if (typeof eventBusName === 'string' && typeof eventBusEmit === 'string' && eventBusName && eventBusEmit) {
      // 页面第一次打开
      uni.$emit('getAPP', this[eventBusEmit])
      // 页面已经打开
      uni.$on(eventBusName, this[eventBusEmit])
    }
  },

  methods: {
    emitCallbackTest(data) {
      console.log('emitCallbackTest', data)
    }

  }
}
</script>

<style scoped>


</style>
