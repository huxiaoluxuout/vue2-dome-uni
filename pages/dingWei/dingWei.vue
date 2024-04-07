<template>
  <view class="content">
    <view style="font-size: 6em;text-align:center;">{{ speedKph }}</view>

    <radio-group @change="radioChange" class="radio-group">
      <radio v-for="(item, index) in items" :key="item.value" :value="item.value" :checked="index === current">
        {{ item.name }}
      </radio>
    </radio-group>


    <button style="width: 100px;height: 100px;font-size: 14px;line-height: 100px;border-radius: 50%;" @click="getLocation">获取定位</button>
    <view style="height: 20px;"></view>
    <button @click="stopLocationChange">关闭</button>

    <view style="height: 45vh;"></view>

    <view style="position:fixed;bottom:0;width: 100vw;height: 50vh;overflow-y:auto;z-index: 20;background-color:rgb(252,113,53);">
      <view class="view-item" v-for="(item,index) in dataList" :key="index">
        <view class="fz12">纬度: {{ item.latitude }}</view>
        <view class="fz12">经度: {{ item.longitude }}</view>
        <view class="fz12">时间: {{ item.time }}</view>
      </view>
    </view>

  </view>
</template>

<script>

import Big from "@/utils/lib/big.min"
import {calculateSpeed} from "@/utils/calculateSpeed";
import {uniOnLocationChange} from "@/common/js/uniApi";

export default {

  data() {
    return {
      speedKph: 0,
      dataList: [],
      current: 0,
      items: [
        {
          value: 'wgs84',
          name: 'wgs84'
        },
        {
          value: 'gcj02',
          name: 'gcj02'
        }
      ]
    }
  },

  onLoad() {
    uni.$on('onLocationChangeData', (res => {
      let {latitude, longitude, time, speedKph} = calculateSpeed(res)
      this.speedKph = new Big(speedKph).toFixed(3)
      this.dataList = [{latitude, longitude, time,}, ...this.dataList];

    }))

  },
  methods: {
    async radioChange(e) {
      await this.stopLocationChange()
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].value === e.detail.value) {
          this.current = i;
          break;
        }
      }
      this.getLocation()
    },

    getLocation() {
      console.log('this.items[this.current].value', this.items[this.current].value)
      uniOnLocationChange(this.items[this.current].value)
    },

    stopLocationChange() {
      return new Promise((resolve, reject) => {
        uni.stopLocationUpdate({
          complete: (complete) => {
            console.log('complete', complete)
            resolve(complete)
          }
        })
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
  color: #ffffff;
}

.radio-group {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 30rpx 10%;
}

.fz12 {
  font-size: 12px;
}

</style>
