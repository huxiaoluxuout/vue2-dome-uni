\<template>
  <view class="page">
    <swiper class="swiper" :render-whole="true" :circular="!canCircular" vertical :duration="200" @change="changed"
            :style="{height: screenHeight + 'px'}">
      <template v-for="(item, index) in displaySwiperList" >
        <swiper-item class="swiper-item" :style="{height: screenHeight + 'px'}">
          <video class="video" :style="{height: screenHeight + 'px'}" :src="item.src" autoplay controls
                 custom-cache="false" loop="false" enable-play-gesture="true" enable-progress-gesture="true"
                 show-center-play-btn="true">
          </video>
          <view class="video-text">
            <text class="tips">{{ index }}---{{ originList.length }}</text>
          </view>
        </swiper-item>
      </template>
    </swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      screenHeight: 0,
      statusBarHeight: 0,
      navBarHeight: 0,
      originList: [], // 源数据
      displaySwiperList: [], // swiper需要的数据
      displayIndex: 0, // 用于显示swiper的真正的下标数值只有：0，1，2。
      originIndex: 0, // 记录源数据的下标
      changeIndex: 0, //控制video是否渲染
      page: 0, // 视频分页
      num: 0,
      flag: true,
      showOnce: false,
    }
  },
  computed: {
    canCircular() {
      return this.originIndex !== this.originList.length - 1;
    }
  },
  onLoad() {
    this.initSystemInfo();
    this.getPageID();
  },

  methods: {
    initSystemInfo() {
      uni.getSystemInfo({
        success: ({ screenHeight, statusBarHeight, system }) => {
          this.screenHeight = screenHeight - 100;
          this.statusBarHeight = statusBarHeight;
          this.navBarHeight = system.startsWith("iOS") ? 42 : 40;
        }
      });
    },

    /* 生成随机的 pageID */
    getPageID() {
      const pageID = Math.floor(Math.random() * 10) + 1;
      this.getVideoList(pageID);
    },

    /* 获取视频数据 */
    getVideoList(pageID) {
      let data = [
        {src: 'https://minivideo.xiu123.cn/original/fa40b5e9e415435fab14d8c4f279a742/20fdc9eb-17d12597c7d.mp4'},
        {src: 'https://minivideo.xiu123.cn/original/ee17c0546f2d4a83b9cca3c7adc076f5/1f7eebd-17cea9d8f78.mp4'},
        {src: 'https://minivideo.xiu123.cn/original/ef89ed0de4e644c9bc7cda9f47bbe347/da0c8ff-17cb63cd142.mp4'},

        {src: 'https://minivideo.xiu123.cn/original/6f6953cbef3442abac1b3f674350da58/116c7a43-17ceae3c8f3.mp4'},

      ]

      this.originList = data.map(item => ({ src: item.src }));
      if (this.flag) {
        this.flag = false;
        this.initSwiperData(0);
      }
    },
    changed({ detail: { current } }) {
      this.showOnce = false;
      this.updateIndexes(current);
      this.initSwiperData();
      this.checkAndFetchNewData();
    },

    initSwiperData() {
      const originListLength = this.originList.length;
      const prevIndex = this.getWrappedIndex(this.originIndex - 1, originListLength);
      const nextIndex = this.getWrappedIndex(this.originIndex + 1, originListLength);
      const displayList = [];
      displayList[this.displayIndex] = this.originList[this.originIndex];
      displayList[this.getWrappedIndex(this.displayIndex - 1, 3)] = this.originList[prevIndex];
      displayList[this.getWrappedIndex(this.displayIndex + 1, 3)] = this.originList[nextIndex];

      this.displaySwiperList = displayList;
    },
    getWrappedIndex(index, max) {
      return (index + max) % max;
    },
    updateIndexes(current) {
      // 更新swiper中的显示索引
      this.displayIndex = current;

      // 根据swiper的当前索引更新原始列表中的索引
      // 假设displaySwiperList是一个长度为3的数组，当前项在中间
      if (current === 1) {
        // 如果当前显示的是中间项，不需要更新originIndex
        return;
      } else if (current === 2) {
        // 如果当前显示的是最后一项，originIndex向后移动一位
        this.originIndex = (this.originIndex + 1) % this.originList.length;
      } else if (current === 0) {
        // 如果当前显示的是第一项，originIndex向前移动一位
        this.originIndex = (this.originIndex - 1 + this.originList.length) % this.originList.length;
      }
    },

    checkAndFetchNewData() {
      // 假设当用户浏览到列表的最后3个视频时，开始加载更多数据
      if (this.originIndex >= this.originList.length - 3) {

        let resData = [
          {src: 'https://minivideo.xiu123.cn/original/fa40b5e9e415435fab14d8c4f279a742/20fdc9eb-17d12597c7d.mp4'},
          {src: 'https://minivideo.xiu123.cn/original/ee17c0546f2d4a83b9cca3c7adc076f5/1f7eebd-17cea9d8f78.mp4'},
          {src: 'https://minivideo.xiu123.cn/original/ef89ed0de4e644c9bc7cda9f47bbe347/da0c8ff-17cb63cd142.mp4'},

          {src: 'https://minivideo.xiu123.cn/original/6f6953cbef3442abac1b3f674350da58/116c7a43-17ceae3c8f3.mp4'},

        ]
        setTimeout(()=>{
          this.originList = this.originList.concat(resData.map(item => ({ src: item.src })));

        },1000)

      }
    }

  }
}
</script>

<style scoped>
.page {
  width: 750rpx;
}

.swiper {
  width: 750rpx;
  background: #cc9227;
  transform: translateZ(0);
}

.swiper-item {
  width: 750rpx;
  transform: translateZ(0);
}

.video {
  border: 1px solid greenyellow;
  width: 750rpx;
}

.video-text {
  position: absolute;
  margin-left: 32rpx;
  width: 580rpx;
  bottom: 200rpx;
  z-index: 9999;
}

.tips {
  width: 560rpx;
  font-size: 26rpx;
  color: #ffffff;
}
</style>
