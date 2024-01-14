<template>
  <view>
    <z-paging ref="paging" v-model="dataList" use-cache cache-key="goodsList" :default-page-no="2"  @query="queryList" @listChange="listChange">
      <view slot="top">
        <zshu-tabs  :activeId="activeId" @updateActiveId="(id)=>{activeId = id}"
                   :list-tabs="listTabs"></zshu-tabs>
      </view>
      <view class="dome-test" v-for="(item,index) in dataList" :key="index">
        <view class="dome-test-item">{{ item.id }}</view>
        <view class="dome-test-item">{{ item.name }}</view>
        <view class="dome-test-item">{{ item.take_time_text }}</view>
      </view>

      <view slot="bottom">
        <tabbar :INDEX="1"></tabbar>
      </view>
    </z-paging>


  </view>
</template>

<script>
import ZshuTabs from "@/components/zshu-components/zshu-tabs.vue";
import {getMineOrderList} from "@/network/apis/test_api";

export default {
  components: {ZshuTabs},

  data() {
    return {
      dataList: [],
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
      navbarHeight: 60,
    }
  },

  onLoad() {

  },

  methods: {

    queryList(pageNo, pageSize,form) {
      console.log(pageNo, pageSize,form)
      getMineOrderList({
        page: pageNo,
        page_size: pageSize,
        status: 0
      }).then(res => {
        this.$refs.paging.complete(res.data.data);
        // this.$refs.paging.setLocalPaging(res.data.data);
      }).catch(() => {
        this.$refs.paging.complete(false);
      })

    },
    listChange() {

    },
    // 下拉刷新被触发
    onRefresh() {
      // 告知z-paging下拉刷新结束，这样才可以开始下一次的下拉刷新
      setTimeout(() => {
        // 1.5秒之后停止刷新动画
        this.$refs.paging.complete();
      }, 1500)
    },

  }
}
</script>

<style scoped>
.dome-test {
  border: 1px solid red;
  margin-bottom: 10px;
}

.dome-test-item {
  line-height: 2.5;
}

</style>
