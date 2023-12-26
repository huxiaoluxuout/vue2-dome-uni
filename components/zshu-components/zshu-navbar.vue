<template>
  <view class="zshu-navbar" :style="{'--navbar-height':zshuBavbarHeight+'px'}">
    <view class="zshu-navbar-wrap" :style="navbarStyle_">
      <view class="navbar-content__container">
        <view class="zshu-navbar-container" :style="zahuNavbarContainerStyle">
          <view class="zshu-navbar-container__left" v-if="configNavBar_.isTabBarPage">
            <slot name="left"></slot>
          </view>
          <view class="zshu-navbar-container__left" v-else>

            <template v-if="!showHomeIcon&&pageHierarchy>1">
              <slot name="left_back_icon">
                <u-icon name="arrow-left" :color="iconColor" size="22" @click="leftIconClick"></u-icon>
              </slot>
            </template>
            <template v-else-if="showHomeIcon||pageHierarchy===1">
              <slot name="left_back_icon">
                <u-icon name="home" :color="iconColor" size="22" @click="leftIconClick"></u-icon>
              </slot>
            </template>

          </view>
          <view class="zshu-navbar-container__center">
            <view class="zshu-navbar-content-title">
              <slot name="center">
                <view class="title">{{ configNavBar_.title }}</view>
              </slot>
            </view>
          </view>
          <view class="zshu-navbar-container__right" v-if="configNavBar_.right">
            <slot name="right">
              rrrrrr
            </slot>
          </view>
        </view>
      </view>
    </view>
    <view class="temp-view" :style="zshuNavbarTempViewStyle"></view>
  </view>
</template>
<script>
import pagesConfig from "@/pages.json";
import {filterPath, navigateTo} from "@/utils/tools";
import {objectToString} from "@/components/zshu-components/JS/utils";

const {tabBar: {list: tabBarPages}} = pagesConfig

