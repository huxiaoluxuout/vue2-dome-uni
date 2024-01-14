<template>
  <view class="root-zshu-tabs">

    <swiper class="swiper" :style="[{height:swiperHeight+'px'}]" :current="current" @transition="swiperTransition" @animationfinish="swiperAnimationfinish">
      <swiper-item class="swiper-item" v-for="(item, index) in tabList" :key="index">
        <!-- 这里的sticky-swiper-next-item为demo中为演示用定义的组件，列表及分页代码在sticky-swiper-next-item组件内 -->
        <!-- 请注意，sticky-swiper-next-item非z-paging内置组件，在自己的项目中必须自己创建，若未创建则会报组件不存在的错误 -->
        <zpaging-sticky-swiper-next-item ref="swiperList" :tabIndex="index" :currentIndex="current" @heightChanged="heightChanged">
        </zpaging-sticky-swiper-next-item>
      </swiper-item>
    </swiper>

  </view>

</template>
<script>



export default {

  props: {},
  data() {
    return {
      swiperHeight: 0,
      tabList: ['测试1', '测试2', '测试3', '测试4'],
      current: 0, // tabs组件的current值，表示当前活动的tab选项
    }
  },
  computed: {

  },
  mounted() {

  },

  methods: {

    // 当滚动到底部时，通知当前显示的列表加载更多
    scrolltolower(){
      this.$refs.swiperList[this.current].doLoadMore();
    },
    // swiper滑动中
    swiperTransition(e) {
      // this.$refs.tabs.setDx(e.detail.dx);
    },
    // swiper滑动结束
    swiperAnimationfinish(e) {
      this._setCurrent(e.detail.current);
      // this.$refs.tabs.unlockDx();
    },
    // 设置swiper的高度
    heightChanged(height){
      if(height === 0){
        // 默认swiper高度为屏幕可用高度-tabsView高度-slot="top"内view的高度
        // 注意：uni.upx2px(80)不是固定的，它等于slot="top"内view的高度，如果slot="top"内view的高度不为80rpx，则需要修改这个值
        height = uni.getSystemInfoSync().windowHeight - uni.upx2px(80);
      }
      this.swiperHeight = height;
    },
    _setCurrent(current){
      if (current !== this.current){
        //切换tab时，将上一个tab的数据清空
        this.$refs.swiperList[this.current].clear();
      }
      this.current = current;
    }

  },


}

</script>

<style scoped lang="scss">

</style>

