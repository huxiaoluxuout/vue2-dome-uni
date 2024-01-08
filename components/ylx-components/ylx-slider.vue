<template>

  <view class="ylx-slider" :style="heightSlider" @touchmove.capture="touchmove" @touchstart.capture="touchstart" @touchend.capture="touchend">
    <swiper class="swiper-view-height" :current="swiperCurrentIndex" :duration="200" :circular="true" @change="swiperChange">
      <swiper-item v-for="(item,index) in swiperList" :key="index">
        <view class="wrap_content">
          {{ index }} --- {{ item }}
        </view>
      </swiper-item>
    </swiper>

  </view>
</template>

<script>


import {ylxStyleObjectToString} from "@/utils/uniTools";
import index from "@/pages/index/index.vue";

let startClientX = 0, startClientY = 0;
let minOffset = 5, minTime = 100;//最小偏移量,最小间隔时间
let startTime = 0;//开始时的毫秒数
let xYStart = 0;//锁定滑动方向 1.上下滑动 2.左右滑动
export default {
  name: 'ylx-slider',

  props: {

    dataList: {
      type: Array,
      default: () => []
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
    otherHeight: {
      type: Number,
      default: 0
    }
  },
  computed: {
    // height: calc(100vh - var(--tabbar-height) - var(--window-top));
    heightSlider() {
      return `height:calc(100vh - var(--tabbar-height) - var(--window-top) - ${this.otherHeight}px )`
      /* return ylxStyleObjectToString({
         'color': this.color,
         'fontSize': this.size + 'px',

       })*/
    },
  },


  data() {
    return {

      swiperList: [6,1,2], // swiper需要的数据
      swiperCurrentIndex: 0, // 用于显示swiper的真正的下标数值只有：0，1，2。

      originList: [1,2,3,4,5,6], // 源数据
      originDataIndex: 0, // 记录源数据的下标

      disableTouch: false
    }
  },
  created() {
    /*for (let i = 1; i <= 1300; i++) {
      this.originList.push(i);
    }*/
    // this.initSwiperData();
    // 5
    // 1 2 3 4 5

    // 4 0 1
    // 1 2 3
    // 2 3 4


    // 0   4 0 1
    // 1   0 1 2
    // 2   1 2 3
    // 3   2 3 4
    // 4   3 4 0

  },


  methods: {
    /**
     * 初始一个显示的swiper数据
     * @originIndex  从源数据的哪个开始显示默认0，如从其他页面跳转进来，要显示第n个，这个参数就是他的下标
     */
    initSwiperData() {
  /*    const originListLength = this.originList.length; // 源数据长度

      let index = this.originIndex
      console.log({index})
      const displayList = [];
      if (index === 0) {
        displayList[0] = this.originList[originListLength - 1]
      } else {
        displayList[0] = this.originList[index - 1]
      }
      displayList[1] = this.originList[index]
      if (index === originListLength - 1) {
        displayList[2] = this.originList[0]
      } else {
        displayList[2] = this.originList[index + 1]

      }
      this.displaySwiperList = displayList;*/
    },
    setSwiperData() {
      const originListLen = this.originList.length; // 源数据长度
      // let index = this.originIndex
      console.log({index})

    },

    /**
     * swiper滑动时候
     */
    swiperChange(event) {
      const {current} = event.detail;
      console.log(current)
      if(current===0){
        // this.swiperList[]
      }
      /*if(current> this.swiperCurrentIndex){
        console.log('左滑')
      }else {
        console.log('右滑')

      }
      this.swiperCurrentIndex = current
      this.setSwiperData()*/
      /* const originListLength = this.originList.length; // 源数据长度
       // =============向后==========
       if (this.displayIndex - current == 2 || this.displayIndex - current == -1) {
         this.originIndex = this.originIndex + 1 == originListLength ? 0 : this.originIndex + 1;
         this.displayIndex = this.displayIndex + 1 == 3 ? 0 : this.displayIndex + 1;
         this.initSwiperData(this.originIndex);
       }
       // ======如果两者的差为-2或者1则是向前滑动============
       else if (this.displayIndex - current == -2 || this.displayIndex - current == 1) {
         this.originIndex = this.originIndex - 1 == -1 ? originListLength - 1 : this.originIndex - 1;
         this.displayIndex = this.displayIndex - 1 == -1 ? 2 : this.displayIndex - 1;
         this.initSwiperData(this.originIndex);
       }*/
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
