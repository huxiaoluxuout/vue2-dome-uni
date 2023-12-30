<template>
  <view class="zshu-navbar" :style="{'--navbar-height':navbarHeight+'px'}">
    <view class="zshu-navbar-wrap" :style="navbarStyle_">
      <view class="navbar-content__container">
        <view class="zshu-navbar-container" :style="zahuNavbarContainerStyle">
          <view v-if="configNavBar_.isTabBarPage" class="zshu-navbar-container__left">
            <slot name="left"></slot>
          </view>
          <view v-else class="zshu-navbar-container__left" @click="leftIconClick">
            <slot name="left_back_icon">
              <u-icon :name="defaultLeftIconName" :color="iconColor" :size="iconSize"></u-icon>
            </slot>
          </view>
          <view class="zshu-navbar-container__center">
            <view class="zshu-navbar-content-title">
              <template v-if="configNavBar_.title">
                <view class="title">{{ configNavBar_.title }}</view>
              </template>
              <template v-else>
                <view style="display:flex;justify-content:center;width: 100%;">
                  <view style="height: 100%;width: calc(100% - 1em);display:flex;justify-content: center;">
                    <slot name="center"></slot>
                  </view>
                </view>
              </template>

            </view>
          </view>
          <view class="zshu-navbar-container__right">
            <slot name="right"></slot>
          </view>
        </view>
      </view>
    </view>
    <view style="width: 100%;" :style="{height:navbarHeight + 'px'}"></view>
  </view>
</template>
<script>
import pagesConfig from "@/pages.json";
import {filterPath, navigateTo} from "@/utils/tools";
import {objectToString} from "@/components/zshu-components/JS/utils";

const {tabBar: {list: tabBarPages}} = pagesConfig
let menuButtonInfoALI = null, systemInfo = null;

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
    iconSize: {
      type: [String, Number],
      default: '22'
    },

    // 用于显示跳转到首页的icon
    showHomeIcon: Boolean
  },
  data() {
    return {
      menuButtonWidth: 0,
      menuButtonTop: 34, //内容高度
      bottomGap: 10,//标题到底部之间的距离
      menuButtonHeight: 0,
      menuButtonRight: 0,
      statusBarHeight: 0,
      pageHierarchy: 1,

      bgColor: 'rgba(243,243,243,1)',
      // bgColor: '#007aff33',

      currentPagePath: '',
    }
  },

  computed: {

    defaultLeftIconName() {
      if (!this.showHomeIcon && this.pageHierarchy > 1) {
        return 'arrow-left'
      } else if (this.showHomeIcon || this.pageHierarchy === 1) {
        return 'home'
      }
    },

    //navbar总高 44
    navbarHeight() {
      // 10 标题到底部之间的距离
      let navbarHeight = this.bottomGap + this.menuButtonTop + this.statusBarHeight + this.menuButtonHeight
      this.$emit('updateNavbarHeight', navbarHeight)
      return navbarHeight
    },

    configNavBar_() {

      const isTabBarPage = tabBarPages.map(item => filterPath(item.pagePath)).includes(filterPath(this.currentPagePath));

      return Object.assign({
        title: this.title,//标题名称
        isTabBarPage: isTabBarPage,
        right: false,
      }, this.configNavBar);
    },


    defaultContentTop() {
      let top = `${this.statusBarHeight}px`
      // #ifdef MP-WEIXIN || MP-ALIPAY
      top = `${this.menuButtonTop + this.menuButtonHeight / 2}px`
      // #endif

      // #ifdef APP-PLUS
      top = `calc(${50}% + ${this.statusBarHeight / 2}px)`
      // #endif

      // #ifdef H5
      top = `${50}%`
      // #endif
      return top
    },

    zahuNavbarContainerStyle() {
      return objectToString({

        position: 'absolute',
        top: this.defaultContentTop,
        transform: 'translateY(-50%)',
        'margin-right': `calc(${this.menuButtonWidth}px + ${this.menuButtonRight}px)`,

      })
    },


    navbarStyle_() {
      return objectToString({

        background: this.bgColor,
        height: `${this.navbarHeight}px`,
        ...this.navbarStyle
      })
    },


    iconColor() {
      return this.calculateIconColor(this.navbarStyle)
    },


  },
  beforeCreate() {

    // #ifdef MP-WEIXIN || MP-ALIPAY
    menuButtonInfoALI = uni.getMenuButtonBoundingClientRect();
    // #endif

    // #ifdef APP-PLUS
    systemInfo = uni.getSystemInfoSync();
    // #endif

  },
  mounted() {
    const pages = getCurrentPages();
    this.currentPagePath = pages[pages.length - 1]['route'];
    this.pageHierarchy = pages.length;
    // #ifdef MP-WEIXIN || MP-ALIPAY
    this.menuButtonTop = Math.ceil(menuButtonInfoALI.top);
    this.menuButtonHeight = Math.ceil(menuButtonInfoALI.height);
    this.menuButtonWidth = Math.ceil(menuButtonInfoALI.width);
    this.menuButtonRight = 15;
    // #endif

    // #ifdef APP-PLUS

    this.statusBarHeight = systemInfo.statusBarHeight;
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
          // 首页
          const indexPagePath = pagesConfig.pages[0].path
          navigateTo(indexPagePath);
        }
      } catch (error) {
        console.error('Error while handling leftIconClick:', error);
      }
    },

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
  border-bottom: 1px solid #f3f3f3;

}


.navbar-content__container {
  position: relative;
  width: 100%;
  height: 100%;
  /* 两端距离 */
  margin-left: 5px;
  margin-right: 15px;
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
  font-size: 22px;
}

.zshu-navbar-content-title {
  font-size: 16px;
  color: #303030;
  display: flex;
  align-items: center;
  flex: 1;


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
