<template>
  <view>
    3333
    <view>1</view>
    <view>2</view>
    <view>3</view>
    <view>4</view>
    <view>5</view>
    <view>6</view>
    <view>6</view>
    <view>7</view>
    <view>9</view>
    <view>0</view>
    <view>1</view>
    <view>3</view>
    <view>4</view>
    <view>556</view>
    <view>7</view>
    <view>7</view>
    <view>8</view>
    <view>9</view>
    <view>3</view>
    <view>r</view>
    <view>r</view>
    <view>r</view>
    <view>r</view>
    <view>r</view>
    <view>r</view>
    <view>r</view>
    <view>r</view>
    <view>r</view>
    <view>r</view>
    <tabbar :INDEX="2"></tabbar>

  </view>
</template>

<script>
import {getHomeBannerList} from "@/Http/apis/test_api";
import mixinsNextPageManager from "@/mixins/mixinsNextPageManager";


export default {
  mixins: [mixinsNextPageManager],
  data() {
    return {
      viewDataList: []
    }
  },
  onLoad() {
    this._getHomeBannerList()
    console.log('this:=====:', this)
    const {pullDownRefreshSetFunctions, pullDownRefreshAddFunctions, pullDownRefreshReload} = this.pullDownRefreshFunctions()
    /*pullDownRefreshSetFunctions(this.foo, 444)

    pullDownRefreshAddFunctions(this.foo, 666)*/

    // pullDownRefreshAddFunctions(this._getHomeBannerList)
    console.log('xxxxxxx-----xxxxx', this.foo1());
    const { page,reload, dataList, nexPageDoFunQueue, nexPageSetAddFunction, nexPageSetFunction} = this.foo1()
    nexPageSetAddFunction(this._getHomeBannerList)
    reload()

    //==============


  },
  methods: {
    foo(info) {
      console.log('foo', info)
    },
    _getHomeBannerList() {
      console.log('page:', this.foo1().page,)
      // console.log('pageSize:', this.foo1().pageSize)
      getHomeBannerList({
        "user_id": 13,
        "appscret": "47a610ee35391da40ec7f6b73e15b902",
        "token": "2b8f63cc39629f4ca92be548673978a8f80f834b40ad51add17ba6c71e896d79",
        /*  page:this.foo1().page,
          pageSize:this.foo1().pageSize,*/
      }).then(res => {
        console.log(321321321132, res)

        // this.viewDataList = this.foo1().setDataList(res.data).dataList

      })
    },

  },

}
</script>

<style scoped>
view {
  line-height: 2.5;
}
</style>
