<template>
<!--  @touchmove.capture="touchmove" @touchstart.capture="touchstart"
  @touchend.capture="touchend"-->
  <view class="ylx-slider" :style="heightSlider" >
    <swiper class="swiper-view-height" :current="currentIndex" :duration="200" :circular="false"
            @change="swiperChange">
      <swiper-item v-for="(item,index) in dataList" :key="index">

        <view class="wrap_content" :style="heightSlider" v-if="item">
          {{ index }}
          {{ item.name }}---{{ item.order_sn }}
          <view>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur culpa dicta ea earum exercitationem similique. Delectus dignissimos excepturi
            expedita inventore perferendis, possimus quam quibusdam recusandae reiciendis reprehenderit tempora voluptatibus.
          </view>
          <view>A ad animi assumenda at commodi consectetur culpa debitis dolor doloremque doloribus eius eligendi exercitationem facere id inventore magnam maxime non omnis,
            pariatur perferendis repudiandae rerum suscipit veritatis voluptates voluptatibus?
          </view>
          <view>Aperiam consectetur cum distinctio doloremque modi quaerat quam quo reiciendis voluptates. Aperiam consequatur dolor enim expedita impedit incidunt iusto quos
            voluptates! Eaque eveniet facere hic incidunt quos, ratione voluptate voluptates!
          </view>
          <view>Accusantium beatae consectetur cupiditate dolore doloribus error ipsum iste iusto nihil, nobis nostrum qui quis sapiente suscipit vel veritatis voluptatem
            voluptatum. Expedita id laudantium officia perspiciatis, quis rem totam voluptatibus!
          </view>
          <view>Aliquam atque magnam officiis quidem sapiente soluta vitae? Cum, cupiditate ea eius facilis hic illum incidunt ipsam iure iusto, neque non nostrum optio, quisquam
            tempora temporibus totam ut velit veniam.
          </view>
          <view>Accusamus aperiam aspernatur aut blanditiis consequatur corporis cum debitis ducimus illum laudantium modi natus neque quae quas, quis quo reiciendis repellat
            reprehenderit repudiandae sint. Consequatur expedita itaque magni maiores quisquam!
          </view>
          <view>Accusantium ad assumenda beatae cupiditate dicta dolor earum expedita fugiat in labore magni modi, necessitatibus neque nisi nobis nostrum odit officia perferendis
            quas quasi quia reprehenderit soluta suscipit veritatis voluptas.
          </view>
          <view>Aperiam consectetur error fugiat modi sapiente veniam voluptatum! Adipisci eius ex exercitationem facilis laudantium quae saepe temporibus vel. Amet enim fugiat
            nisi nulla praesentium quaerat reiciendis reprehenderit temporibus ullam voluptates.
          </view>
          <view>A adipisci animi asperiores blanditiis commodi consequatur corporis delectus excepturi, illum impedit ipsam laboriosam maiores nihil nisi nobis quidem ratione rerum
            tempore ullam voluptate? Ab ducimus error facilis inventore quibusdam!
          </view>
          <view>Blanditiis dolorum ducimus eum optio quis ratione similique sit! Aliquid architecto blanditiis dicta enim esse facere laudantium magnam molestiae numquam possimus
            quisquam sed, veniam veritatis! Eius iusto non numquam voluptate?
          </view>
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

  },


  data() {
    return {
      disableTouch: false,
    }
  },

  methods: {

    swiperChange(event) {
      const {current} = event.detail;
      /*if (current > this.currentIndex) {
        console.log('向左滑动',!this.dataList[current])
        if (!this.dataList[current]) {
          // this.$emit('setDataList', current)
        }
      } else if (current < this.currentIndex) {
        console.log('向右滑动')
      }*/
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
.wrap_content{
  overflow-y: auto;
}
</style>
