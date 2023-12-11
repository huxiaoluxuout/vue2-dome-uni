<template>


  <view class="zshu-upload-img flex-container page-gap"
        :style="{'--num-columns':columnsLimit,'--scale':scale,'--view-width':width,'--gap':gap}">
    <!--图片-->
    <view class="flex-item flex-item__scale image-video-container" :class="{'position-ab':hiddenIcon}"
          v-for="(item,index) in filePathsView" :key="item.url + index">
      <image class="image-item" :src="item.url" mode="aspectFill" @click.stop="previewImage(index)"/>

      <view v-if="!hiddenIcon" class="del-icon" @click.stop="delImage(index)">
        <uni-icons type="close" color="#ff3c3c" size="26"></uni-icons>
      </view>

      <!--        <view class="loading" v-show="true"></view>-->

    </view>


    <!--图片 视频 上传-->
    <view v-show="isShowUpload"
          class="flex-item__scale image-video-container upload-icon-position"
          :class="{'upload-icon-ab':hiddenIcon}" @click="chooseFile"
    >

      <slot v-if="!hiddenIcon">

        <image class="image-item" mode="aspectFill" :src="uploadDefaultIcon"/>
      </slot>
    </view>
  </view>

</template>

<script>

// import {uploadImgUrl} from "@/Http/config";

export default {
  name: "zshu-upload-img",

  props: {
    fileImageList: {
      type: Array,
      default: () => []
    },

    multiple: Boolean,
    maxCount: {
      type: [String, Number],
      default: 3
    },


    // ======================
    // 总共允许上传数量
    limit: {
      type: [Number, String],
      default: 6
    },
    // 一行有几列
    columnsLimit: {
      type: [Number, String],
      default: 2
    },
    // 宽高比例
    scale: {
      type: [Number, String],
      default: `calc(${1})`
    },
    // 当前可用总宽度
    width: {
      type: [Number, String],
      default: '750rpx'
      // default: `calc(750rpx - 30rpx)`
    },
    gap: {
      type: String,
      default: `30rpx`
    },
    // ======================


    isHiddenIcon: Boolean,

    srcUrl: {
      type: Array,
      default: () => {
        return [
          {
            url: 'https://jxgx88.oss-cn-shenzhen.aliyuncs.com/uploads/20230914/4f0f962a712b9dc277d6ed0c7b00e632.jpg',

          }
        ]
      },
    },


    _that_: {
      type: Object,
      default: () => {
      }
    },
  },
  data() {
    return {

      hiddenIcon: '',

      // filePathsView: '',
      uploadDefaultIcon: 'https://xcx.jxgxsmt.com/static/images/add-img.png',
      viewTempSrcUrl: []

    };
  },
  computed: {

    localFileList() {
      return this.fileImageList
    },

    isShowUpload() {
      return false
      // return this.hiddenIcon ? this.hiddenIcon : Number(this.limit) > this.filePathsView.length;
    },

    chooseCountLimit() {
      return Number(this.limit) - this.filePathsView.length;
    },

    viewInitSrcUrl() {
      return this.srcUrl
    },
    filePathsView() {
      return this.viewInitSrcUrl.concat(this.viewTempSrcUrl)
    },

    postSrcUrl() {
      return this.srcUrl
    }


  },

  methods: {
    chooseFile() {
      uni.chooseImage({
        count: this.chooseCountLimit,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          this.afterRead(res)
        },
        fail: function (fail) {
          console.warn(fail)
        }
      });

    },


    delImage() {

    },
    previewImage() {

    },

    // =================
    // 删除图片
    deletePic(event) {
      console.log(321213213213213)
      this._that_.fileImageList.splice(event.index, 1)
    },

    // 新增图片
    async afterRead(event) {
      console.log(event)
      console.log('------------------------')
      console.log(event.file)
      return
      // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file)
      let fileImageListLen = this._that_.fileImageList.length
      lists.map((item) => {
        this._that_.fileImageList.push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
      })
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url)
        let item = this._that_.fileImageList[fileImageListLen]
        this._that_.fileImageList.splice(fileImageListLen, 1, Object.assign(item, {
          status: 'success',
          message: '',
          url: result
        }))
        fileImageListLen++
      }
    },

    uploadFilePromise(url) {
      return new Promise((resolve) => {
        /*uni.uploadFile({
          url: uploadImgUrl,
          filePath: url,
          name: 'file',
          success: (res) => {
            setTimeout(() => {
              resolve(JSON.parse(res.data).data.url)
            }, 1000)
          }
        });*/
      })
    },


  }

}
</script>

<style scoped>
.zshu-upload-image {
//position: relative; //width: 100%;
}

.loading {
  position: absolute;
  z-index: 2;
  border-radius: 5px;
  background-color: rgba(130, 130, 130, .5);
  inset: 0;
}

.loading:after {
  content: '';
  position: absolute;
  z-index: 2;
  inset: 0;
  animation: uni-loading 1s steps(12) infinite;
  background-size: 100%;
  scale: .5;


}

.page-gap {
  position: relative;
}

.image-video-container {
  position: relative;
  width: 350rpx;

}

.del-icon {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  box-sizing: border-box;
  z-index: 1;
}


.image-item {
  display: block;

  width: var(--view-width);
  height: var(--item-height-scale);


  /*  height:750rpx;
    width:750rpx;*/

  border-radius: 5px;
}

.upload-icon-position {

}

.upload-icon-ab {
  position: absolute;
  left: 0;
  bottom: calc(-1 * var(--item-height-scale));
  right: calc(-1 * var(--gap));
  z-index: 4;
  height: calc(var(--item-height-scale) / 2 - 30rpx);
  background-color: rgba(45, 45, 45, .6);
}

.position-ab {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: calc(-1 * var(--gap));

}
</style>
