<template>
  <view>


    <zshu-tabs :view-height="0" :activeId="activeId" @updateActiveId="(id)=>{activeId = id}"
               :list-tabs="listTabs"></zshu-tabs>

    <button @click="ylxNavigateTo('pages/A1/A1?aa=66',{})"> 页面1</button>
    <button style="margin-top: 20px;font-size: 14px;" @click="handlerEvent({handler:toPage})">跳转到还未打开过的tabbar页面</button>
    <button style="margin-top: 20px;font-size: 14px;" @click="handlerEvent({handler:toPage2})">tabbar页面已打开</button>


    <tabbar :INDEX="0"></tabbar>

  </view>
</template>

<script>
import ZshuNavbar from "@/components/zshu-components/zshu-navbar.vue";

import {ylxNavigateTo} from "@/utils/uniTools";
import {handlerEvent} from "@/utils/tools";

export default {
  components: {ZshuNavbar},
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


    }
  },
  methods: {
    handlerEvent,
    ylxNavigateTo,
    ylxGetInfoFromChild({params, callback}) {
      console.log(params)
      setTimeout(() => {
        callback('hehehe')
      }, 200)
    },

    toPage() {
      // 第一次向未打开的页面传参
      uni.$emit('APP', {eventName: 'tabbar2', param: 1})
      ylxNavigateTo('pages/tabbar2/tabbar2')
    },
    toPage2() {
      // 页面已经打开
      uni.$emit('tabbar2', 1)
      ylxNavigateTo('pages/tabbar2/tabbar2')

    },


  }
}
</script>

<style>

</style>
