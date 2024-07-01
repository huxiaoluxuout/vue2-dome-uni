<template>
  <view class="page">


    <u-button type="primary" :plain="true" text="toA1" @click="toA1"></u-button>


    <tabbar :INDEX="0"></tabbar>


  </view>
</template>

<script>

import {ylxNavigateTo} from "@/utils/uniTools";

import {data} from "@/test/data.json"

import instanceUniEventBus from "@/utils/common/uniEventBus/instanceUniEventBus";

export default {
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


    // ---------------------------------------------------

    toA1(){
      instanceUniEventBus.pageNotice({
        eventPathName:'/pagesDemo/A1/A1',
        options:{
          typw:true,
          name: 'lixl',
          age:18
        }
      },true)
    },





    ylxOnGetInfoHandler(callback) {
      typeof callback === 'function' && callback()
    },

  }
}
</script>


<style>

</style>
