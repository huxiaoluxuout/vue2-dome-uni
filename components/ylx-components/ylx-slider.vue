<template>

  <view class="ylx-slider" :style="heightSlider" @touchmove.capture="touchmove" @touchstart.capture="touchstart"
        @touchend.capture="touchend">
    <swiper class="swiper-view-height" :current="currentIndex" :duration="200" :circular="false"
            @change="swiperChange">
      <swiper-item v-for="(item,index) in dataList" :key="index">

        <view class="wrap_content" v-if="item">
          {{ index }} --- {{ item.name }}
        </view>
        <view class="empty-content" v-else-if="!item">
          empty
        </view>
      </swiper-item>
    </swiper>

  </view>
</template>

<script>


import {ylxStyleObjectToString} from "@/utils/uniTools";


let startClientX = 0, startClientY = 0;
let minOffset = 5, minTime = 100;//最小偏移量,最小间隔时间
let startTime = 0;//开始时的毫秒数
let xYStart = 0;//锁定滑动方向 1.上下滑动 2.左右滑动
export default {
  name: 'ylx-slider',

  props: {
    dataList: {
      type: Array,
      default: () => [null, null, null]
    },

    currentIndex: {
      type: Number,
      default: 0

    },
    otherHeight: {
      type: Number,
      default: 0
    }
  },
  computed: {
    heightSlider() {
      return ylxStyleObjectToString({
        height: `calc(100vh - var(--tabbar-height) - ${this.otherHeight}px )`

      })
    },
    swiperDataList() {
      return this.dataList
    },
  },


  data() {
    return {
      disableTouch: false,
      dataList1:['','','',]
    }
  },

  methods: {

    swiperChange(event) {
      const {current} = event.detail;
      if (current > this.currentIndex) {
        console.log('向左滑动',!this.dataList[current])
        if (!this.dataList[current]) {
          this.$emit('setDataList', current)
        }
      } else if (current < this.currentIndex) {
        console.log('向右滑动')
      }
      this.$emit('updateCurrent', current)


    },

    // ======================================

    touchstart(e) {
      // console.log(e)
      startClientX = e.changedTouches[0].clientX
      startClientY = e.changedTouches[0].clientY
      startTime = new Date().getTime(); //获取毫秒数
    },
    touchend() {
      xYStart = 0
      startClientX = 0
      startClientY = 0
      startTime = 0
      this.disableTouch = false
    },
    touchmove(e) {
      let xOffset = e.changedTouches[0].clientX - startClientX
      let yOffset = e.changedTouches[0].clientY - startClientY
      let touchTime = new Date().getTime() - startTime
      if (touchTime < minTime) return
      if (xYStart !== 1 && Math.abs(xOffset) >= Math.abs(yOffset) && Math.abs(xOffset) >= minOffset) {
        // if (xYStart === 1) return
        xYStart = 2
        this.disableTouch = false
        // console.log('左右滑动')
      } else if (xYStart !== 2 && Math.abs(xOffset) < Math.abs(yOffset) && Math.abs(yOffset) >= minOffset) {
        // if (xYStart === 2) return
        xYStart = 1
        this.disableTouch = true
        // console.log('上下滑动')
      }
    },
  }
}
</script>

<style scoped lang="scss">
.ylx-slider {

  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  border: 1px solid blue;

}

.swiper-view-height {
  flex: 1;
  touch-action: none;
  box-sizing: border-box;
}
</style>
