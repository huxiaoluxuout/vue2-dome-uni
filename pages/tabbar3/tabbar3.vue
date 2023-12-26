<template>
  <view>
    <zshu-navbar title="我的"></zshu-navbar>

<!--    <zshu-tabs navigation-custom :activeId="activeId" @updateActiveId="(id)=>{activeId = id}" :list-tabs="listTabs"></zshu-tabs>-->

<!--    <ylx-slider :data-list="viewDataList" :currentIndex="currentIndex"
                @updateCurrentIndex="(index)=>{currentIndex = index}"
                :is-loading="isLoading"
    >
      <template #content="{item}">
        <view style="border: 1px solid yellow;">
          <view>{{item.order_sn}}</view>
          <view>{{item.take_time_text}}</view>
        </view>
      </template>
    </ylx-slider>-->

    <tabbar :INDEX="2"></tabbar>

  </view>
</template>

<script>
import {getMineOrderList} from "@/network/apis/test_api";
import mixinsNextPageManager from "@/mixins/mixinsNextPageManager";
import YlxSlider from "@/components/ylx-components/ylx-slider.vue";
import ZshuTabs from "@/components/zshu-components/zshu-tabs.vue";
import index from "@/pages/index/index.vue";
import ZshuNavbar from "@/components/zshu-components/zshu-navbar.vue";


export default {
  components: {ZshuNavbar, ZshuTabs, YlxSlider},
  mixins: [mixinsNextPageManager],
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
    this.nextPageManager.nexPageSetFunction(this.getMineOrderListApi)

    this.pullDownRefresh.pullDownRefreshAddFunctions(this.nextPageManager.reload)

    this.nextPageManager.onReload(() => {
      // console.log('响应重新加载')
      this.viewDataList = []
      this.getMineOrderListApi()

    })


  },
  methods: {

    getMineOrderListApi() {
      this.isLoading=true
      getMineOrderList({
        page: 1,
        page_size: 6,
        status: 1
      }).then(res => {
        this.viewDataList = this.nextPageManager.setDataList(res.data.data)

        this.isLoading=false

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
