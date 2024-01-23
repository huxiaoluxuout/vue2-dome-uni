<template>
  <view>
    <z-paging ref="paging" v-model="dataList" use-page-scroll  @query="queryList">
<!--      <view slot="top">
        <zshu-tabs  :activeId="activeId" @updateActiveId="(id)=>{activeId = id}" :list-tabs="listTabs"></zshu-tabs>
      </view>-->
      <view class="dome-test" v-for="(item,index) in dataList" :key="index">
        <view class="dome-test-item">{{ item.id }}</view>
        <view class="dome-test-item">{{ item.name }}</view>
        <view class="dome-test-item">{{ item.take_time_text }}</view>
        <view class="dome-test-item">{{ item.fault }}</view>
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

  },
  watch: {
    activeId() {
      this.$refs.paging.reload()
    },
  },

  methods: {
    getMineOrderListHandle(pageNo,pageSize) {

      getMineOrderList({
        page:pageNo,
        page_size: pageSize,
        status: this.activeId-1
      }).then(res => {
        this.$refs.paging.complete(res.data.data);

      }).catch(() => {
        this.$refs.paging.complete(false);
      })
    },

    queryList(pageNo, pageSize,form) {

      this.getMineOrderListHandle(pageNo, pageSize)

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
