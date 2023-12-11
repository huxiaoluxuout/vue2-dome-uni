<template>
<view>
  <slot  :item="dataList[index].id"></slot>
</view>
</template>

<script>
export default {
  name: "ylx-for-slot",
  props: {
    dataList: {
      type: Array,
      default: ()=>[]
    },
    index: {
      type: Number,
      default: 0
    },
  },
}
</script>

<style scoped>

</style>
