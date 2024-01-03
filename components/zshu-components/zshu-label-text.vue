<template>
  <view class="flex-container label-view" :style="{'--num-columns':3,'--gap':'15px'}">
    <template v-if="stop">
      <text class="flex-item label-text" :class="{'active': activeIds.includes(item.id)}" :style="attributeStyler"
            v-for="(item,index) in labelList" :key="item.id" @click.stop="chooseLabel(item.id)">{{ item.text }}
        <view v-show="item.showClose" class="close-circle" @click.stop="deleteLabel(index,item.id)">
          <u-icon name="close-circle" color="#878787" size="22"></u-icon>
        </view>
      </text>
    </template>
    <template v-else>
      <text class="flex-item label-text" :class="{'active': activeIds.includes(item.id)}" :style="attributeStyler"
            v-for="(item,index) in labelList" :key="item.id" @click="chooseLabel(item.id)">{{ item.text }}
        <view v-show="item.showClose" class="close-circle" @click.stop="deleteLabel(index,item.id)">
          <u-icon name="close-circle" color="#878787" size="22"></u-icon>
        </view>
      </text>

    </template>


  </view>
</template>
<script>

import {ylxAttributeStylers} from "@/utils/uniTools";


export default {
  props: {
    labelList: {
      type: Array,
      default: () => [
        {
          id: 1,
          text: '洗衣机'
        }, {
          id: 2,
          text: '洗衣机'
        }, {
          id: 3,
          text: '洗衣机'
        },
      ]

    },
    activeIds: {
      type: Array,
      default: () => []

    },

    checkbox: Boolean, // 多选选模式
    disabled: Boolean, // 禁用选择
    stop: Boolean, // 阻止事件冒泡

    limit: {
      type: [Number, String],
      default: Number.MAX_SAFE_INTEGER    // 示默认的限制值
    },

    customStylers: {
      type: Object,
      default: () => {
        return {}
      }
    },
    rounded: {
      type: String,
      default: '100px'
    },
    size: {
      type: String,
      default: '12px'
    },


    bgColor: {
      type: String,
      default: '#F9F9FC'
    },

    color: {
      type: String,
      default: '#303033'
    },

    // ===========================
    activeBgColor: {
      type: String,
      default: '#e6f4ff'
    },
    activeColor: {
      type: String,
      default: '#33A6FF'
    },
    activeBdColor: {
      type: String,
      default: '#e6f4ff'
    },
    updateActiveId: {
      type: Function,
      default: () => {
      }
    },


    isSplit: Boolean,

    customBtn: Boolean,

  },
  computed: {
    attributeStyler() {

      let customStylers = {
        'borderRadius': this.rounded,
        'width': !this.isSplit && 'unset',
        'fontSize': this.size,

        'color': this.color,
        'backgroundColor': this.bgColor,

        '--bgColor': this.activeBgColor,
        '--color': this.activeColor,
        '--activeBdColor': this.activeBdColor,

        ...this.customStylers,

      }


      return ylxAttributeStylers(customStylers, Object.keys(customStylers))
    }
  },
  watch: {
    activeIds(newVal) {
      console.log('newVal',newVal)
      this.updateActiveId(newVal)
    },
    showAddBtn(newVal) {
      if (newVal) {
        this.inputVal = ''
      }
    },
  },

  data() {
    return {
      showAddBtn: false,
      inputVal: '',
    }
  },
  methods: {
    // 选择标签
    chooseLabel(ID) {
      console.log('选择标签', ID, this.activeIds)
      const {activeIds, checkbox, limit: numLimit, disabled} = this;

      let limit = +numLimit
      if (disabled) {
        return;
      }
      const hasSame = activeIds.includes(ID);
      const index = activeIds.findIndex(itemId => itemId === ID);

      // 多选
      if (checkbox) {
        if (hasSame) {
          // 取消
          activeIds.splice(index, 1);
        } else {
          if (limit && limit <= activeIds.length) {
            console.warn(`最多可选${limit}个`)
            return;
          }
          activeIds.push(ID);
        }
      } else {
        // 单选

        if (hasSame) {
          activeIds.pop()
        } else {
          activeIds.length = 0;
          activeIds.push(ID);

        }
      }
    },

    deleteLabel(index,id) {
      let idIndex = this.activeIds.findIndex(ID => id === ID);
      if (idIndex !== -1) {
        this.activeIds.splice(idIndex, 1);
      }
      this.labelList.splice(index, 1);
    },
  }

}
</script>

<style scoped lang="scss">

.label-view {
  //margin-top: 20rpx;


  .label-text {
    --top-gap: 10px;
    --right-gap: 18px;

    box-sizing: border-box;
    text-align: center;
    font-size: 12px;
    background-color: #fff;
    color: #919199;
    border: 1px solid #F2F2F2;

    //margin-top: 20rpx;

    padding: var(--top-gap) var(--right-gap);
  }

}

.close-circle {
  position: absolute;
  top: calc(-1 * var(--top-gap));
  right: calc(-1 * var(--right-gap));
}

.active.active.active {

  background-color: var(--bgColor) !important;
  border-width: 1px !important;
  border-color: var(--activeBdColor) !important;
  color: var(--color) !important;
}


</style>

