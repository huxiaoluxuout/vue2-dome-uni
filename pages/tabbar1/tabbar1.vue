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
    <u-button type="primary" :plain="true" text="N-仿抖音页面2" @click="$u.route('/pages/n_dou_yin/n_dou_yin_2')"></u-button>

<!--    <u-button type="primary" :plain="true" text="BindingX" @click="$u.route('/pages/n_BindingX/n_BindingX')"></u-button>-->

    <tabbar :INDEX="0"></tabbar>


  </view>
</template>

<script>
import ZshuNavbar from "@/components/zshu-components/zshu-navbar.vue";

import {ylxNavigateTo} from "@/utils/uniTools";

import mixinsYlxUniEventBus from "@/mixins/mixinsYlxUniEventBus";


import ZshuUploadimg from "@/components/zshu-components/zshu-uploadimg.vue";

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
      goodsList: []

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


  }
}
</script>


<style>

</style>