export default {
  props: {
    configNavBar: {
      type: Object,
      default: () => {
        return {}
      }
    },
    navbarStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    title: {
      type: String,
      default: '',
    },
    backgroundImage: {
      type: String,
      default: ''
    },
    /*updateNavbarHeight: {
      type: Function,
      default: ()=>{}
    },*/
    // 用于显示跳转到首页的icon
    showHomeIcon: Boolean
  },
  data() {
    return {
      menuButtonWidth: 0,
      menuButtonTop: 10,
      menuButtonHeight: 24,
      menuButtonRight: 0,
      statusBarHeight: 0,
      pageHierarchy: 1,
      zshuBavbarHeight: 44,

      bgColor: 'rgba(243,243,243,1)',
      // bgColor: '#007aff33',

      currentPagePath: '',
    }
  },

  computed: {
    configNavBar_() {

      const isTabBarPage = tabBarPages.map(item => filterPath(item.pagePath)).includes(filterPath(this.currentPagePath));

      return Object.assign({
        title: this.title,//标题名称
        isTabBarPage: isTabBarPage,
        right: false,
      }, this.configNavBar);
    },

    zahuNavbarContainerStyle() {
      this.zshuBavbarHeight = (this.menuButtonHeight + this.menuButtonTop + this.statusBarHeight + 12)
      this.$emit('updateNavbarHeight', this.zshuBavbarHeight)

      return objectToString({
        // height: this.zshuBavbarHeight + 'px',
        position: 'absolute',
        top: `${this.menuButtonTop + this.menuButtonHeight / 2}px`,
        transform: 'translateY(-50%)',
        'margin-right': `calc(${this.menuButtonWidth}px + ${this.menuButtonRight}px)`,

      })
    },


    zshuNavbarTempViewStyle() {
      this.zshuBavbarHeight = (this.menuButtonHeight + this.menuButtonTop + this.statusBarHeight + 12)
      this.$emit('updateNavbarHeight', this.zshuBavbarHeight)
      return objectToString({
        height: this.zshuBavbarHeight + 'px',
      })

    },


    navbarStyle_() {

      return objectToString({
        background: this.bgColor,
        height: `${this.zshuBavbarHeight}px`,

        // 'padding-top': `${this.menuButtonHeight / 2}px`,

        // 'background-position': this.top,
        // 'background-size': 'cover',
        ...this.navbarStyle
      })
    },


    iconColor() {
      return this.calculateIconColor(this.navbarStyle)
    },


  },
  mounted() {
    const pages = getCurrentPages();
    this.currentPagePath = pages[pages.length - 1]['route'];
    this.pageHierarchy = pages.length;
    // #ifdef MP-WEIXIN || MP-ALIPAY
    const menuButtonInfoALI = uni.getMenuButtonBoundingClientRect();
    // console.log('menuButtonInfoALI',menuButtonInfoALI)
    this.menuButtonTop = Math.ceil(menuButtonInfoALI.top);
    this.menuButtonHeight = Math.ceil(menuButtonInfoALI.height);
    this.menuButtonWidth = Math.ceil(menuButtonInfoALI.width);
    this.menuButtonRight = 15;

    // #endif
    // #ifdef APP-PLUS
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
    // #endif
  },


  methods: {
    calculateIconColor(navbarStyle) {
      const cssKeyValuePairs = [
        {key: 'background', keyword: /linear-gradient|url/},
        {key: 'backgroundImage', keyword: /url/},
        {key: 'backgroundColor', keyword: /#fff/},
        // 添加更多的属性和匹配关键字对

      ];

      for (const {key, keyword} of cssKeyValuePairs) {

        if (key in navbarStyle) {
          const cssValue = navbarStyle[key];
          // console.log(key, cssValue)

          if (keyword.test(cssValue)) {
            return '#313131';
          }
        }
      }

      return '#999';
    },

    leftIconClick() {
      try {
        if (this.pageHierarchy.value > 1) {
          uni.navigateBack({delta: 1});
        } else {
          const ROUTE_HOME = '/pages/tabbar1/tabbar1';

          navigateTo(ROUTE_HOME);
        }
      } catch (error) {
        console.error('Error while handling leftIconClick:', error);
      }
    },


    // 页面上下滚动
    handlePageScroll(e) {
      this.bgColor = `rgba(255,255,255,${Math.ceil(e.scrollTop / this.zshuBavbarHeight)})`

      console.log('this.bgColor', this.bgColor)
    }

  },


}

</script>

<style scoped lang="scss">
.zshu-navbar {
  box-sizing: border-box;
}

.zshu-navbar-wrap {
  position: fixed;
  top: var(--window-top);
  left: 0;
  right: 0;
  box-sizing: border-box;
  z-index: 9999;
  display: flex;
  align-items: center;
  border-bottom:  1px solid #f3f3f3;


}

.temp-view {
  width: 100%;
}

.navbar-content__container {
  position: relative;
  width: 100%;
  height: 100%;
}


.zshu-navbar-container {
  box-sizing: border-box;
  word-break: break-all;
  display: flex;
  align-items: center;
  justify-content: space-between;
  left: 0;
  right: 0;

}

.zshu-navbar-container__left:not(:empty) {
  min-width: 1em;
  border-radius: 50%;
  box-sizing: border-box;

}


.zshu-navbar-container__center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.zshu-navbar-container__right {
  min-width: 1em;
  display: flex;
  justify-content: flex-end;
}

.zshu-navbar-content-title {
  font-size: 16px;
  color: #303030;
  display: flex;
  align-items: center;
  flex: 1;
  //justify-content: center;

}

.title {
  color: #333333;
  overflow: hidden;
  word-break: break-all;
  /* break-all(允许在单词内换行。) */
  text-overflow: ellipsis;
  /* 超出部分省略号 */
  display: -webkit-box;
  /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical;
  /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 1;
  /** 显示的行数 **/

}


</style>
