<template>
  <view class="page-swiper">
    <!--swiper实现整屏划动播放视频-->
    <swiper class="content-wrapper" :render-whole="true" :circular="false" vertical :duration="200" @change="swiperChanged">
      <swiper-item class="content-wrapper" v-for="(item,index) in originList" :key="item.id">
        <view class="content-wrapper video-box">
          <video class="content-wrapper" v-if="index===showVideoIndex" :src="item.src" :autoplay="true" :controls="true"
                 :custom-cache="false" :loop="false" :enable-play-gesture="true" :enable-progress-gesture="true"
                 :show-center-play-btn="true">
          </video>

          <!-- 文本标题 -->
          <view class="video-text">
            <text class="tips">{{ index + 1 }} / {{ originList.length }}</text>
          </view>
        </view>

      </swiper-item>

    </swiper>


  </view>
</template>

<script>
import {uuid} from "@/utils/tools";


export default {
  data() {
    return {

      originList: [], // 源数据
      showVideoIndex: 0, //控制video是否渲染

      page: 1, // 视频分页
      pageSize: 5
    }
  },
  onLoad() {
    this.getPageID()
  },

  methods: {

    /* 生成随机的 pageID */
    getPageID() {
      let pageID = Math.floor(Math.random() * (10 - 1 + 1) + 1);
      // console.log('pageID', pageID)
      this.getVideoList(pageID)
    },
    /* 获取视频数据 */
    getVideoList() {
      let data = [
        {src: 'https://minivideo.xiu123.cn/original/ef89ed0de4e644c9bc7cda9f47bbe347/da0c8ff-17cb63cd142.mp4'},

        {src: 'https://minivideo.xiu123.cn/original/6f6953cbef3442abac1b3f674350da58/116c7a43-17ceae3c8f3.mp4'},

        {src: 'https://minivideo.xiu123.cn/original/fa40b5e9e415435fab14d8c4f279a742/20fdc9eb-17d12597c7d.mp4'},

        {src: 'https://minivideo.xiu123.cn/original/ee17c0546f2d4a83b9cca3c7adc076f5/1f7eebd-17cea9d8f78.mp4'},

        {src: 'https://minivideo.xiu123.cn/original/bcd3baf4ecf0483eb29029a41aafd63d/1eac7c0a-17cd8c270d1.mp4'},

        /*  {src: 'https://minivideo.xiu123.cn/original/8e6c3b4ea0c2464cb1f0f88f71ead849/21f175f6-17cd9ee3e1d.mp4'},

          {src: 'https://minivideo.xiu123.cn/original/8e9f69b67bbc41a8b635b48f0eda5aa3/594e99e-17ce0639948.mp4'},
          {src: 'https://minivideo.xiu123.cn/original/352bcaafa00944b48e627d7f8464616b/4518875b-17cca60d244.mp4'},
          {src: 'https://minivideo.xiu123.cn/original/9e28a4a7c7ed475ebd82cc10d421d4a7/3d0c3607-17cbb52e55f.mp4'},*/
      ]

      data.forEach((item, index) => {
        //取源数据的部分属性组合成新的数组
        this.originList.push({
          src: item.src,
          id: uuid(),
        })
      })
      this.page++
    },

    swiperChanged({detail: {current}}) {
      let len = this.originList.length
      let pageIndex = (len / this.pageSize)
      let x = (pageIndex * this.pageSize) - (this.pageSize - 2);

      console.log(x + 1, current)

      if (current > this.showVideoIndex) {

        if (current === x) {
          console.log('更新数据')
          this.getPageID()

        }
      } else {
        console.log('向上一个滑动，更新数据')
      }

      this.showVideoIndex = current;

    },

  }
}
</script>

<style scoped>
.page-swiper {
  width: 750rpx;
  display: flex;
  flex-direction: column;
  flex: 1;
  /* #ifndef APP-NVUE */
  height: 100vh;
  /* #endif */
}

.content-wrapper {
  width: 750rpx;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.video-box {
  position: relative;
}

.video-text {
  position: absolute;
  width: 700rpx;
  bottom: 150rpx;
  z-index: 9999;
  margin-left: 50rpx;
}

.tips {
  width: 560rpx;
  font-size: 26rpx;
  color: #ffffff;
}
</style>
