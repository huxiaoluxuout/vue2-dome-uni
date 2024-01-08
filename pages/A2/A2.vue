<template>
  <div class="content">
    <div class="title">{{ currentOriginIndex + 1 }}/{{ originList.length }}</div>
    <swiper class="swiper" :circular="localCircular" :disable-touch="false" @change="handleSwiperChange"
            swiperDuration="250">
      <swiper-item v-for="(item, index) in displaySwiperList" :key="index">
        <div class="wrap_content">{{ item }}</div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      originList: [], // 原始数据列表
      displaySwiperList: [], // Swiper需要的数据列表
      currentDisplayIndex: 0, // 当前显示的Swiper索引，只能为0、1、2
      currentOriginIndex: 0, // 当前显示的原始数据索引
      circular: false, //
      localCircular: false, //
    };
  },
  // computed:{
  //   localCircular() {
  //
  //   },
  // },
  methods: {
    /**
     * 初始化Swiper数据
     * @param {Number} originIndex 从原始数据的哪个索引开始显示，默认为0
     */
    initSwiperData(originIndex = this.currentOriginIndex) {
      const originListLength = this.originList.length;
      const displayList = [];

      const currentDisplayIndex = this.currentDisplayIndex;
      const prevDisplayIndex = currentDisplayIndex === 0 ? 2 : currentDisplayIndex - 1;
      const nextDisplayIndex = currentDisplayIndex === 2 ? 0 : currentDisplayIndex + 1;

      displayList[currentDisplayIndex] = this.originList[originIndex];
      displayList[prevDisplayIndex] = this.originList[originIndex === 0 ? originListLength - 1 : originIndex - 1];
      displayList[nextDisplayIndex] = this.originList[originIndex === originListLength - 1 ? 0 : originIndex + 1];

      this.displaySwiperList = displayList;
    },

    /**
     * Swiper滑动时触发
     */
    handleSwiperChange(event) {
      const {current} = event.detail;
      const diff = this.currentDisplayIndex - current;
      const originListLength = this.originList.length;


      if (diff === 2 || diff === -1) {
        // 向后滑动，更新数据
        console.log('向后滑动，更新数据', this.currentOriginIndex,originListLength-2)
        if (!this.circular && this.currentOriginIndex === 0) {
          console.log('2向后滑动，更新数据')

          this.localCircular = true
        }/* if (!this.circular && this.currentOriginIndex === originListLength - 2) {
          console.log('2向后滑动，更新数据')

          this.localCircular = false
        }*/
        this.currentOriginIndex = (this.currentOriginIndex + 1) % originListLength;
        this.currentDisplayIndex = (this.currentDisplayIndex + 1) % 3;
        this.initSwiperData();
      } else if (diff === -2 || diff === 1) {
        // 向前滑动，更新数据
        // console.log('向前滑动，更新数据')
        if (!this.circular && this.currentOriginIndex === 1) {
          this.localCircular = false
        }
        this.currentOriginIndex = (this.currentOriginIndex - 1 + originListLength) % originListLength;
        this.currentDisplayIndex = (this.currentDisplayIndex - 1 + 3) % 3;
        this.initSwiperData();
      }
    },
  },
  created() {
    for (let i = 1; i <= 5; i++) {
      this.originList.push(i);
    }
    this.initSwiperData();
  },
};
</script>

<style>
.title {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

.swiper {
  height: calc(100vh - 120px);
}

.wrap_content {
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: gray;
  height: 100vh;
  color: aqua;
  font-size: 80px;
  margin: 0 40px;
}
</style>
