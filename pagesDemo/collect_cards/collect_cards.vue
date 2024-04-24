<template>
  <view class="padding-box luck_draw luck_background_image" style="background-image:url('https://miniprogramuk-w.cmlink.com/storage/202301/05/24/6464315c0a80112d07bcc4252574ad.png')">

<!--
      <view>
        <image src="https://miniprogramuk-w.cmlink.com/storage/202301/05/35/66c62405b9b3bb8f80abe67c8a956b.png" mode="aspectFill" class="blind_image"></image>

        <view class="blind_card">
          <view v-show="!fucard">
            <view v-for="(a, b) in prizeDetail.prize_list" :key="b" class="card_for" @click="luckCard(a, b)">
              <view class="card_item" style="background: none">
                <view class="card_item_within">
                  <view></view>
                </view>
                <view class="card_item_name">{{ a.fucard_name }}</view>
              </view>
            </view>
          </view>
          <view v-show="fucard">
            <view v-for="(i, o) in prizeList" :key="o" class="card_for">
              <view class="card_item">
                <view class="card_item_top luck_background_image">
                  <span></span>
                  {{ i.fucard_name }}
                  <span></span>
                </view>
                <view class="card_item_image">
                  <image :src="server_url + i.fucard_image" mode="heightFix"></image>
                </view>
                <view class="card_item_num">{{ i.fucard_num }}</view>
              </view>
            </view>
          </view>
        </view>

&lt;!&ndash;        <view class="card_strategy">
          <view class="card_strategy_content">
            <view class="strategy_content_item luck_background_image">
              <view class="luck_background_image"></view>
              <view>
                <view>
                  {{ this.$t('fucard.activityTips') }}
                </view>
                <view>{{ prizeDetail.desc }}</view>
              </view>
            </view>
          </view>
        </view>
        <view class="foot_btn luck_background_image">
          <view class="foot_btn_num">{{ prize_num }}</view>
          <button class="foot_btn_btn" @click="cardShow()"> Chaka</button>
          <view class="foot_btn_luck luck_background_image" @click="unCardShow">
            startCardCollection
            <span style="margin-left: 36rpx">x has_times</span>
          </view>
          <button open-type="share" class="foot_btn_btn">invite</button>
        </view>
        <u-popup :show="show" mode="center">
          <view class="popup_card">
            <view class="popup_fireworks">
              <image :src="popup_fireworks" style="width: 100%; height: 100%"></image>
            </view>
            <view class="popup_card_content">
              <view class="popup_card_just" :animation="animationMain">
                <view class="popup_card_just_item">
                  <view class="popup_card_just_within">
                    <view></view>
                  </view>
                  <view class="popup_card_just_title">fucard_name</view>
                </view>
              </view>
              <view class="popup_card_back" :animation="animationBack" @click="close()">
                <view class="popup_card_back_item">
                  <view class="popup_card_back_item_top luck_background_image">
                    <span></span>
                    receiveaward.name
                    <span></span>
                  </view>
                  <view class="popup_card_back_item_image">
                    <image :src="server_url + receiveaward.prize_img" mode="aspectFit"/>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="popup_close">
            <u-icon name="close" color="#fff" size="26" @click="close()"></u-icon>
          </view>
        </u-popup>
        <u-popup :show="cashshow" mode="center">

          <view class="popup_cashconter" @click="cashreceive">
            <view class="popup_cashimage">
              <image :src="cashPrize_url" class="popup_cashprize" mode="aspectFill"></image>
              <view class="popup_text">{{ cashPrize.coupon.money }}元{{ cashPrize.prize_type_text }}</view>
            </view>
          </view>
          <view class="popup_close" @click="cashreceive">
            <u-icon name="close" color="#fff" size="26"></u-icon>
          </view>
        </u-popup>&ndash;&gt;

      </view>

-->


  </view>
</template>
<script>
// import {fucardDetail, fucardLuck, awardPrize, fucardList, memberTimes, fucardPrizet, receiveMemberInfo} from '@/api/index';



