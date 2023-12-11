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


    <zshu-uploadimg></zshu-uploadimg>

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
