<template>
  <view>


    <button style="margin-top: 20px;font-size: 14px;" @click="uploadImg">uploadImg</button>

    <zshu-uploadimg ref="uploadImg" columns-limit="2" gap="10px" scale="1.58" limit="13"
                    hidden-upload-icon img-width="150px" only-camera
                    :fileImageList="fileImageList" @updateFileImageList="updateFileImageList"
    >

    </zshu-uploadimg>
    <uni-file-picker
        v-model="imageValue"
        fileMediatype="image"
        mode="grid"
        @select="select"
        @progress="progress"
        @success="success"
        @fail="fail"
    />

    <button style="margin-top: 20px;font-size: 14px;" @click="uploadImgUniChoose">上传图片</button>

    <view style="display:flex; gap: 20px;flex-wrap: wrap;">
      <image style="width: 100px;height: 100px;" :src="item.path" v-for="(item,index) in uniChooseImageValue"
             :key="index"/>
    </view>

    <button style="margin-top: 20px;font-size: 14px;" @click="confirmUploadImg">确认上传</button>


    <button style="margin-top: 20px;font-size: 14px;" @click="clearStorage"> clearStorage</button>
		
		
		<view style="display:flex; gap: 20px;flex-wrap: wrap;margin-top: 20px;">
		  <image style="width: 110px;height: 110px;" :src="item.image" v-for="(item,index) in goodsList"
		         :key="index"/>
		</view>
		
		<button style="margin-top: 20px;font-size: 14px;" @click="getGoodsList">获取商品</button>

    <tabbar :INDEX="0"></tabbar>


  </view>
</template>

<script>
import ZshuNavbar from "@/components/zshu-components/zshu-navbar.vue";

import {ylxNavigateTo} from "@/utils/uniTools";

import mixinsYlxUniEventBus from "@/mixins/mixinsYlxUniEventBus";


import ZshuUploadimg from "@/components/zshu-components/zshu-uploadimg.vue";
import {uniChooseImage} from "@/common/js/uniApi";

export default {
  components: {ZshuNavbar, ZshuUploadimg},
  mixins: [mixinsYlxUniEventBus],
  data() {
    return {

      activeId: 2,
      //   ---------------------

      fileImageList: [{
        url: 'https://images-jinti.oss-cn-hangzhou.aliyuncs.com/5fa1201ea36ad.jpg'
      },/* {
        url: 'https://app-jinti.oss-cn-hangzhou.aliyuncs.com/uploads/20240107/f790552571bb4888293896d289b00295.png'
      }*/],
      // -------------------------------------
      imageValue: [],
      uniChooseImageValue: [],
			goodsList:[]

    }
  },
  onLoad() {
		this.getGoodsList()
  },
  computed: {},
  methods: {
    // 获取上传状态
    select(e) {
      console.log('选择文件：', e)
    },
    // 获取上传进度
    progress(e) {
      console.log('上传进度：', e)
    },

    // 上传成功
    success(e) {
      console.log('上传成功')
    },

    // 上传失败
    fail(e) {
      console.log('上传失败：', e)
    },
    // -------------------------------
    ylxNavigateTo,
    clearStorage() {
      uni.removeStorageSync('token')
    },
    // ---------------------------------------------
    // 上传图片
    uploadImg() {
      this.$refs.uploadImg.chooseFile()
    },
    updateFileImageList({type, param}) {
      if (type === 'del') {
        this.fileImageList.splice(param, 1)
      } else if (type === 'uploading') {
        this.fileImageList.push(param)
      } else if (type === 'success') {
        this.fileImageList.splice(param.fileImageListLen, param.num, param.itemAssign)
      }
    },
    // ---------------------------------------------
    uploadImgUniChoose() {
      uniChooseImage().then(res => {
        console.log('uniChooseImage', res)
        this.uniChooseImageValue = res.tempFiles

      })
    },
    confirmUploadImg() {
      let newArr = this.uniChooseImageValue.map(async item => {
        return await this.uploadFile()

      })
      Promise.all(newArr).then(res => {
        console.log('1111', res)
      })
    },
    uploadFile(item) {
      return uniCloud.uploadFile({
        filePath: item.path,
        cloudPath: item.name
      }).then(res => {
        console.log('上传-uniCloud', res)
      })
    },
		getGoodsList(){
			uniCloud.callFunction({
				name:'getGoods',
				data:{size:4}
			}).then(res=>{
				console.log(res)
				this.goodsList=res.result.data
			})
		}


  }
}
</script>


<style>

</style>
