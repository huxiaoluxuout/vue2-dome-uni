<template>
  <view>
    <!--    <zshu-tabs  :activeId="activeId" @updateActiveId="updateActiveId" :list-tabs="listTabs"></zshu-tabs>-->


    <!--    <zshu-fixed-view :top="top" :navigation-custom="false">
          <template #content-inner>
            <view class="zshu-fixed-inner">
              <view class="tab-wrapper">
                <zshu-tabs hide-pag isRelative :activeId="activeId" @updateActiveId="updateActiveId"
                           :list-tabs="listTabs">
                </zshu-tabs>
                <view class="release-wrapper" style="position: relative">
                  <u-button type="primary" shape="circle" icon="edit-pen" text="发布"></u-button>
                </view>
              </view>
              <view class="dropdown-selection">

                212212121


              </view>
            </view>
          </template>
        </zshu-fixed-view>
        0000

        <button @click="$refs.uploadImg.chooseFile()">上传图片</button>

        <zshu-uploadimg ref="uploadImg" columnsLimit="2" gap="10px" scale="1.58" limit="13" hidden-upload-icon
                        :_that_="_that_" img-width="150px" :fileImageList="fileImageList" only-camera
        >

        </zshu-uploadimg>


        <view @click="handlerView">
          <zshu-scale-img :url="urlImg" scale="1.78" stop-click @click="handlerImg"></zshu-scale-img>
        </view>-->

    <tabbar :INDEX="1"></tabbar>

  </view>
</template>

<script>
import ZshuTabs from "@/components/zshu-components/zshu-tabs.vue";
import zshuUploadimg from "@/components/zshu-components/zshu-uploadimg.vue";

import appUsageEventBus from "@/mixins/mixinsAppUsageEventBus";

export default {
  components: {ZshuTabs, zshuUploadimg},
  mixins: [appUsageEventBus],
  data() {
    return {
      activeId: 2,
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

      rectHeight: 55,
      top: 0,
      cc: 0,

      fileImageList: [
        {
          url: 'https://images-jinti.oss-cn-hangzhou.aliyuncs.com/5fa1201ea36ad.jpg'
        },
        {
          url: 'https://images-jinti.oss-cn-hangzhou.aliyuncs.com/5fa1201ea36ad.jpg'
        },

      ],

      // urlImg: 'https://cdn.nlark.com/yuque/0/2023/png/21700210/1703754974325-6135ad2c-ba64-4ae6-8d19-82d7fc0b3df5.png'
      urlImg: 'https://images-jinti.oss-cn-hangzhou.aliyuncs.com/5fa1201ea36ad.jpg',


      eventBusName:'tabbar2',
      eventBusEmit:'emitCallbackTest',
    }
  },
  computed: {
    _that_() {
      return this
    }
  },
  watch: {
    fileImageList(val) {
      this.urlImg = val[val.length - 1].url
    }
  },
  onLoad() {

  },


  methods: {
    updateActiveId(id) {
      this.activeId = id
    },
    handlerImg() {
      console.log('2213231231231')
    },
    handlerView() {
      console.log('handlerView')
    },
    //   ---------------------------------------

    emitCallbackTest(data) {

      console.log('emitCallbackTest', data)

    }

  }
}
</script>

<style scoped>


</style>
