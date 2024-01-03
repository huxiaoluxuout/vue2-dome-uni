<template>
  <view>
    <zshu-navbar title="A!" size="16">
      <!--      <template #center>
              <view style="width: 90%;background-color:royalblue;">444</view>
            </template>-->

    </zshu-navbar>

    <view style="position: fixed;top: 50%;left:50%;background-color:#fff;z-index: 10;">
      <button @click="ylxUniEmit('haha',callback)">xixi</button>
    </view>

  </view>
</template>

<script>
import mixinsPullDownRefresh from "@/mixins/mixinsPullDownRefresh";
import mixinsNextPageManager from "@/mixins/mixinsNextPageManager";
function foo() {
  console.log('foo')
}
export default {
  mixins: [mixinsPullDownRefresh, mixinsNextPageManager],
  data() {
    return {}
  },
  onLoad() {
    this.ylxPullDownRefresh.setEmitFunctions(foo)

  },
  methods: {

    ylxOnPullDown() {
      console.log('1 onPullDown');

    },
    ylxPullDownCallBack() {
      console.log('2 pullDownCallBack');

    },
    ylxOnReachBottom() {
      console.log('ylxOnReachBottom');
      // this.ylxNextPageManager.setDataList([])
      // console.log(this.ylxNextPageManager.getPage());
      // console.log(this.ylxNextPageManager.getDataList());

    },
    callback(info){
      console.log('A1',info)
    }

  }
}
</script>

<style>

</style>
