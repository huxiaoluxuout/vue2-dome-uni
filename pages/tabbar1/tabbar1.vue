<template>
  <view class="page">


    <!--    <zshu-uploadimg ref="uploadImg" columns-limit="2" gap="10px" scale="1.58" limit="13"
                        hidden-upload-icon img-width="150px"
                        :fileImageList="fileImageList" @updateFileImageList="updateFileImageList"
        >
        </zshu-uploadimg>

        <u-button type="primary" :plain="true" text="zshu-uploadimg" @click="openUploadImg"></u-button>-->


    <u-button type="primary" :plain="true" text="仿抖音页面" @click="$u.route('/pages/dou_yin/dou_yin')"></u-button>

    <u-button type="primary" :plain="true" text="N-仿抖音页面" @click="$u.route('/pages/n_dou_yin/n_dou_yin')"></u-button>
------------------------------
    <u-button type="primary" :plain="true" text="EventBus" @click="EventBusClick"></u-button>
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

import mixinsYlxUniEventBus from "@/mixins/mixinsYlxUniEventBus";


import ZshuUploadimg from "@/components/zshu-components/zshu-uploadimg.vue";

import {data} from "test/data.json"
import {startTimer, uuid, simulateOperation} from "@/utils/tools";


export default {
  components: {ZshuNavbar, ZshuUploadimg},
  mixins: [mixinsYlxUniEventBus],
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

      typeof callback === 'function' && callback('hello ')
      console.log('getVideoList-11111111')
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
  }
}
</script>


<style>

</style>
