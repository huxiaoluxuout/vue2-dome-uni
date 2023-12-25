<template>

  <view class="zshu-upload-img" :class="{'hidden-view':hidden}"
        :style="{'--num-columns':columnsLimit,'--scale':scale,'--view-width':localStyleViewWidth,'--gap':localStyleGap}">
    <!--图片-->
    <view class="flex-item__view" v-for="(item,index) in localFileList" :key="''+index+item.thumb">

      <zshu-scale-img :url="item.thumb" :scale="scale" :width="widthImg" preview></zshu-scale-img>

<!--      <view class="del-icon" @click.stop="delImage(index)">
        <uni-icons type="close" color="#ff3c3c" size="26"></uni-icons>
      </view>


      <view v-show="showDel" class="del-view">
        <button @click.stop="delImage(index)">del</button>
      </view>-->


    </view>

    <!--图片 视频 上传-->
    <view v-show="isShowUpload"
          class="flex-item__view upload-icon-position"
          @click="chooseFile"
    >
      <slot name="upload">
        <image class="image-item upload-icon-default" mode="aspectFill" src="./static/icon-upload.png"/>
      </slot>
    </view>
  </view>

</template>

<script>


import {uploadImg} from "@/network/config"
import ZshuScaleImg from "@/components/zshu-components/zshu-scale-img.vue";


export default {
  name: "zshu-upload-img",
  components: {ZshuScaleImg},

  props: {
    fileImageList: {
      type: Array,
      default: () => []
    },

    // ======================
    // 总共允许上传数量
    limit: {
      type: [Number, String],
      default: 3
    },
    // 一行有几列
    columnsLimit: {
      type: [Number, String],
      default: 1
    },
    // 宽高比例
    scale: {
      type: [Number, String],
      default: 1
    },
    // 自定义图片宽
    imgWidth: {
      type: [Number, String],
      default: 0
    },

    // 当前可用总宽度
    viewWidth: {
      type: [Number, String],
      default: `calc(750rpx)`
    },

    gap: {
      type: String,
      default: `30rpx`
    },

    _that_: {
      type: Object,
      default: () => {
      }
    },
    _fileImageList_: {
      type: String,
      default: 'fileImageList'
    },

    hiddenUploadIcon: Boolean,

    onlyCamera: Boolean,

    hidden: Boolean,//视觉隐藏

  },
  data() {
    return {

      uploadDefaultIcon: 'https://xcx.jxgxsmt.com/static/images/add-img.png',
      showDel: false
    };
  },

  computed: {
    localStyleViewWidth() {
      return this.convertCalcExpression(this.viewWidth)
    },
    localStyleGap() {
      return this.convertCalcExpression(this.gap)
    },
    localStyleImgWidth() {
      return this.convertCalcExpression(this.imgWidth)
    },

    localFileList() {
      this.fileImageList.forEach(item => {
        if (!item.status && item.url) {
          item.status = 'success'
          item.thumb = item.url
        }
      })
      return this.fileImageList
    },

    isShowUpload() {
      return this.hiddenUploadIcon ? false : Number(this.limit) > this.localFileList.length;
    },
    chooseCountLimit() {
      return Number(this.limit) - this.localFileList.length;
    },

    widthImg() {
      console.log(this.imgWidth === 0)
      if (this.imgWidth === 0) {
        let num = Number(this.columnsLimit)
        let gapWidth = `${this.localStyleGap} * ${num - 1}`

        let str = `calc((${this.localStyleViewWidth} - ${gapWidth}) / ${num})`

        console.log(str)
        return str

      } else {
        return this.localStyleImgWidth

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

    chooseFile() {
      const that = this
      let sourceTypes = ['album', 'camera']

      if (this.onlyCamera) {
        sourceTypes.splice(0, 1)
      }

      uni.chooseImage({
        count: that.chooseCountLimit,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          // console.log('chooseImage', res)
          that.afterRead(res)
        },
        fail: function (fail) {
          console.warn(fail)
        }
      });

    },

    // 删除图片
    delImage(index) {
      const that = this
      uni.showModal({
        title: '确定删除吗?',
        success: function (res) {
          if (res.confirm) {
            that._that_[that._fileImageList_].splice(index, 1)
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });

    },

    // 预览图片
    previewImage(index) {
      const that = this
      uni.previewImage({
        urls: that.localFileList.map(item => item.thumb),
        current: that.localFileList[index].thumb,
      })
    },

    // 新增图片
    async afterRead(event) {
      const that = this
      let arrFile = []
      event.tempFiles.forEach(item => {
        arrFile.push({size: item.size, thumb: item.path, url: item.path})
      })
      let lists = [].concat(arrFile)
      let fileImageListLen = that.localFileList.length
      lists.map((item) => {
        that._that_[that._fileImageList_].push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
      })
      for (let i = 0; i < lists.length; i++) {
        const result = await that.uploadFilePromise(lists[i].url)
        let item = that.localFileList[fileImageListLen]
        that._that_[that._fileImageList_].splice(fileImageListLen, 1, Object.assign(item, {
          status: 'success',
          message: '',
          url: result
        }))
        fileImageListLen++
      }
      console.log(that._that_[that._fileImageList_]);

    },
    // 上传图片
    uploadFilePromise(url) {
      return new Promise((resolve) => {
        uni.uploadFile({
          url: uploadImg,
          filePath: url,
          name: 'file',
          success: (res) => {
            let resData = JSON.parse(res.data)
            // console.log('resData', resData)

            if (resData.code === 200) {
              resolve(resData.data.url)
            } else {
              console.error('', resData.msg)
            }
          }
        });
      })
    },


  }

}
</script>

<style scoped lang="scss">
.zshu-upload-img {

  --scale: 1; //宽高比例（不能直接写成分数形式）
  --num-columns: 1;
  --view-width: 100%;
  --gap: 10px;

  --item-width-local: calc((var(--view-width) - (var(--gap) * var(--num-columns))) / var(--num-columns));

  --item-height-scale: calc(var(--item-width-local) / var(--scale));

  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;

  //margin-right: calc(-1 * var(--gap));
  //background-color: blue;
  //outline: 1px solid blueviolet;

  gap: var(--gap);

  width: var(--view-width);

  .flex-item__view {
    box-sizing: border-box;
    position: relative;

  }


}

.del-view {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, .82);
}

.del-icon {
  position: absolute;
  top: 0;
  right: 0;
  box-sizing: border-box;
  z-index: 1;
  transform: translate(50%, -50%);
}


.image-item, .video-item {
  display: block;
  height: var(--item-height-scale);
  width: var(--item-width-local);
  border-radius: 5px;
}


.upload-icon-position {
  //border: 1px solid #000;

}


</style>

