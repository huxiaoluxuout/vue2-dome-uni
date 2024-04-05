<template>
  <view class="page">


    <!--    <zshu-uploadimg ref="uploadImg" columns-limit="2" gap="10px" scale="1.58" limit="13"
                        hidden-upload-icon img-width="150px"
                        :fileImageList="fileImageList" @updateFileImageList="updateFileImageList"
        >
        </zshu-uploadimg>

        <u-button type="primary" :plain="true" text="zshu-uploadimg" @click="openUploadImg"></u-button>-->


    <u-button type="primary" :plain="true" text="仿抖音页面" @click="$u.route('/pages/dou_yin/dou_yin')"></u-button>

    <u-button type="primary" :plain="true" text="N-仿抖音页面"
              @click="$u.route('/pages/n_dou_yin/n_dou_yin')"></u-button>
    ------------------------------
    <u-button type="primary" :plain="true" text="OnGlobEventtabbar2" @click="OnGlobEventtabbar2"></u-button>

    <u-button type="primary" :plain="true" text="tabbar2" @click="tabbar2"></u-button>

    <u-button type="primary" :plain="true" text="OnGlobEventtabbar3" @click="OnGlobEventtabbar3"></u-button>

    <u-button type="primary" :plain="true" text="tabbar3" @click="tabbar3"></u-button>

    <u-button type="primary" :plain="true" text="OnGlobEventA1" @click="OnGlobEventA1"></u-button>

    <u-button type="primary" :plain="true" text="A1" @click="A1"></u-button>


    <!--    <u-button type="primary" :plain="true" text="EventBusClick2" @click="EventBusClick2"></u-button>-->
    <!--    <u-button type="primary" :plain="true" text="N-仿抖音页面2" @click="$u.route('/pages/n_dou_yin/n_dou_yin_2')"></u-button>-->

    <!--    <u-button type="primary" :plain="true" text="BindingX" @click="$u.route('/pages/n_BindingX/n_BindingX')"></u-button>-->

    <view style="position: fixed;bottom: 0;">
      <tabbar :INDEX="0"></tabbar>

    </view>


  </view>
</template>

<script>
import ZshuNavbar from "@/components/zshu-components/zshu-navbar.vue";

import {ylxNavigateTo} from "@/utils/uniTools";

// import mixinsYlxUniEventBus from "@/mixins/mixinsYlxUniEventBus";


import ZshuUploadimg from "@/components/zshu-components/zshu-uploadimg.vue";

import {data} from "test/data.json"
import {startTimer, uuid, simulateOperation} from "@/utils/tools";
import mixinsOnRegisterEvent from "@/mixins/mixinsOnRegisterEvent";


export default {
  components: {ZshuNavbar, ZshuUploadimg},
  mixins: [mixinsOnRegisterEvent],
  data() {
    return {

      activeId: 2,
      //   ---------------------

      fileImageList: [{
        url: 'https://images-jinti.oss-cn-hangzhou.aliyuncs.com/5fa1201ea36ad.jpg'
      },/* {
        url: 'https://app-jinti.oss-cn-hangzhou.aliyuncs.com/uploads/20240107/f790552571bb4888293896d289b00295.png'
      }*/],
      // -------------------------------------
      imageValue: [],
      uniChooseImageValue: [],
      goodsList: [],


      videoList: data,
      page: 1,
      pageSize: 10

    }
  },
  onLoad() {
    // 注册事件监听器
    this.$EventBus.on('myEvent', this.listener);
  },
  computed: {},
  methods: {
    // -------------------------------
    ylxNavigateTo,

    // ---------------------------------------------
    // 上传图片
    openUploadImg() {
      this.$refs.uploadImg.chooseFile()
    },
    updateFileImageList({type, param}) {
      if (type === 'del') {
        this.fileImageList.splice(param, 1)
      } else if (type === 'uploading') {
        this.fileImageList.push(param)
      } else if (type === 'success') {
        this.fileImageList.splice(param.fileImageListLen, param.num, param.itemAssign)
      }
    },

    // ---------------------------------------------
    getVideoList(callback) {
      console.log('getVideoList',)
      typeof callback === 'function' && callback('getVideoList')

      return
      simulateOperation().then(res => {
        console.log('res', res)
        data.forEach(item => item.id = uuid())
        this.videoList = [...this.videoList, ...data]
        if (this.page === 1) {

        }
        this.page++


      }).catch(err => {
        console.log('err', err)
      })

      /*uni.request({
        url: 'https://api.apiopen.top/api/getMiniVideo?page=' + this.page + '&pageSize=' + this.pageSize, // 请求数据接口
        data: {},
        success: (resData) => {

          let res = JSON.parse(JSON.stringify(resData))
          res.data.result.list.forEach(item => item.id = uuid())

          if (res.data.code === 200) {

            if (this.page === 1) {
              this.originList = [...this.originList, ...res.data.result.list]
              this.setVideoShow(0)
              this.setVideoContext(0)
              this.$nextTick(() => {
                startTimer(() => {
                  this.videoContext.play()
                }, 200)
              })
            } else {
              this.$nextTick(() => {
                this.originList = [...this.originList, ...res.data.result.list];
              });

            }

            this.page++
          }
        }
      })*/

    },
    listener(msg) {
      console.log('listener', msg)
    },

    EventBusClick() {

      uni.$emit('OnGlobEvent', {eventName: '/pages/n_dou_yin/n_dou_yin', handler: this.getVideoList})

    },

    EventBusClick2() {

      this.$EventBus.emit('OnGlobEvent', {eventName: '/pages/dou_yin/dou_yin', handler: this.getVideoList})
    },


    OnGlobEventtabbar2() {

      uni.$emit('OnGlobEvent', {
        type: 'switchTab',
        eventName: '/pages/tabbar2/tabbar2',
        handler: this.getVideoList
      })

    },

    OnGlobEventtabbar3() {

      uni.$emit('OnGlobEvent', {
        type: 'switchTab',
        eventName: '/pages/tabbar3/tabbar3',
        handler: this.getVideoListgetVideoList
      })

    },
    OnGlobEventA1() {

      uni.$emit('OnGlobEvent', {
        // type: 'switchTab',
        eventName: '/pages/A1/A1',
        handler: this.getVideoListgetVideoList
      })

    },

    // ------
    tabbar2() {

      uni.$emit('/pages/tabbar2/tabbar2', this.getVideoList)
      uni.switchTab({
        url: '/pages/tabbar2/tabbar2'
      });

    },
    getVideoListgetVideoList(callback) {
      console.log('getVideoListgetVideoList',)

      typeof callback === 'function' && callback('getVideoListgetVideoList ')

    },
    tabbar3() {

      uni.$emit('/pages/tabbar3/tabbar3', this.getVideoListgetVideoList)
      uni.switchTab({
        url: '/pages/tabbar3/tabbar3'
      });

    },
    A1() {

      uni.$emit('/pages/A1/A1', this.getVideoListgetVideoList)
      uni.navigateTo({
        url: '/pages/A1/A1'
      });

    },

    ylxOnCurrentPageHandler(callback) {
      typeof callback === 'function' && callback()
    },

  }
}
</script>


<style>

</style>