export default {

/*  data() {
    return {
      index: true,
      detail: {
        fucard_name: '31'
      },
      loading: true,
      animationMain: null, //正
      animationBack: null, //反
      cashshow: false,
      fucard: false,
      show: false,
      server_url: this.$server_url,
      prizeDetail: {},
      prizeList: [],
      prize_num: 0,
      receiveaward: {},
      cashPrize: {},
      boxwidth: null,
      boxsellheight: null,
      invite_member_id: '',
      theTime: null,
      showClose: false,

      fousebtn: false,

    };
  },
  computed: {
    cashPrize_url({getLocale}) {
      let imgUrl = getLocale === 'zh-Hans' ? 'cashPrize.png' : 'cashPrize_en.png'
      return this.$server_url + '/static/images/activity/' + imgUrl
    },
    popup_fireworks({getLocale}) {
      let imgUrl = getLocale === 'zh-Hans' ? 'popup_fireworks.png' : 'popup_fireworks.png'
      return this.$server_url + '/static/images/activity/' + imgUrl
    },
  },
  onLoad(options) {
    this.invite_member_id = this.$common.invitation(options, '/pages/luck-draw/fucard/fucard') || '';
    this.hasAvatar();
    this.prizeFucardList();
    this.prizeGetHandle();
    this.getMemberTimes();
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage']
    });
  },
  onShareAppMessage() {
    return {
      title: this.prizeDetail.share.title,
      path: '/pages/luck-draw/fucard/fucard?invite_member_id=' + uni.getStorageSync('member_id')
    };
  },
  onShareTimeline() {
    return {
      title: this.prizeDetail.share.title,
      query: '/pages/luck-draw/fucard/fucard?invite_member_id=' + uni.getStorageSync('member_id')
    };
  },
  onUnload() {
    if (this.theTime) {
      clearInterval(this.theTime);
      this.theTime = null;
    }
  },
  methods: {
    cardShow() {
      this.fucard = !this.fucard
    },
    unCardShow() {
      this.fucard = false
    },
    navigator(...args) {
      this.$common.navigator(...args)
    },
    // 反转卡片
    rotateFn(e) {
      this.animation_main = uni.createAnimation({
        duration: 600,
        timingFunction: 'linear'
      });
      this.animation_back = uni.createAnimation({
        duration: 600,
        timingFunction: 'linear'
      });
      this.index = false;
      // 点击正面
      if (e == 1) {
        this.showClose = true
        this.animation_main.rotateY(180).step();
        this.animation_back.rotateY(0).step();
        this.animationMain = this.animation_main.export();
        this.animationBack = this.animation_back.export();
      } else {

        this.animation_main.rotateY(0).step();
        this.animation_back.rotateY(-180).step();
        this.animationMain = this.animation_main.export();
        this.animationBack = this.animation_back.export();
        this.showClose = false

      }
    },

    //查询抽奖次数
    getMemberTimes() {
      // this.theTime = setInterval(() => {
      memberTimes({type: 2}).then(i => {
        if (i.code == 200) {
          this.prizeDetail.has_times = i.data.times;
        }
      });
      // }, 2000);
    },

    //获得数据
    prizeGetHandle() {
      let that = this;
      fucardDetail({invite_member_id: that.invite_member_id}).then(res => {
        if (res.code === 200) {
          that.zhEnToggle([res.data])
          that.zhEnToggle(res.data.prize_list)
          that.prizeDetail = res.data;
        } else {
          if(!res.data){
            uni.showModal({
              showCancel:false,
              title: res.message,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定');
                  uni.navigateBack()
                } else if (res.cancel) {
                  console.log('用户点击取消');
                }
              }
            });
          }
        }
        setTimeout(() => {
          that.loading = false;
        }, 400);
      });
    },
    //已有卡
    prizeFucardList() {
      let that = this;
      var num = 0;
      fucardList().then(res => {
        if (res.code === 200) {
          res.data.forEach(item => {
            num = item.fucard_num + num;
          });
          that.prize_num = num;
          that.zhEnToggle(res.data)
          that.prizeList = res.data;
        } else {
          that.$u.toast(res.message);
        }
      });
    },

    //点击抽卡
    luckCard(item, index) {
      console.log('抽卡', item, index)
      let that = this;
      if (that.prizeDetail.has_times <= 0) {
        that.$u.toast(this.$t('fucard.noChance'));
        return false;
      }
      if (that.show || that.cashshow) {
        return false;
      }
      that.show = true;
      that.index = true;

      that.detail = item;
      that.receiveaward = {};
      fucardLuck({total_num: 6, key: index}).then(res => {
        if (res.code === 200) {
          res.data.array_name = res.data.name.split('');
          that.zhEnToggle([res.data])
          that.receiveaward = res.data;
          that.prizeGetHandle();
          that.rotateFn(1);
          that.getMemberTimes()

        } else {
          that.$u.toast(res.message);
        }
      });
    },
    //关闭u-popup
    close() {
      var that = this;
      if (that.index) {
        return false;
      }
      that.show = false;
      that.prizeFucardList();
      setTimeout(function () {
        that.rotateFn(2);
      }, 200);
      if (that.receiveaward.is_collect_full == 1) {
        fucardPrizet().then(i => {
          if (i.code == 200) {
            that.prizeFucardList();
            that.prizeGetHandle();
            that.getMemberTimes();

            // 折扣码
            if (i.data.prize_type === 7) {
              that.$refs.zhuluckpopup3.show = true
              that.$refs.zhuluckpopup3.model.name = i.data.code.name
              that.$refs.zhuluckpopup3.model.code = i.data.code.code
              that.$refs.zhuluckpopup3.model.receive_id = i.data.receive_id
              that.$refs.zhuluckpopup3.giftName = i.data.name

            } else
                // 实体奖品
            if (i.data.prize_type === 3) {
              if (i.data.prize.type === 1) {
                that.$refs.zhuluckpopup.show = true
                that.$refs.zhuluckpopup.model.receive_id = i.data.receive_id
                that.$refs.zhuluckpopup.model.type = i.data.prize.type
                that.$refs.zhuluckpopup.giftName = i.data.prize.name

              } else if (i.data.prize.type === 2) {
                that.$refs.zhuluckpopup2.show = true
                that.$refs.zhuluckpopup2.model.receive_id = i.data.receive_id
                that.$refs.zhuluckpopup2.model.type = i.data.prize.type
                that.$refs.zhuluckpopup2.giftName = i.data.prize.name

              }

            }  else {
              that.cashPrize = i.data;
              that.cashshow = true;
            }

          }
        });
      }
    },
    cashreceive() {
      this.receive(this.cashPrize.receive_id);
    },
    //领卡
    // 由后端自动领取
    receive(id) {
      let that = this;
      /!*	awardPrize({ receive_id: id }).then(res => {
          if (res.code == 200) {*!/
      that.prizeGetHandle();
      that.prizeFucardList();
      that.cashshow = false;
      setTimeout(() => {
        that.cashPrize = {};
      }, 300);
      /!*	} else {
          that.$u.toast(res.message);
        }
      });*!/
    },

    // -------------------新加------------------------
    giftClose(){
      this.getMemberTimes()
      this.prizeFucardList();
      this.prizeGetHandle();
    },
    // 实物奖品
    giftSubmit(model) {
      console.log('实物奖品', model)
      receiveMemberInfo({
        name: model.name,
        phone: model.phone,
        address: model.address,
        receive_id: model.receive_id,
        type: model.type
      }).then(res => {
        this.fousebtn = false
      })
    },

    // 流量包
    giftSubmit2(model) {
      console.log('流量包', model)

      receiveMemberInfo({
        phone: model.phone,
        receive_id: model.receive_id,
        type: model.type

      }).then(res => {
        this.fousebtn = false
      })
    },

    // 折扣码
    giftSubmit3(model) {
      receiveMemberInfo({
        receive_id: model.receive_id
      }).then(res => {
        this.fousebtn = false

      })
    },
  }*/

};
</script>

