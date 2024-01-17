<template>
  <view>


    <zshu-tabs :view-height="0" :active-id="activeId" @updateActiveId="id=>activeId = id"
               :list-tabs="listTabs"></zshu-tabs>

    <zshu-slider></zshu-slider>


    <button style="margin-top: 20px;font-size: 14px;" @click="ylxNavigateTo('pages/A1/A1?aa=66',{})"> 页面1</button>
    <button style="margin-top: 20px;font-size: 14px;" @click="ylxNavigateTo('pages/A2/A2?aa=66',{})"> 页面2</button>
    <button style="margin-top: 20px;font-size: 14px;" @click="ylxNavigateTo('pages/A3/A3?aa=66',{})"> 页面3</button>
    <button style="margin-top: 20px;font-size: 14px;" @click="ylxNavigateTo('pages/A4/A4?aa=66',{})"> 页面4</button>

    <button style="margin-top: 20px;font-size: 14px;" @click="toPage1">跳转到还未打开过的tabbar页面</button>
    <button style="margin-top: 20px;font-size: 14px;" @click="uploadImg">uploadImg</button>


    <zshu-uploadimg ref="uploadImg" columns-limit="2" gap="10px" scale="1.58" limit="13"
                    hidden-upload-icon img-width="150px" only-camera
                    :fileImageList="fileImageList" @updateFileImageList="updateFileImageList"
    >

    </zshu-uploadimg>
    <button style="margin-top: 20px;font-size: 14px;" @click="clearStorage"> clearStorage</button>

    <tabbar :INDEX="0"></tabbar>

  </view>
</template>

<script>
import ZshuNavbar from "@/components/zshu-components/zshu-navbar.vue";

import {ylxNavigateTo} from "@/utils/uniTools";

import mixinsYlxUniEventBus from "@/mixins/mixinsYlxUniEventBus";

import {mapState, mapGetters, mapMutations,mapActions} from "vuex"

export default {
  components: {ZshuNavbar},
  mixins: [mixinsYlxUniEventBus],
  data() {
    return {
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
      //   ---------------------

      fileImageList: [{
        url: 'https://images-jinti.oss-cn-hangzhou.aliyuncs.com/5fa1201ea36ad.jpg'
      }, {
        url: 'https://app-jinti.oss-cn-hangzhou.aliyuncs.com/uploads/20240107/f790552571bb4888293896d289b00295.png'
      }],


    }
  },
  onLoad() {
    // console.log(this.$store.state.list)
    // console.log(this.list)
    console.log('xixi',this.xixi)
    // console.log(this.haha)
    // console.log(this.getList1)
    // console.log(this.getValueById1(1))
    // this.asyncInc1(6)
    // this.out(3)
    // this.out(4)
    // console.log(this.list1)
    // console.log(this.list2)
    // console.log(this.newList)
  },
  computed: {
    /*...mapState({
      list1: state => state.list,
      list2: 'list',
      newList({list}) {
        return list.filter(item => item.status)
      },


    }),*/
    // ...mapState(['list']),
    // ...mapGetters(['activeList','unActiveList'])
    // 起别名
    ...mapGetters({
      xixi: 'activeList',
      // haha: 'unActiveList',
      // getList1: 'getList',
      // getValueById1: 'getValueById',
    })


  },
  methods: {
    // ...mapMutations(['inc']),
    /*...mapMutations({
      out:'inc'
    }),
    ...mapActions({
      asyncInc1:'asyncInc'
    }),*/

    ylxNavigateTo,
    clearStorage() {
      uni.removeStorageSync('token')
    },
    toPage1() {
      uni.$emit('emitApp', {eventName: 'tabbar2', param: 1})
      ylxNavigateTo('pages/tabbar2/tabbar2')
    },
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
    }

  }
}
</script>

<style>

</style>
