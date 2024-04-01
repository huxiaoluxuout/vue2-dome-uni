<template>
  <view>
    <!--swiper实现整屏划动播放视频-->
    <swiper class="swiper" :circular="!canCircular" vertical :duration="200" @transition="transition" @change="changed"
            :style="{height: screenHeight-navBarHeight +'px'}">

      <swiper-item class="swiper-item" v-for="(item,index) in displaySwiperList" :key="index">
        <!-- v-if="index==changeIndex" 只渲染当前页的视频，能够有效解决数组不断追加后引起黑屏的问题 -->
        <video class="video" v-if="index===changeIndex" :src="item.src" :autoplay="true" :controls="true"
               :custom-cache="false" :loop="false" :enable-play-gesture="true" :enable-progress-gesture="true"
               :show-center-play-btn="true">
        </video>
        <!-- 文本标题 -->
        <view class="video-text">
          <view class="tips"> {{ item.title }}</view>
        </view>
      </swiper-item>

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
      flag: true
    }
  },
  computed: {
    canCircular() {
      // console.log('canCircular',(this.originIndex + 1 === this.originList.length ? 0 : this.originIndex + 1) === 1)

      return (this.originIndex + 1 === this.originList.length ? 0 : this.originIndex + 1) === 1;
    }
  },
  onLoad() {
    /* 获取系统信息 */
    uni.getSystemInfo({
      success: (res) => {
        // 获取屏幕高度
        this.screenHeight = res.screenHeight
        // 获取状态栏高度
        this.statusBarHeight = res.statusBarHeight
        // 通过操作系统 确定自定义导航栏高度
        if (res.system.substring(0, 3) === "iOS") {
          this.navBarHeight = 42
        } else {
          this.navBarHeight = 40
        }
      }
    })

    // 调用函数
    this.getPageID()

  },

  methods: {
    transition(e) {
      // console.log(e)
      let originListLength = this.originList.length;
      if ((this.originIndex + 1 === originListLength ? 0 : this.originIndex + 1) === 1 && e.detail.dy < -100) {
        uni.showToast({
          title: '已经到顶了',
          icon: 'none'
        })
      }
    },
    /* 生成随机的 pageID */
    getPageID() {
      let pageID = Math.floor(Math.random() * (10 - 1 + 1) + 1);
      // console.log('pageID', pageID)
      this.getVideoList(pageID)
    },
    /* 获取视频数据 */
    getVideoList(pageID) {
      let data = [
        {src: 'https://minivideo.xiu123.cn/original/6f6953cbef3442abac1b3f674350da58/116c7a43-17ceae3c8f3.mp4'},

        {src: 'https://minivideo.xiu123.cn/original/fa40b5e9e415435fab14d8c4f279a742/20fdc9eb-17d12597c7d.mp4'},
        {src: 'https://minivideo.xiu123.cn/original/ee17c0546f2d4a83b9cca3c7adc076f5/1f7eebd-17cea9d8f78.mp4'},
        {src: 'https://minivideo.xiu123.cn/original/ef89ed0de4e644c9bc7cda9f47bbe347/da0c8ff-17cb63cd142.mp4'},

 /*       {src: 'https://minivideo.xiu123.cn/original/bcd3baf4ecf0483eb29029a41aafd63d/1eac7c0a-17cd8c270d1.mp4'},
        {src: 'https://minivideo.xiu123.cn/original/8e6c3b4ea0c2464cb1f0f88f71ead849/21f175f6-17cd9ee3e1d.mp4'},

        {src: 'https://minivideo.xiu123.cn/original/8e9f69b67bbc41a8b635b48f0eda5aa3/594e99e-17ce0639948.mp4'},
        {src: 'https://minivideo.xiu123.cn/original/352bcaafa00944b48e627d7f8464616b/4518875b-17cca60d244.mp4'},
        {src: 'https://minivideo.xiu123.cn/original/9e28a4a7c7ed475ebd82cc10d421d4a7/3d0c3607-17cbb52e55f.mp4'},*/
      ]

      data.forEach(item => {
        //取源数据的部分属性组合成新的数组
        let obj = {}
        obj.src = item.src
        this.originList.push(obj)
      })
      //解决首次加载页面的时候没有画面的问题
      if (this.flag) {
        this.flag = false
        this.initSwiperData(0)
      }

      /*uni.request({
        url: 'https://api.apiopen.top/api/getMiniVideo?page=' + pageID + '&size=10&pageSize=10', // 请求数据接口
        data: {},
        success: (res) => {
          if (res.data.code === 200) {
            res.data.result.list.forEach(item => {
              //取源数据的部分属性组合成新的数组
              let obj = {}
              obj.src = item.playurl
              obj.title = item.title

              this.originList.push(obj)
            })
          }
          //解决首次加载页面的时候没有画面的问题
          if (this.flag) {
            this.flag = false
            this.initSwiperData(0)
          }

        }
      })*/
    },

    changed(event) {
      let {
        current
      } = event.detail;
      let originListLength = this.originList.length;
      this.changeIndex = current;
      // console.log(this.displayIndex,current)
      // 如果两者的差为2或者-1则是向后滑动
      if (this.displayIndex - current === 2 || this.displayIndex - current === -1) {
        this.originIndex = this.originIndex + 1 === originListLength ? 0 : this.originIndex + 1;
        this.displayIndex = this.displayIndex + 1 === 3 ? 0 : this.displayIndex + 1;

        // console.log('this.originIndex',this.originIndex)

        this.initSwiperData(this.originIndex);
        //如果滑到最后一条，请求新数据
        this.num++
        // console.log('num', this.num, this.originList.length)
        if (this.num + 5 >= this.originList.length) {

          this.getPageID()
        }
      }
      // 如果两者的差为-2或者1则是向前滑动
      else if (this.displayIndex - current === -2 || this.displayIndex - current === 1) {
        this.originIndex = this.originIndex - 1 === -1 ? originListLength - 1 : this.originIndex - 1;
        this.displayIndex = this.displayIndex - 1 === -1 ? 2 : this.displayIndex - 1;
        this.initSwiperData(this.originIndex);

        if (this.num > 0) {
          this.num--
        }
      }
    },

    initSwiperData(originIndex = this.originIndex) {
      // console.log(this.displayIndex,originIndex)
      // 0 0
      // 1 1
      // 2 2
      // 0 3
      // 1 4
      //源数据长度
      let originListLength = this.originList.length;
      let displayList = [];
      displayList[this.displayIndex] = this.originList[originIndex];
      displayList[this.displayIndex - 1 === -1 ? 2 : this.displayIndex - 1] = this.originList[originIndex - 1 === -1 ? originListLength - 1 : originIndex - 1];
      displayList[this.displayIndex + 1 === 3 ? 0 : this.displayIndex + 1] = this.originList[originIndex + 1 === originListLength ? 0 : originIndex + 1];
      // console.log(originIndex, (originIndex - 1 == -1 ? originListLength - 1 : originIndex - 1), (originIndex +
      // 	1 == originListLength ? 0 : originIndex + 1))
      // 0 9 1
      // 1 0 2
      // 2 1 3
      // 3 2 4
      // 4 3 5
      //刷新数据

      this.displaySwiperList = displayList;
      console.log('displayList',displayList)

      // console.log(this.displaySwiperList,this.originList)
    },
  }
}
</script>

<style>
.swiper {
  width: 100%;
  background: #cc9227
}

.swiper-item {
  height: 100%;
  width: 100%
}

.video {
  height: 96%;
  border: 1px solid greenyellow;
  width: 100%
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
