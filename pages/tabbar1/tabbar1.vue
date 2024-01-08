<template>
  <view>


    <zshu-tabs :view-height="0" :active-id="activeId" @updateActiveId="id=>activeId = id"
               :list-tabs="listTabs"></zshu-tabs>

    <button style="margin-top: 20px;font-size: 14px;" @click="ylxNavigateTo('pages/A1/A1?aa=66',{})"> 页面1</button>
    <button style="margin-top: 20px;font-size: 14px;" @click="ylxNavigateTo('pages/A2/A2?aa=66',{})"> 页面2</button>

    <button style="margin-top: 20px;font-size: 14px;" @click="toPage1">跳转到还未打开过的tabbar页面</button>
    <button style="margin-top: 20px;font-size: 14px;" @click="uploadImg">uploadImg</button>


    <zshu-uploadimg ref="uploadImg" columns-limit="2" gap="10px" scale="1.58" limit="13"
                    hidden-upload-icon img-width="150px" only-camera
                    :fileImageList="fileImageList" @updateFileImageList="updateFileImageList"
    >

    </zshu-uploadimg>

    <tabbar :INDEX="0"></tabbar>

  </view>
</template>

<script>
import ZshuNavbar from "@/components/zshu-components/zshu-navbar.vue";

import {ylxNavigateTo} from "@/utils/uniTools";

import mixinsYlxUniEventBus from "@/mixins/mixinsYlxUniEventBus";


export default {
  components: {ZshuNavbar},
  mixins: [mixinsYlxUniEventBus],
  data() {
    return {
      listTabs: [
        {
          id: 2,
          text: '派送',
          text2: '大厅',
        },
        {
          id: 1,
          text: '抢单',
          text2: '大厅',
        }, {
          id: 3,
          text: '抢单3',
          text2: '大厅3',
        }
      ],
      activeId: 2,
      //   ---------------------

      fileImageList: [{
        url: 'https://images-jinti.oss-cn-hangzhou.aliyuncs.com/5fa1201ea36ad.jpg'
      }, {
        url: 'https://app-jinti.oss-cn-hangzhou.aliyuncs.com/uploads/20240107/f790552571bb4888293896d289b00295.png'
      }],


    }
  },
  computed: {
    _that_() {
      return this
    },
  },
  methods: {
    ylxNavigateTo,

    toPage1() {
      uni.$emit('emitApp', {eventName: 'tabbar2', param: 1})
      ylxNavigateTo('pages/tabbar2/tabbar2')
    },
    // 上传图片
    uploadImg() {
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
    }

  }
}
</script>

<style>

</style>
