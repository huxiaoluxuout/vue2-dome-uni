<template>
  <view class="content">

    <view class="text-area">
      <view class="title">当前时速:{{ speedKph }}公里/小时</view>

      <view class="title">总距离:{{ totalDistance }}公里</view>
      <view class="title">总时长:{{ totalTime }}</view>
    </view>
    <button @click="startLocationChange">开启</button>
    <view style="height: 20px;"></view>
    <button @click="stopLocationChange">关闭</button>
    <view style="height: 20px;"></view>

    <view class="view-item" v-for="(item,index) in dataList" :key="index">
      <view class="fz12">纬度: {{ item.latitude }}</view>
      <view class="fz12">经度: {{ item.longitude }}</view>
      <view class="fz12">时间: {{ item.time }}</view>
    </view>


  </view>
</template>

<script>
import {uniOnLocationChange} from "@/common/js/uniApi";
import {calculateSpeed} from "@/utils/calculateSpeed.js"

let calcSpeed = calculateSpeed();

export default {

  data() {
    return {

      speedKph: 0,
      dataList: [],
      totalDistance: 0,

      totalTime: 0
    }
  },
  onLoad() {

    const that = this;
    uni.$on('onLocationChangeData', (res => {

      let result = calcSpeed(res.latitude, res.longitude)

      console.log('result',result)
      that.speedKph = result.speedKph;

      that.totalTime = `${Math.floor(result.totalTime / 60)} : ${Math.floor(result.totalTime % 60)}`;
      that.totalDistance = result.totalDistance;


    }))

    uniOnLocationChange()

  },
  onUnload() {
    this.stopLocationChange()
  },
  methods: {

    startLocationChange() {
      uniOnLocationChange()
    },
    stopLocationChange() {
      uni.stopLocationUpdate({
        complete: (complete) => {
          console.log('complete', complete)
        }
      })
    },
  }
}

</script>

<style scoped>
.view-item {
  display: flex;
  font-size: 14px;
  justify-content: space-around;
  margin-top: 4px;
}

.fz12 {
  font-size: 12px;
}


</style>