<template>
  <view class="ylx-scroll-view">
    <scroll-view class="scroll-view"
                 :scroll-y="true" :scroll-with-animation="true"
                 @scrolltolower="scrollLoadMore" :scroll-into-view="scrollInto"
                 :refresher-triggered="triggered"
                 :refresher-enabled="configLocal.refresher"
                 @refresherrefresh="onRefresh"
                 @refresherrestore="onRestore"
                 :refresher-background="styleConfigLocal.bgColor"
    >
      <view class="list-item">
        <view v-show="isLoading">
          <u-loading-page :loading="isLoading"></u-loading-page>
        </view>
        <view v-show="!isLoading">
          <view v-show="!isEmpty">
            <slot name="default"></slot>
          </view>
          <view v-show="isEmpty">
            <view class="empty-data">
              <view>{{ emptyText }}</view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  name: "ylx-scroll-view",

  props: {

    scrollInto: {
      type: String,
      default: ''
    },
    emptyText: {
      type: [String, Number],
      default: '数据为空'
    },
    isEmpty: {
      type: [Boolean],
      default: false
    },
    isLoading: {
      type: [Boolean],
      default: true
    },
    refresher: {//开启下拉刷新
      type: Boolean,
      default: false
    },
    bgColor: {
      type: String,
      default: 'transparent'
    },
    config: {
      type: Object,
      default: () => {
        return {}
      }
    },
    styleConfig: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  data() {
    return {
      refresherEnabled: !!this.empty,
      itemCount: this.empty,
      onRefreshing: false,
      triggered: false
    }
  },
  computed: {
    configLocal() {
      return Object.assign({
        refresher: this.refresher
      }, this.config);
    },
    styleConfigLocal() {
      return Object.assign({
        bgColor: this.bgColor,
      }, this.styleConfig);
    }
  },

  methods: {
    // 底部触发
    scrollLoadMore() {
      this.$emit("loadMore")
      // console.log('底部触发-加载更多')
    },

    onRefresh() {
      if (this.onRefreshing) return
      this.onRefreshing = true
      if (!this.triggered) this.triggered = true
      this.$emit('refresh', this.closeRefresh)
      // this.close()
    },
    onRestore() {
      this.triggered = false
    },
    closeRefresh() {
      //设置定时器一秒钟关闭刷新状态（根据自己需求）
      setTimeout(() => {
        this.triggered = false
        this.onRefreshing = false
      }, 100)
    }
  },
}
</script>

<style scoped lang="scss">
.ylx-scroll-view, .scroll-view {
  height: 100%;
  box-sizing: border-box;

}

.list-item {
  height: 100%;
  box-sizing: border-box;
}

.touch-action {
  touch-action: none;
}

.empty-data {
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  image {
    display: block;
    margin-top: 10%;
  }

  view {
    padding-top: 20rpx;
    font-size: 14px;
    color: #707070;
  }

}
</style>
