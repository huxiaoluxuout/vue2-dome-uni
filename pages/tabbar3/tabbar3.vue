<template>
  <view>
    <zshu-navbar title="我的" bg-color="blue" color="#fff"
                 :navbar-style="{background:`url(https://s11.ax1x.com/2023/09/12/pPg4o7R.jpg)`}"
                 @navbarHeight="(e)=>navbarHeight=e"
    ></zshu-navbar>

    <zshu-tabs is-custom :top="navbarHeight" :activeId="activeId" @updateActiveId="(id)=>{activeId = id}"
               :list-tabs="listTabs"></zshu-tabs>

    <ylx-slider :other-height="navbarHeight + 45" :data-list="viewDataList" :current-index="current"
                @updateCurrent="handleCurrent" @setDataList="handleSetDataList"></ylx-slider>
    <!--    <ylx-slider :data-list="viewDataList" :other-height="navbarHeight + 45"></ylx-slider>-->


    <tabbar :INDEX="2"></tabbar>
  </view>
</template>

<script>
import {getMineOrderList} from "@/network/apis/test_api";
import mixinsNextPageManager from "@/mixins/mixinsNextPageManager";
import mixinsPullDownRefresh from "@/mixins/mixinsPullDownRefresh";

import ZshuTabs from "@/components/zshu-components/zshu-tabs.vue";

import ZshuNavbar from "@/components/zshu-components/zshu-navbar.vue";
import YlxSlider from "@/components/ylx-components/ylx-slider.vue";


export default {
  components: {YlxSlider, ZshuNavbar, ZshuTabs},
  mixins: [mixinsNextPageManager, mixinsPullDownRefresh],
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

      isLoading: true,


      navbarHeight: 60,
      current: 0,

      viewDataList: [null, null, null],
    }
  },
/*  computed: {
    activeIdIndex(newId) {
      return this.listTabs.findIndex(item => item.id === newId)
    },
  },*/
  watch: {
    activeId(newId) {
      let index =this.listTabs.findIndex(item => item.id === newId)
      let obj = {
        0: 'xixi',
        1: 'HAHA',
        2: 'hei hei',
      }
      this.viewDataList[index] = {
        name: obj[index]
      }
      this.current = index
    },
  },


  onLoad() {
    this.viewDataList[this.current] = {name: 'XI XI'}
    // this.getMineOrderListApi()
    this.ylxNextPageManager.setEmitFunctions(this.getMineOrderListApi)
    this.ylxNextPageManager.reloadCallback(this.ylxReloadCallback)
    this.ylxPullDownRefresh.setEmitFunctions(this.ylxNextPageManager.reload)

  },
  onShow() {
    console.log('tabbar 3')
  },
  methods: {
    handleSetDataList(index) {
      let obj = {
        0: 'xixi',
        1: 'HAHA',
        2: 'hei hei',
      }
      this.viewDataList[index] = {
        name: obj[index]
      }
    },

    handleCurrent(index) {
      this.current = index
    },

    ylxReloadCallback() {

      // this.viewDataList = []
      // this.getMineOrderListApi()
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

</style>
