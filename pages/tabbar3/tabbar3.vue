<template>
  <view>
    <zshu-navbar title="我的"></zshu-navbar>

    <!--    <zshu-tabs navigation-custom :activeId="activeId" @updateActiveId="(id)=>{activeId = id}" :list-tabs="listTabs"></zshu-tabs>-->

    <view v-for="item in viewDataList" style="border: 1px solid goldenrod;">
      {{ item }}
    </view>

    <view style="position:fixed;top: 50%;color:royalblue;font-size: 18px;background-color:rgba(0,0,0,.2);">
      {{ viewDataList.length }}
    </view>
    <tabbar :INDEX="2"></tabbar>

  </view>
</template>

<script>
import {getMineOrderList} from "@/network/apis/test_api";
import mixinsNextPageManager from "@/mixins/mixinsNextPageManager";
import mixinsPullDownRefresh from "@/mixins/mixinsPullDownRefresh";

import YlxSlider from "@/components/ylx-components/ylx-slider.vue";
import ZshuTabs from "@/components/zshu-components/zshu-tabs.vue";

import ZshuNavbar from "@/components/zshu-components/zshu-navbar.vue";


export default {
  components: {ZshuNavbar, ZshuTabs, YlxSlider},
  mixins: [mixinsNextPageManager, mixinsPullDownRefresh],
  data() {
    return {
      viewDataList: [],
      // activeId: 2,
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
      currentIndex: 0,
      isLoading: true,

    }
  },
  watch: {
    activeId(newVal) {
      this.currentIndex = this.listTabs.findIndex(item => item.id === newVal)
    },
    currentIndex(newVal) {
      this.activeId = this.listTabs[newVal].id
    },
  },
  onLoad() {
    this.getMineOrderListApi()
    this.ylxNextPageManager.setEmitFunctions(this.getMineOrderListApi)
    this.ylxNextPageManager.reloadCallback(this.ylxReloadCallback)
    this.ylxPullDownRefresh.setEmitFunctions(this.ylxNextPageManager.reload)

  },
  onShow() {
    console.log('tabbar 3')
  },
  methods: {
    ylxOnShow() {
      console.log('tabbar 3 ylxOnShow')
    },


    ylxReloadCallback() {

      this.viewDataList = []
      this.getMineOrderListApi()
    },

    getMineOrderListApi() {
      this.isLoading = true
      getMineOrderList({
        page: this.ylxNextPageManager.getPage(),
        page_size: this.ylxNextPageManager.getPageSize(),
        status: 5
      }).then(res => {

        this.viewDataList = this.ylxNextPageManager.setDataList(res.data.data)

        this.isLoading = false

      })
    },

  },

}
</script>

<style scoped>
view {
  line-height: 2.5;
}
</style>