<style scoped lang="scss">/*

.padding-box {
  margin-top: 0;
  padding: 0;
}

.blind_image {
  height: 198rpx;
  width: calc(100% - 164rpx);
  margin: 80rpx 0 148rpx 102rpx;
}

.blind_tip {
  text-align: center;
  width: 454rpx;
  height: 70rpx;
  line-height: 60rpx;
  margin: auto;
  background-image: url('@/static/test/card_tip.png');

  span {
    font-size: 22rpx;
    color: #f74a2e;
  }
}

.blind_card {
  overflow: hidden;
  padding: 26rpx;
  padding-bottom: 4rpx;
}

.blind_rule {
  width: 86rpx;
  height: 86rpx;
  background: #ff8098;
  opacity: 1;
  border: 2rpx solid #ffffff;
  font-size: 24rpx;
  font-weight: 400;
  color: #ffffff;
  line-height: 30rpx;
  text-align: center;
  border-radius: 50%;
  position: absolute;
  right: 30rpx;
  top: 248rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card_for {
  width: calc(33.3% - 24rpx);
  float: left;
  height: 274rpx;
  margin: 0 12rpx 32rpx 12rpx;
  background: linear-gradient(#f8e499, #eaae67);
  border-radius: 12rpx;
  box-shadow: 0rpx 2rpx 12rpx 2rpx rgba(165, 82, 0, 0.4);
}

.card_item {
  width: calc(100% - 28rpx);
  height: 248rpx;
  margin: 12rpx;
  border-radius: 12rpx;
  display: flex;
  justify-items: center;
  text-align: center;
  justify-content: center;
  border: 1rpx solid rgba(221, 138, 48, 0.6);
  position: relative;
  background: #f4d7b3;
}

.card_item_within {
  width: 116rpx;
  height: 116rpx;
  border: 1rpx solid rgba(221, 138, 48, 0.2);
  border-radius: 16rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(45deg);
  margin-top: 64rpx;
  background: RGBA(244, 214, 160, 1);

  view {
    border: 1rpx solid rgba(245, 184, 122, 0.4);
    width: 90rpx;
    height: 90rpx;
    border-radius: 16rpx;
  }
}

.card_item_name {
  font-size: 32rpx;
  color: #d0793a;
  font-weight: bold;
  //width: 40rpx;
  text-align: center;
  position: absolute;
  margin-top: 50%;
  transform: translateY(25%);
}

.card_item_top {
  background-image: url('@/static/test/card_item_top.png');
  width: 118rpx;
  height: 40rpx;
  left: 40rpx;
  padding-top: 2rpx;
  display: flex;
  color: #fff;
  font-size: 24rpx;
  font-weight: bold;
  justify-items: center;
  text-align: center;
  justify-content: center;

  span {
    width: 6rpx;
    height: 6rpx;
    background-color: #fff;
    margin: 0 6rpx;
    margin-top: 14rpx;
    border-radius: 12rpx;
  }
}

.card_item_image {
  overflow: hidden;
  width: 100%;
  height: 180rpx;
  position: absolute;
  bottom: 10rpx;
  z-index: 4;

  image {
    width: 100%;
    height: 100%;
  }
}

.card_item_num {
  text-align: center;
  width: 40rpx;
  line-height: 40rpx;
  height: 40rpx;
  background-color: #ff5e44;
  border-radius: 50%;
  border: 4rpx solid #fdf1c3;
  color: #fff;
  font-size: 24rpx;
  position: absolute;
  right: -24rpx;
  top: -24rpx;
  z-index: 5;
}

.card_strategy {
  text-align: center;
}

.card_strategy_content {
  height: 184rpx;
  width: calc(100% - 48rpx);
  margin: 0rpx 24rpx 20rpx 24rpx;
  border-radius: 12rpx;
}

.strategy_content_item {
  background-image: url('@/static/test/card_foot.png');
  height: 180rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.strategy_content_item > view:nth-of-type(1) {
  width: 184rpx;
  height: 132rpx;
  margin: -4rpx 24rpx 16rpx 24rpx;
  background-image: url('@/static/test/card_fot_l.png');
}

.strategy_content_item > view:nth-of-type(2) {
  width: calc(100% - 150rpx);
  text-align: left;
}

.strategy_content_item > view:nth-of-type(2) > view:nth-of-type(1) {
  color: rgba(245, 47, 24, 1);
  font-size: 28rpx;
  margin: -10rpx 0 8rpx 0;
}

.strategy_content_item > view:nth-of-type(2) > view:nth-of-type(2) {
  color: rgba(255, 94, 68, 1);
  font-size: 22rpx;
  margin: 4rpx 40rpx 0 0;
}

.foot_btn {
  height: 224rpx;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('@/static/test/card_font_bj.png');
  padding-top: 30rpx;
  position: relative;
}

.foot_btn_num {
  position: absolute;
  left: 120rpx;
  bottom: 140rpx;
  z-index: 9999;
  text-align: center;
  width: 40rpx;
  line-height: 40rpx;
  height: 40rpx;
  background-color: #ff5e44;
  border-radius: 50%;
  border: 4rpx solid #fdf1c3;
  color: #fff;
  font-size: 24rpx;
}

.foot_btn_btn {
  padding: 0;
  margin: 0 40rpx;
  width: 110rpx;
  height: 110rpx;
  line-height: 90rpx;
  color: rgba(255, 223, 169, 1);
  border: 4rpx solid RGBA(255, 239, 191, 1);
  font-weight: bold;
  border-radius: 28rpx;
  font-size: 30rpx;
  background: linear-gradient(rgba(224, 99, 101, 1), rgba(224, 99, 61, 1));
  box-shadow: inset 0rpx 0rpx 10rpx 4rpx rgba(171, 62, 30, 1), 0rpx 6rpx 8rpx -1rpx rgba(165, 82, 0, 0.4);

  &::after {
    padding: 0;
  }
}

.foot_btn_luck {
  width: calc(100% - 360rpx);
  color: #fff4cb;
  font-size: 40rpx;
  line-height: 130rpx;
  height: 140rpx;
  background-image: url('@/static/test/card_btn.png');
}

.popup_card {
  width: 442rpx;
  height: 648rpx;
  position: relative;
  background: linear-gradient(#f8e499, #eaae67);
  border-radius: 40rpx;
  z-index: 999;
}

.popup_fireworks {
  z-index: 998;
  width: 740rpx;
  height: 650rpx;
  position: absolute;
  left: -34%;
}

.popup_card_content {
  top: 20rpx;
  width: 442rpx;
  height: 648rpx;
  position: absolute;
  z-index: 999;
  border-radius: 40rpx;
  left: 50%;
  top: 50%;
  background: linear-gradient(#f8e499, #eaae67);
  transform: translate(-50%, -50%);
  -webkit-perspective: 1000;
  -moz-perspective: 1000;
}

.popup_card_just {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s;
  backface-visibility: hidden;
  cursor: pointer;
  border-radius: 40rpx;
  background: linear-gradient(#f8e499, #eaae67);
}

.popup_card_just_item {
  border-radius: 30rpx;
  width: 390rpx;
  height: 596rpx;
  border: 1rpx solid rgba(221, 138, 48, 0.6);
  margin: 24rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup_card_just_within {
  width: 240rpx;
  height: 240rpx;
  border: 1rpx solid rgba(221, 138, 48, 0.2);
  border-radius: 16rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  //margin-left: 74rpx;
  transform: rotate(45deg);
  //margin-top: 170rpx;
  background: RGBA(244, 214, 160, 1);

  view {
    border: 1rpx solid rgba(245, 184, 122, 0.4);
    width: 200rpx;
    height: 200rpx;
    border-radius: 16rpx;
  }
}

.popup_card_just_title {
  font-size: 80rpx;
  color: #d0793a;
  font-weight: bold;
  //width: 80rpx;
  text-align: center;
  position: absolute;
  //margin-top: -230rpx;
  //margin-left: 156rpx;
}

.popup_card_back {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s;
  backface-visibility: hidden;
  cursor: pointer;
  border-radius: 40rpx;
  transform: rotateY(-180deg);
  background: linear-gradient(#f8e499, #eaae67);
}

.popup_card_back_item {
  border-radius: 30rpx;
  width: 390rpx;
  height: 596rpx;
  color: #fedcb5;
  font-size: 34px;
  margin: 26rpx;
  border: 1rpx solid rgba(221, 138, 48, 0.6);
  background: RGBA(244, 215, 179, 1);
}

.popup_card_back_item_top {
  background-image: url('@/static/test/card_item_top.png');
  height: 78rpx;
  width: 240rpx;
  line-height: 70rpx;
  margin-left: 75rpx;
  display: flex;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  justify-items: center;
  text-align: center;
  justify-content: center;

  span {
    line-height: 100rpx;
    width: 10rpx;
    height: 10rpx;
    background-color: #fff;
    margin: 0 10rpx;
    margin-top: 34rpx;
    border-radius: 20rpx;
  }
}

.popup_card_back_item_image {
  width: 390rpx;
  height: 420rpx;
  position: absolute;
  bottom: 80rpx;
  text-align: center;

  image {
    width: 360rpx;
    height: 100%;
  }
}

.popup_close {
  display: flex;
  justify-content: center;
  margin-top: 60rpx;
  background: rgba(39, 39, 39, 0.7);
  height: 80rpx;
  width: 80rpx;
  border-radius: 50%;
  margin: auto;
  margin-top: 40rpx;
}

.popup_cashconter {
  width: 530rpx !important;
  height: 650rpx !important;
  position: relative;
}

.popup_cashimage {
  height: 650rpx;
  position: relative;

  image {
    width: 100%;
    height: 100%;
  }
}

.popup_cashprize {
  width: 530rpx !important;
  height: 650rpx !important;
  position: absolute;
  left: calc(50% - 265rpx);
  top: calc(50% - 325rpx);
}

.popup_text {
  width: 480rpx !important;
  height: 100rpx !important;
  line-height: 100rpx;
  position: absolute;
  left: calc(50% - 240rpx);
  top: calc(50% + 60rpx);
  font-size: 60rpx;
  font-weight: bold;
  text-align: center;
  background-image: linear-gradient(to top, rgba(255, 253, 243, 1), RGBA(255, 203, 236, 1)); !* 线性渐变背景，方向向上 *!
  -webkit-background-clip: text; !* 背景被裁剪成文字的前景色 *!
  -webkit-text-fill-color: transparent; !* 文字填充颜色变透明 *!
}

/deep/ .u-popup__content {
  background-color: transparent !important;
}
*/</style>
