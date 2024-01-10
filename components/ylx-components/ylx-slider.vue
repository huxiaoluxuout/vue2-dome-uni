<template>
<!--  @touchmove.capture="touchmove" @touchstart.capture="touchstart"
  @touchend.capture="touchend"-->
  <view class="ylx-slider" :style="heightSlider"
        @touchmove.capture="touchmove" @touchstart.capture="touchstart" @touchend.capture="touchend">
    <swiper class="swiper-view-height" :vertical="false"  :current="currentIndex" :duration="200" :circular="false"
            @change="swiperChange">
      <swiper-item v-for="(item,index) in dataList" :key="index">

        <view class="wrap_content" :style="heightSlider" v-if="item">
          <scroll-view class="scroll-view" :scroll-y="true">
            {{ item.name }}---{{ item.order_sn }}
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid aut autem delectus dicta
              doloremque eum fuga, in laborum laudantium minus odit officia omnis quo repellat reprehenderit sapiente
              unde voluptatum.
            </div>
            <div>Ab atque distinctio, dolores modi molestias rem repellendus! Cum nemo repudiandae soluta. Asperiores,
              autem dicta eius eos id laborum, molestiae nulla officia quidem quisquam reprehenderit sed ullam veritatis
              vitae voluptatum.
            </div>
            <div>Blanditiis dicta doloribus eius id ipsa numquam perferendis reprehenderit voluptatem! Architecto
              asperiores aut consectetur distinctio dolorum ea eaque fugiat inventore iusto maxime natus necessitatibus
              possimus quo saepe, sed tenetur veritatis.
            </div>
            <div>Aperiam dolorem doloribus et eum fuga, harum, illo, in iure iusto maiores maxime modi nihil omnis
              praesentium quaerat qui quia quidem quisquam quod ratione repellat sint soluta sunt totam veritatis?
            </div>
            <div>Cum cupiditate dolores error eum eveniet exercitationem facere fugiat ipsum magni mollitia nam nesciunt
              nostrum odit optio pariatur provident, quaerat quisquam quo repellat rerum similique veniam vero
              voluptatum. Libero, odio.
            </div>
            <div>Distinctio inventore nulla odit perspiciatis. Ab alias atque commodi cum debitis dolorem earum eligendi
              eos error eveniet ex explicabo fugiat, ipsa modi nihil nostrum pariatur quis sed sunt voluptas
              voluptatibus.
            </div>
            <div>Autem, consequatur consequuntur ea earum in nulla quae? Consequatur cum deserunt dicta dolor earum
              explicabo incidunt ipsa labore minima minus molestiae officiis optio placeat quia quo recusandae
              similique, voluptate voluptatem?
            </div>
            <div>Amet consequuntur dicta distinctio eos expedita explicabo minima nemo placeat repellendus saepe
              voluptate, voluptates voluptatum! A, ab, aut debitis dicta eaque est, illo ipsam labore molestias
              perferendis quaerat temporibus veritatis.
            </div>
            <div>Deleniti incidunt modi nulla provident sed. Aut blanditiis commodi quisquam tenetur. Aliquid architecto
              assumenda aut beatae consequuntur dignissimos, illo nisi non, obcaecati optio perferendis praesentium qui
              quod recusandae repudiandae sed.
            </div>
            <div>Ad animi consequuntur, cupiditate dolorem ea eaque facere facilis hic, laboriosam necessitatibus
              nostrum omnis optio quam, recusandae rem sequi similique. Dicta explicabo facilis laboriosam magni
              perspiciatis quam voluptatibus. Deleniti, necessitatibus.
            </div>
          </scroll-view>
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
    touchmoveScrollView(event) {
      event.stopPropagation()
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
        console.log('左右滑动')
      } else if (xYStart !== 2 && Math.abs(xOffset) < Math.abs(yOffset) && Math.abs(yOffset) >= minOffset) {
        // if (xYStart === 2) return
        xYStart = 1
        this.disableTouch = true
        console.log('上下滑动')
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
  touch-action: none;
  box-sizing: border-box;
}
.wrap_content{
  overflow-y: hidden;
}

.scroll-view {
  height: 100%;
  box-sizing: border-box;
  border: 1px solid blueviolet;

}
</style>
