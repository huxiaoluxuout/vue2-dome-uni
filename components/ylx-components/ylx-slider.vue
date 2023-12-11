<template>

  <view class="ylx-slider" @touchmove.capture="touchmove" @touchstart.capture="touchstart" @touchend.capture="touchend">

      <swiper class="swiper-view-height" :current="currentIndex" :duration="200" @change="changeSwipeIndex" :disable-touch="disableTouch">
        <swiper-item v-for="(item,index) in dataList" :key="index">
<!--          <view style="border: 1px solid blueviolet;font-size: 20px;color:red;">{{index}}</view>-->
          <ylxScrollView :is-loading="isLoading">
            <template #default>
              <slot name="content" :item="item"></slot>
            </template>
          </ylxScrollView>
        </swiper-item>
      </swiper>

  </view>
</template>

<script>
import ylxScrollView from "./components/ylx-scroll-view.vue";
import ylxForSlot from "./components/ylx-for-slot.vue";

let startClientX = 0, startClientY = 0;
let minOffset = 5, minTime = 100;//最小偏移量,最小间隔时间
let startTime = 0;//开始时的毫秒数
let xYStart = 0;//锁定滑动方向 1.上下滑动 2.左右滑动
export default {
  name: 'ylx-slider',
  components: {
    ylxScrollView,
    ylxForSlot
  },
  props: {
    type: {
      type: Number,
      default: 1
    },
    tabBarList: {
      type: Array,
      default: () => []
    },
    ylxTabBarBgc:{
      type: String,
      default:'#fff'
    },
    dataList: {
      type: Array,
      default: () => [

      ]
    },
    size: {
      type: [Number, String],
      default: 14
    },
    // =======================

    isEmpty: {
      type: Boolean,
      default: false
    },

    isLoading: {
      type: Boolean,
      default: true
    },

    currentIndex: {
      type: Number,
      default: 0

    },
  },


  data() {
    return {

      disableTouch: false,
      circular: true,
      //=======================
      originList: [], // 源数据
      displaySwiperList: [], // swiper需要的数据
      displayIndex: 0, // 用于显示swiper的真正的下标数值只有：0，1，2。
      originIndex: 0, // 记录源数据的下标
    }
  },


  methods: {

    //==================
    changeSwipeIndex(event) {
      this.$emit('updateCurrentIndex',event.detail.current)
    },

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

  height: calc(100vh - var(--tabbar-height) - var(--window-top));
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
