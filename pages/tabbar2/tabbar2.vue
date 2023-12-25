<template>
  <view>
    <!--    <zshu-tabs  :activeId="activeId" @updateActiveId="updateActiveId" :list-tabs="listTabs"></zshu-tabs>-->
    <zshu-navbar :updateNavbarHeight="(height)=>top=height"></zshu-navbar>

    <zshu-fixed-view :top="top" :navigation-custom="false">
      <template #content-inner>
        <view class="zshu-fixed-inner">
          <view class="tab-wrapper">
            <zshu-tabs hide-pag isRelative :activeId="activeId" @updateActiveId="updateActiveId"
                       :list-tabs="listTabs"></zshu-tabs>
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

    <zshu-uploadimg ref="uploadImg" columnsLimit="2" gap="10px" scale="1.58"
                    limit="13" hiddenUploadIcon :_that_="_that_"
                    :fileImageList="fileImageList">
    </zshu-uploadimg>
    <view @click="handlerView">
      <zshu-scale-img :url="urlImg" img-width="200px" scale="2" stop-click @click="handlerImg"></zshu-scale-img>
    </view>


    <tabbar :INDEX="1"></tabbar>

  </view>
</template>

<script>
import ZshuTabs from "@/components/zshu-components/zshu-tabs.vue";
import {getViewInfo} from "@/utils/tools";

export default {
  components: {ZshuTabs},
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

      fileImageList: [{
        // url:'https://app-jinti.oss-cn-hangzhou.aliyuncs.com/uploads/20231225//588f0f676b18d403feb58485be203413.jpeg'
        url: 'https://images-jinti.oss-cn-hangzhou.aliyuncs.com/5fa1201ea36ad.jpg'
      }, {
        // url:'https://app-jinti.oss-cn-hangzhou.aliyuncs.com/uploads/20231225//588f0f676b18d403feb58485be203413.jpeg'
        // url:'http://images-jinti.oss-cn-hangzhou.aliyuncs.com/5fa1201ea36ad.jpg4'
      }, {
        // url:'https://app-jinti.oss-cn-hangzhou.aliyuncs.com/uploads/20231225//588f0f676b18d403feb58485be203413.jpeg'
        // url:'http://images-jinti.oss-cn-hangzhou.aliyuncs.com/5fa1201ea36ad.jpg4'
      }, {
        // url:'https://app-jinti.oss-cn-hangzhou.aliyuncs.com/uploads/20231225//588f0f676b18d403feb58485be203413.jpeg'
        // url:'http://images-jinti.oss-cn-hangzhou.aliyuncs.com/5fa1201ea36ad.jpg4'
      }],
      urlImg: 'https://images-jinti.oss-cn-hangzhou.aliyuncs.com/5fa1201ea36ad.jpg'

    }
  },
  computed: {
    _that_() {
      return this
    }
  },
  mounted() {
    /*getViewInfo('.zshu-fixed-inner', (rect) => {
      this.rectHeight = Math.ceil(rect?.height);
    }, this)*/
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
    }
  }
}
</script>

<style scoped>
.zshu-fixed-inner {
  box-sizing: border-box;
  word-break: break-all;
}

.tab-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

}

.release-wrapper {

  display: flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 100%;
}

.dropdown-selection {
  padding-bottom: 10px;
}

.u-button--circle {
  height: 28px;
}

.u-button__text {
  font-size: 12px;
}

button:after {
  border: none;
}


</style>
