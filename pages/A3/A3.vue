<template>
  <div class="content">
    <div class="title">{{ currentDisplayIndex + 1 }}/{{ originList.length }}</div>
    <swiper class="swiper" :circular="false" :disable-touch="false" :current="currentDisplayIndex" @change="handleSwiperChange"
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
      currentDisplayIndex: 0, // 当前显示的Swiper索引
      currentOriginIndex: 0, // 当前显示的原始数据索引
      circular: false, //
      localCircular: false, //
      N: 1
    };
  },
  // computed:{
  //   localCircular() {
  //
  //   },
  // },
  created() {
    for (let i = 1; i <= 1100; i++) {
      this.originList.push(i);
    }
    const list = []
    list[0] = this.originList[0]
    list[1] = this.originList[1]
    list[2] = this.originList[2]
    this.displaySwiperList = list

  },
  methods: {


    handleSwiperChange(event) {
      const {current} = event.detail;
      let len1 = this.originList.length
      let len2 = this.displaySwiperList.length
      let currentOriginIndex = current + 1
      if (this.currentDisplayIndex < current) {

        if (current === this.N * 3 - 1) {

          if (len1 > len2) {
            const itemsToAdd = []
            if (len1 - len2 >= 3) {
              itemsToAdd[0] = this.originList[currentOriginIndex]
              itemsToAdd[1] = this.originList[currentOriginIndex + 1]
              itemsToAdd[2] = this.originList[currentOriginIndex + 2]
              this.N++
            } else if (len1 - len2 >= 2) {
              itemsToAdd[0] = this.originList[currentOriginIndex]
              itemsToAdd[1] = this.originList[currentOriginIndex + 1]
            } else if (len1 - len2 >= 1) {
              itemsToAdd[0] = this.originList[currentOriginIndex]
            }

            this.displaySwiperList.push(...itemsToAdd)
          }
        }

      } else if (this.currentDisplayIndex > current) {
        console.log('向前滑动')
      }

      this.currentDisplayIndex = current

    },
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
