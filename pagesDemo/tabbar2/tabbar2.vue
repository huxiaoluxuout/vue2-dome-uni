<template>
  <view>
    <!--
        <z-paging ref="paging" v-model="dataList" use-page-scroll @query="queryList">
          <view slot="top">
            <zshu-tabs :activeId="activeId" @updateActiveId="(id)=>{activeId = id}" :list-tabs="listTabs"></zshu-tabs>
          </view>
          <view slot="bottom">
            <tabbar :INDEX="1"></tabbar>
          </view>
        </z-paging>
    -->


    <tabbar :INDEX="1"></tabbar>

  </view>
</template>

<script>
import ZshuTabs from "@/components/zshu-components/zshu-tabs.vue";
import {getMineOrderList} from "@/network/apis/test_api";
import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'

export default {
  components: {ZshuTabs},
  mixins: [ZPMixin],
  data() {
    return {
      dataList: [],
      listTabs: [
        {
          id: 1,
          text: '全部',
          // text2: '大厅',
        },
        {
          id: 5,
          text: '已完成',
          // text2: '大厅',
        }

      ],

      activeId: 1,
      navbarHeight: 60,
    }
  },

  onLoad() {
    console.log('tabbar2')

    const eventName = '/pagesDemo/tabbar2/tabbar2'

    uni.$on(eventName, (callbackInfo) => {
      console.log(callbackInfo);

      if (typeof callbackInfo === 'function') {
        callbackInfo()
      }else {
        callbackInfo.handler('hello')
      }

    })
    uni.$emit('GlobEvent' + eventName)

  },

}
</script>

<style scoped>


</style>
