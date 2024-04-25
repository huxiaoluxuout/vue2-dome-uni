<template>
  <view class="page">


    <!--    <zshu-uploadimg ref="uploadImg" columns-limit="2" gap="10px" scale="1.58" limit="13"
                        hidden-upload-icon img-width="150px"
                        :fileImageList="fileImageList" @updateFileImageList="updateFileImageList"
        >
        </zshu-uploadimg>

        <u-button type="primary" :plain="true" text="zshu-uploadimg" @click="openUploadImg"></u-button>-->


    <u-button type="primary" :plain="true" text="A1" @click="A1"></u-button>
    <u-button type="primary" :plain="true" text="OnGlobEventA1" @click="OnGlobEventA1"></u-button>


    <u-button type="primary" :plain="true" text="OnGlobEventtabbar2" @click="OnGlobEventtabbar2"></u-button>

    <u-button type="primary" :plain="true" text="tabbar2" @click="tabbar2"></u-button>





    <u-button type="primary" :plain="true" text="仿抖音页面" @click="$u.route('/pagesDemo/dou_yin/dou_yin')"></u-button>

    <u-button type="primary" :plain="true" text="定位" @click="$u.route('/pagesDemo/dingWei/dingWei')"></u-button>

    <view style="position: fixed;bottom: 0;">
      <tabbar :INDEX="0"></tabbar>

    </view>


  </view>
</template>

<script>
import ZshuNavbar from "@/components/zshu-components/zshu-navbar.vue";

import {ylxNavigateTo} from "@/utils/uniTools";

import ZshuUploadimg from "@/components/zshu-components/zshu-uploadimg.vue";

import {data} from "@/test/data.json"

import mixinsEventBusRegister from "@/mixins/mixinsEventBusRegister";


export default {
  components: {ZshuNavbar, ZshuUploadimg},
  mixins: [mixinsEventBusRegister],
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
    getVideoList(param) {
      console.log('getVideoList',param)
      // typeof callback === 'function' && callback('getVideoList')

    },
    // ---------------------------------------------------

    OnGlobEventA1() {

      uni.$emit('OnGlobEvent', {
        eventPathName: '/pagesDemo/A1/A1',
        options: this.getVideoListgetVideoList,

      })

    },

    A1() {

      uni.$emit('/pagesDemo/A1/A1', this.getVideoListgetVideoList)
      uni.navigateTo({
        url: '/pagesDemo/A1/A1'
      });

    },

    tabbar2() {

      uni.$emit('/pagesDemo/tabbar2/tabbar2', this.getVideoList)
      uni.switchTab({
        url: '/pagesDemo/tabbar2/tabbar2'
      });

    },
    OnGlobEventtabbar2() {

      uni.$emit('OnGlobEvent', {
        type: 'switchTab',
        eventPathName: '/pagesDemo/tabbar2/tabbar2',
        options: {
          handler:this.getVideoList,
          param:{age:100,className:'1'}
        }
      })

    },

    getVideoListgetVideoList(callback) {
      console.log('getVideoListgetVideoList',)

      typeof callback === 'function' && callback('getVideoListgetVideoList ')

    },
    // ---------------------------------------------------



    ylxOnGetInfoHandler(callback) {
      typeof callback === 'function' && callback()
    },

  }
}
</script>


<style>

</style>
