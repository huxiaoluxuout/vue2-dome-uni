<template>
  <view class="ylx-scroll-view">
    <scroll-view class="scroll-view" :style="scrollViewStyle"
                 :scroll-y="true"
                 :refresher-enabled="!refresherEnabled"
                 :refresher-triggered="triggered"
                 :refresher-threshold="100"
                 :lower-threshold="10"
                 refresher-background="transparent"
                 @refresherrefresh="onRefresh"
                 @refresherabort="onAbort"
                 @scrolltolower="onScrollReachBottom"
                 @refresherrestore="onRestore"
    >

      <view class="scroll-view-content" v-if="item">
        <slot name="default"></slot>
      </view>
      <view :style="scrollViewStyle" class="list-item" v-else-if="!item">
        <view v-show="isLoading">
          <u-loading-page :loading="isLoading"></u-loading-page>
        </view>
        <view :style="scrollViewStyle" v-show="!isLoading">
          <view v-if="isEmpty" class="empty-data">
            <text>{{ emptyText }}</text>
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
    item: {
      type: [Object, Boolean, Number],
      default: () => {
      }
    },
    //开启下拉刷新
    refresherEnabled: Boolean,

    disableScrollView: Boolean,
    setFunction: {
      type: Function,
      default: () => () => {
      }
    },

  },
  computed: {
    scrollViewStyle() {
      return `height:100%}`
      // return `height:${this.disableScrollView ? '1000%' : '100%'};`
    },

  },
  data() {
    return {
      refresherTriggered: false,
      triggered: false,
      triggeredTime: null,
      isLockScrollReachBottom: false,
    }
  },


  methods: {
    // 底部触发
    onScrollReachBottom() {
 return;
      console.log('底部触发')
      if (this.isLockScrollReachBottom) return
      this.$emit('scrollReachBottom')
      this.isLockScrollReachBottom = true;
      setTimeout(() => {
        this.isLockScrollReachBottom = false;
      }, 500);
    },

    // 下拉执行操作
    onRefresh() {
      return
      this.$emit('startPull', () => {
        this.setFunction()
        clearTimeout(this.triggeredTime)
        this.triggeredTime = null
        if (!this.triggered) {
          //下拉刷新，先变true再变false才能关闭
          this.triggered = true;
        }
      })

    },

    // 下拉操作执行完成
    onRestore() {
      this.triggered = false;
      clearTimeout(this.triggeredTime)
      this.triggeredTime = null
      console.log("onRestore");
    },

    //关掉圈圈，需要先执行完刷新操作

    closeCircle() {
      if (!this.triggered) return
      this.triggeredTime = setTimeout(() => {
        this.triggered = false;
      }, 100);
    },

    onAbort() {
      console.log("onAbort");
      this.triggered = false;

    },
    onPulling(e) {
      // console.log("onpulling", e);
    },

  },
}
</script>

<style scoped lang="scss">
.ylx-scroll-view, .scroll-view {
  height: 100%;
  box-sizing: border-box;
}

.empty-data {
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 14px;
  color: #707070;
  justify-content: center;
}

</style>
