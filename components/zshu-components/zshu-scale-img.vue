<template>
  <view class="zshu-scale-img-view" :style="customStyles">

    <view v-show="loadingStatus==='uploading'" class="loading">
      <view class="loading-content">
        <view class="spinner"></view>
      </view>
    </view>

    <image v-show="loadingStatus==='error'" :mode="mode" class="zshu-scale-img" src="./static/loading_err.png" ></image>

    <view v-show="loadingStatus==='success'" >
      <image v-if="preview" class="zshu-scale-img" :style="customStyles" :src="url" :mode="mode" @click.stop="previewImage" @load="loadSuccess" @error="loadError"></image>
      <image v-else-if="stopClick" class="zshu-scale-img"  :style="customStyles" :src="url" :mode="mode" @click.stop="$emit('click')" @load="loadSuccess" @error="loadError"></image>
      <image v-else-if="!stopClick" class="zshu-scale-img"  :style="customStyles" :src="url" :mode="mode" @click="$emit('click')" @load="loadSuccess" @error="loadError"></image>

    </view>

  </view>

</template>

<script>


export default {
  name: "zshu-scale-img",

  props: {

    // 宽高比例
    scale: {
      type: [Number, String],
      default: 1
    },
    // 当前可用总宽度
    width: {
      type: String,
      default: `100vw`
    },

    url: {
      type: String,
      default: 'https://app-jinti.oss-cn-hangzhou.aliyuncs.com/uploads/20231225//39608349e10cbde8f54e957fac05d08c.jpg'
    },
    mode: {
      type: String,
      default: `aspectFill`
    },
    errorUrl: {
      type: String,
      default: `./static/loading_err.png`
    },

    preview: Boolean,
    stopClick: Boolean,

  },
  data() {
    return {
      loadingStatus: 'uploading'
    };
  },

  computed: {
    localStyleViewWidth() {
      return this.convertCalcExpression(this.width)
    },

    customStyles() {
      return {
        '--scale': Number(this.scale),
        '--item-width': this.localStyleViewWidth,
      }
    },

  },

  methods: {
    // 将 rpx 转换为 px
    convertCalcExpression(expression) {
      const regex = /(\d+)(rpx|px)/g;
      return expression.replace(regex, (match, number, unit) => {
        // 将 rpx 转换为 px
        if (unit === 'rpx') {
          number = number / 2;
        }
        // 返回转换后的数字和单位
        return `${number}px`;
      });
    },
    // 预览图片
    previewImage() {
      const that = this
      if (!that.preview) return

      uni.previewImage({
        urls: [that.url],
        current: that.url
      })
    },

    loadSuccess() {
      this.loadingStatus = 'success'
    },
    loadError() {
      this.loadingStatus = 'error'
    }
  }

}
</script>

<style scoped>
//宽高比例（不能直接写成分数形式）
.zshu-scale-img-view {
  position: relative;
  --scale: 1;

  --item-height-scale: calc(var(--item-width) / var(--scale));

  width: var(--item-width);
  height: var(--item-height-scale);
  box-sizing: border-box;
  //background-color: red;
  //border: 1px solid blueviolet;
}

.zshu-scale-img {
  width: var(--item-width);
  height: var(--item-height-scale);
  box-sizing: border-box;
  position: relative;
  display: block;
}



.loading {
  position: absolute;
  z-index: 2;
  border-radius: 5px;
  inset: 0;
  background: rgba(130, 130, 130, .5);
}

.loading-content {
  animation: loading 1s steps(12) infinite;
  position: absolute;
  inset: 0;
}

.loading .spinner {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url("./static/loading.svg") no-repeat;
  background-size: 100%;

}

@keyframes loading {
  0% {
    transform-origin: center center;
    transform: rotate(0deg);
  }
  100% {
    transform-origin: center center;
    transform: rotate(360deg);
  }
}

</style>

