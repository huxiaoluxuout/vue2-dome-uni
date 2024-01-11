<template>
  <view class="ylx-slider" :style="heightSliderStyle">
    <swiper class="swiper-view-height" :vertical="false" :current="currentIndex" :disable-touch="disableTouch" :duration="200" :circular="false" @change="onSwiperChange">
      <swiper-item v-for="(item,index) in dataList" :key="index">

        <view class="wrap_content" :style="heightSliderStyle" v-if="item" @touchmove.capture="onTouchMove" @touchstart.capture="onTouchStart" @touchend.capture="onTouchEnd">
          <scroll-view class="scroll-view" :scroll-y="true" :style=" scrollViewStyle">
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
    onSwiperChange(event) {
      const {current} = event.detail;
      this.$emit('updateCurrent', current)
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
