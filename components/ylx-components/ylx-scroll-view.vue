<template>
  <view class="ylx-scroll-view">
    <scroll-view class="scroll-view" :style="scrollViewStyle"
                 :scroll-y="true"
                 :refresher-enabled="refresherEnabled"
                 :refresher-triggered="triggered"
                 :refresher-threshold="100"
                 refresher-background="transparent"
                 @refresherrefresh="onRefresh"
                 @refresherabort="onAbort"
                 @scrolltolower="onScrollReachBottom"
                 @refresherrestore="onRestore"
    >
      <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid aut autem delectus dicta
        doloremque eum fuga, in laborum laudantium minus odit officia omnis quo repellat reprehenderit sapiente
        unde voluptatum.
      </div>
      <div>Ab atque distinctio, dolores modi molestias rem repellendus! Cum nemo repudiandae soluta. Asperiores,
        autem dicta eius eos id laborum, molestiae nulla officia quidem quisquam reprehenderit sed ullam veritatis
        vitae voluptatum.
      </div>
      <div>Blanditiis dicta doloribus eius id ipsa numquam perferendis reprehenderit voluptatem! Architecto
        asperiores aut consectetur distinctio dolorum ea eaque fugiat inventore iusto maxime natus necessitatibus
        possimus quo saepe, sed tenetur veritatis.
      </div>
      <div>Aperiam dolorem doloribus et eum fuga, harum, illo, in iure iusto maiores maxime modi nihil omnis
        praesentium quaerat qui quia quidem quisquam quod ratione repellat sint soluta sunt totam veritatis?
      </div>
      <div>Cum cupiditate dolores error eum eveniet exercitationem facere fugiat ipsum magni mollitia nam nesciunt
        nostrum odit optio pariatur provident, quaerat quisquam quo repellat rerum similique veniam vero
        voluptatum. Libero, odio.
      </div>
      <div>Distinctio inventore nulla odit perspiciatis. Ab alias atque commodi cum debitis dolorem earum eligendi
        eos error eveniet ex explicabo fugiat, ipsa modi nihil nostrum pariatur quis sed sunt voluptas
        voluptatibus.
      </div>
      <div>Autem, consequatur consequuntur ea earum in nulla quae? Consequatur cum deserunt dicta dolor earum
        explicabo incidunt ipsa labore minima minus molestiae officiis optio placeat quia quo recusandae
        similique, voluptate voluptatem?
      </div>
      <div>Amet consequuntur dicta distinctio eos expedita explicabo minima nemo placeat repellendus saepe
        voluptate, voluptates voluptatum! A, ab, aut debitis dicta eaque est, illo ipsam labore molestias
        perferendis quaerat temporibus veritatis.
      </div>
      <div>Deleniti incidunt modi nulla provident sed. Aut blanditiis commodi quisquam tenetur. Aliquid architecto
        assumenda aut beatae consequuntur dignissimos, illo nisi non, obcaecati optio perferendis praesentium qui
        quod recusandae repudiandae sed.
      </div>
      <div>Ad animi consequuntur, cupiditate dolorem ea eaque facere facilis hic, laboriosam necessitatibus
        nostrum omnis optio quam, recusandae rem sequi similique. Dicta explicabo facilis laboriosam magni
        perspiciatis quam voluptatibus. Deleniti, necessitatibus.
        zzzzzzz
      </div>

      <!--      <view class="list-item">
              <view v-show="isLoading">
                <u-loading-page :loading="isLoading"></u-loading-page>
              </view>
              <view v-show="!isLoading">
                <view v-show="!isEmpty">
                  <slot name="default"></slot>
                </view>
                <view v-show="isEmpty">
                  <view class="empty-data">
                    <view>{{ emptyText }}</view>
                  </view>
                </view>
              </view>
            </view>-->
    </scroll-view>
  </view>
</template>

<script>


/*
import useCallbackOnDataReady from "@/common/hooks/useCallbackOnDataReady";

const {readyCallback, registerCallbacks, unReadyCallback} = useCallbackOnDataReady();
*/

export default {
  name: "ylx-scroll-view",

  props: {

    /*scrollInto: {
      type: String,
      default: ''
    },
    emptyText: {
      type: [String, Number],
      default: '数据为空'
    },
    isEmpty: {
      type: [Boolean],
      default: false
    },
    isLoading: {
      type: [Boolean],
      default: true
    },*/

    //开启下拉刷新
    refresherEnabled: Boolean,

    disableScrollView: Boolean,
    doFunction: {
      type: Function,
      default: () => () => {
      }
    },

  },
  computed: {
    scrollViewStyle() {
      return `height:${this.disableScrollView ? '1000%' : '100%'};`
    },

  },
  data() {
    return {
      onRefreshing: false,
      refresherTriggered: false,
      triggered: false,
      triggeredTime: null
    }
  },


  methods: {
    onScrollReachBottom() {
      console.log('底部触发')
    },

    // 下拉执行操作
    onRefresh() {
      clearTimeout(this.triggeredTime)
      this.triggeredTime = null
      if (!this.triggered) {
        //下拉刷新，先变true再变false才能关闭
        this.triggered = true;
        this.doFunction(()=>{
          this.closeTriggered()
        })
      }
    },

    // 下拉操作执行完成
    onRestore() {
      this.triggered = false;
      clearTimeout(this.triggeredTime)
      this.triggeredTime = null
      console.log("onRestore");
    },

    //关掉圈圈，需要先执行完刷新操作
    closeTriggered() {
      this.triggeredTime = setTimeout(() => {
        this.triggered = false;
      }, 1000);
    },

    onAbort() {
      console.log("onAbort");
      this.triggered = false;

    },
    onPulling(e) {
      // console.log("onpulling", e);
    },

  },
}
</script>

<style scoped lang="scss">
.ylx-scroll-view, .scroll-view {
  height: 100%;
  box-sizing: border-box;
}


/*.list-item {
  height: 100%;
  box-sizing: border-box;
}

.touch-action {
  touch-action: none;
}

.empty-data {
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  image {
    display: block;
    margin-top: 10%;
  }

  view {
    padding-top: 20rpx;
    font-size: 14px;
    color: #707070;
  }

}*/
</style>
