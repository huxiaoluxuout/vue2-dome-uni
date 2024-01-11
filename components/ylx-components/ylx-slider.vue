<template>
  <view class="ylx-slider" :style="heightSliderStyle">
    <swiper class="swiper-view-height" :vertical="false" :current="currentIndex" :disable-touch="disableTouch" :duration="200" :circular="false" @change="onSwiperChange">
      <swiper-item v-for="(item,index) in dataList" :key="index">

        <view class="wrap_content" :style="heightSliderStyle" v-if="item" @touchmove.capture="onTouchMove" @touchstart.capture="onTouchStart" @touchend.capture="onTouchEnd">

          <!--          <scroll-view class="scroll-view" :scroll-y="true" :style="scrollViewStyle">
                      {{ item.name }}-&#45;&#45;{{ item.order_sn }}


                    </scroll-view>-->
          <ylx-scroll-view :do-function="getApiData" refresher-enabled :disable-scroll-view="disableScrollView"></ylx-scroll-view>

        </view>
        <view class="empty-content" v-else-if="!item">
          <u-loading-page :loading="true"></u-loading-page>
        </view>
      </swiper-item>
    </swiper>

  </view>
</template>

<script>


import {ylxStyleObjectToString} from "@/utils/uniTools";
import YlxScrollView from "../ylx-components/ylx-scroll-view.vue";

export default {
  name: 'ylx-slider',
  components: {YlxScrollView},

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

    heightSliderStyle() {
      return ylxStyleObjectToString({
        height: `calc(100vh - var(--tabbar-height) - ${this.otherHeight}px )`
      })
    },

    scrollViewStyle() {

      return `height:${this.disableScrollView ? '1000%' : '100%'};`
    },

  },


  data() {
    return {
      disableTouch: false,
      disableScrollView: false,

      // ------------------------------
      startX: 0,
      startY: 0,
      // 设置阈值，例如，当水平滑动和垂直滑动的比例小于该值时，判断为对角线滑动
      thresholdRatio: 0.3,
      // ------------------------------

      //最小偏移量,最小间隔时间
      minTime: 100,
      //开始时的毫秒数
      startTime: 0,
      //当前滑动方向 1.上下滑动 2.左右滑动
      currentTouchType: 0

    }
  },


  methods: {
    getApiData(callback) {
      setTimeout(() => {
        console.log('获取到数据')
        callback && callback()
      }, 3000)
    },
    onSwiperChange(event) {
      const {current} = event.detail;
      this.$emit('updateCurrent', current)
    },
    scrollReachBottom() {
      console.log('scrollReachBottom')


    },

    onTouchStart(e) {
      // 记录初始触摸位置
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;

      this.startTime = new Date().getTime(); //获取毫秒数

    },
    onTouchEnd() {
      this.startX = 0
      this.startY = 0
      this.startTime = 0
      this.currentTouchType = 0
      this.disableScrollView = false
    },
    // 上下
    handleDisableScroll() {
      if (this.currentTouchType === 2) {
        return;
      }
      this.currentTouchType = 1
      this.disableTouch = true
      this.disableScrollView = false
    },

    // 左右
    handleDisableSwiper() {
      if (this.currentTouchType === 1) {
        return;
      }
      this.currentTouchType = 2
      this.disableTouch = false
      this.disableScrollView = true
    },
    onTouchMove(e) {
      let touchTime = new Date().getTime() - this.startTime
      if (touchTime < this.minTime) return

      // 计算当前触摸位置与初始触摸位置的差异
      const deltaX = e.touches[0].clientX - this.startX;
      const deltaY = e.touches[0].clientY - this.startY;

      // 取绝对值来判断滑动的幅度大小
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      // 使用阈值比例来判断是否为对角线滑动
      if (absDeltaX > this.thresholdRatio * absDeltaY && absDeltaY > this.thresholdRatio * absDeltaX) {
        // 对角线滑动
        if (deltaX > 0 && deltaY > 0) {
          console.log('向右下滑动');
          this.handleDisableScroll()

        } else if (deltaX > 0 && deltaY < 0) {
          console.log('向右上滑动');
          this.handleDisableScroll()

        } else if (deltaX < 0 && deltaY > 0) {
          console.log('向左下滑动');
          this.handleDisableSwiper()

        } else if (deltaX < 0 && deltaY < 0) {
          console.log('向左上滑动');
          this.handleDisableSwiper()

        }
      } else if (absDeltaX > absDeltaY) {
        // 横向滑动
        if (deltaX > 0) {
          console.log('向右滑动');
        } else {
          console.log('向左滑动');
        }
        this.handleDisableSwiper()

      } else {
        // 纵向滑动
        if (deltaY > 0) {
          console.log('向下滑动');
        } else {
          console.log('向上滑动');
        }
        this.handleDisableScroll()
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

}

.swiper-view-height {
  flex: 1;
  box-sizing: border-box;
}

.wrap_content {
  //overflow-y: hidden;
}

.scroll-view {
  box-sizing: border-box;
  //border: 1px solid blueviolet;

}
</style>
