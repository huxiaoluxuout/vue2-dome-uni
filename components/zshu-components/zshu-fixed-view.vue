<template>
  <view class="root-zshu-fixed" :style="{'--rectHeight':navigationCustom?rectHeight+'px':0+'px'}">
    <view class="zshu-fixed-view" :class="{'border__bottom':isBorderBottom}"
          :style="{background:bgColor_,'--top':navigationCustom?top+'px':0}">
      <view class="content-inner">
        <slot name="content-inner"></slot>
      </view>
    </view>
    <view :class="viewGapHeight" :style="{'--height':`${navigationCustom?rectHeight:0}px`}"></view>

  </view>
</template>


<script>

import {getViewInfo} from "@/utils/tools";

export default {
  props: {
    bgColor: {
      type: String,
      default: '#fff'
    },

    top: {
      type: [String, Number],
      default: 0
    },

    transparent: Boolean,
    navigationCustom: Boolean,
  },
  data() {
    return {
      rectHeight: 20
    }
  },

  computed: {
    bgColor_() {
      return this.transparent ? 'transparent' : this.bgColor
    },
    isBorderBottom() {
      const regex = /^(transparent)|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*0\s*)?\)$/i;
      return this.transparent ? false : !regex.test(this.bgColor_)
    },
    viewGapHeight() {
      if (this.navigationCustom && Number(this.top) === 0) {
        return 'view-gap-2'
      } else {
        return 'view-gap'

      }
    },


  },
  mounted() {
    getViewInfo('.content-inner', (rect) => {
      this.rectHeight = Math.ceil(rect?.height);
    }, this)
  },


  methods: {},


}

</script>


<style lang="scss" scoped>


.root-zshu-fixed {

  .zshu-fixed-view {
    position: fixed;
    top: var(--top);
    left: 0;
    right: 0;
    width: 100%;
    z-index: 100;
    height: var(--rectHeight);
    //padding-top: calc(var(--window-top) + var(--status-bar-height)),

  }

}

.content-inner {
  padding: 0 30rpx;

}

//底部边框
.border__bottom {
  --bdColor: #F2F2F7;
  position: relative
}

.border__bottom::after {
  content: '';
  width: 100%;
  height: 1px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: var(--bdColor);
}

.border__top::after {
  content: '';
  width: 100%;
  height: 1px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--bdColor);

}

.view-gap {
  height: calc(var(--height));
}

.view-gap-2 {
  height: calc(var(--height) + var(--status-bar-height));
}

</style>
