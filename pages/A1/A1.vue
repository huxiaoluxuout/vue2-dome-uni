<template>
  <view>
    <zshu-navbar title="A!" size="16"
                 :navbar-style="{backgroundImage: `linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)`}">
      <!--            <template #center>
                    <view style="width: 90%;background-color:royalblue;">444</view>
                  </template>-->

    </zshu-navbar>

    <button @click="$u.route('/pages/A3/A3')">A3</button>


    <view style="position: fixed;top: 50%;left:50%;transform:translateX(-50%);background-color:#fff;z-index: 10;">
      <button @click="toPrePage">传参/返回上一页</button>
    </view>

  </view>
</template>

<script>
import mixinsPullDownRefresh from "@/mixins/mixinsPullDownRefresh";
import mixinsUseAppEventBus from "@/mixins/mixinsUseAppEventBus";
import mixinsOnRegisterEvent from "@/mixins/mixinsOnRegisterEvent";

// import mixinsYlxUniEventBus from "@/mixins/mixinsYlxUniEventBus";

export default {
  mixins: [mixinsPullDownRefresh,mixinsUseAppEventBus,mixinsOnRegisterEvent],
  data() {
    return {}
  },

  methods: {

    /*onHandler(handler) {
      if (typeof handler === 'function') {
        handler((callbackPrams) => {
          console.log('A1', callbackPrams)
        })
      } else {
        console.log(handler)

      }

    },*/

    ylxOnPullDown() {
      console.log('1 onPullDown');
    },

    ylxPullDownCallBack() {
      console.log('2 pullDownCallBack');

    },

    toPrePage() {
      console.log('A1')
      uni.$emit(this.preEventName,()=>{
        uni.navigateBack()
      })
    },
    ylxOnCurrentPageHandler(callback) {
      console.log(callback)
      typeof callback === 'function' && callback()
    },


  }
}
</script>

<style>

</style>
