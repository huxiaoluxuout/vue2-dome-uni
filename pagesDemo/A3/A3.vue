<template>
  <div class="content">
  A3
    <button @click="toA1">toA1</button>
    <button @click="ccc">ccc</button>
  </div>
</template>

<script>
import mixinsOnRegisterEvent from "@/mixins/mixinsEventBusRegister";

export default {
  mixins:[mixinsOnRegisterEvent],
  data() {
    return {
     title:'我是A3'
    };
  },

  methods: {
    toA1() {
      uni.$emit('/pages/A1/A1', this.title)

    },
    ccc() {
      console.log('this.ylxPrevEventName',this.ylxPrevEventName)
      uni.$emit(this.ylxPrevEventName,()=>{
        uni.navigateBack()
      })
    },
  },

};
</script>

<style>

</style>
