<template>
  <view>
    <zshu-navbar title="我的" bg-color="blue" color="#fff"
                 :navbar-style="{background:`url(https://s11.ax1x.com/2023/09/12/pPg4o7R.jpg)`}"
                 @navbarHeight="(e)=>navbarHeight=e"
    ></zshu-navbar>

    <zshu-tabs is-custom :top="navbarHeight" :activeId="activeId" @updateActiveId="(id)=>{activeId = id}"
               :list-tabs="listTabs"></zshu-tabs>

    <ylx-slider ref="refYlxSlider" :other-height="navbarHeight + 45" :dataList="viewDataList"
                :current-index="currentIndex"
                @updateCurrent="index=>currentIndex=index"
                @scrollReachBottom="scrollReachBottom"
                @startPull="startPull"
                :set-function="getMineOrderListApi"
                :isEmpty="isEmpty" :isLoading="isLoading"

    >
      <template v-slot:default="{item}">
        00000
        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur minus quibusdam quis reprehenderit!
          Aliquam consequatur dolore dolorem ea iure laboriosam, maxime mollitia nesciunt nobis nulla quaerat, quas
          repellendus ullam voluptatibus?
        </div>
        <div>Consectetur dolorum illum laborum nesciunt nostrum nulla pariatur quae, quas quasi, rerum saepe tempora.
          Cumque error harum, incidunt laboriosam odio rerum sequi. Asperiores assumenda modi mollitia nemo nisi odio
          officia.
        </div>
        <div>Accusantium amet atque autem consequatur dolor dolore dolores et eum ex facilis illo ipsum, itaque
          laudantium maiores minima mollitia nemo obcaecati perferendis possimus rem reprehenderit, rerum similique sit
          veritatis voluptatum.
        </div>
        <div>A accusantium atque blanditiis cumque deserunt et id illo impedit itaque magni minus mollitia
          necessitatibus neque non officia omnis perspiciatis placeat qui quibusdam quidem repellendus, similique
          tempora tenetur voluptatem voluptates.
        </div>
        <div>Asperiores dolores facere hic obcaecati pariatur quo rem voluptatum? Dolore eligendi fugiat incidunt
          nesciunt nihil porro quibusdam. Accusamus, accusantium animi beatae esse fugiat ipsa neque nulla quia
          repellendus? Blanditiis, ullam?
        </div>
        <div>Ad adipisci atque consectetur cum dolore dolores, doloribus ea earum eius esse ex hic impedit inventore
          laboriosam laborum magnam magni minima molestiae nemo officiis, possimus quae quis repudiandae sed vero?
        </div>
        <div>Alias aliquid consectetur, corporis culpa cumque distinctio dolorum ea eveniet expedita explicabo fuga
          fugiat harum, id labore laborum, libero odio officiis praesentium quia quisquam quos reiciendis rerum sint
          tenetur voluptatem!
        </div>
        <div>Alias aperiam aspernatur assumenda commodi consequatur culpa cum ducimus et expedita facilis illo impedit
          laborum libero modi nam optio perferendis, possimus praesentium quaerat repellat reprehenderit rerum sunt
          temporibus, vero voluptates?
        </div>
        <div>Aspernatur consequuntur eligendi exercitationem fuga fugiat labore quis reprehenderit unde? Amet, assumenda
          debitis eos in, iusto labore libero maxime necessitatibus nisi obcaecati quae quia sint vitae? Eius excepturi
          nihil quaerat.
        </div>
        <div>Alias dolorum sunt ut veritatis voluptatem! Alias beatae cupiditate ea eius facere, illum laboriosam odio
          placeat praesentium quaerat quasi quia quis repellat sequi sint suscipit, totam, vero vitae voluptates
          voluptatum!
        </div>
        <div>Aliquam asperiores aut commodi dolorem doloremque illo modi nobis quod rem ut! Est officia provident, quam
          quasi quo rem repellat. Amet esse excepturi facere id illum impedit nobis perspiciatis recusandae.
        </div>
        <div>At dolorem ex quo! Aliquam, amet dicta odit quisquam quos sint suscipit. Ad, aliquam autem consequatur eos
          fugit, iste labore laboriosam laborum molestias, nihil omnis saepe vero voluptatibus. Quaerat, voluptate.
        </div>
        zzzzzz

      </template>
    </ylx-slider>


    <tabbar :INDEX="2"></tabbar>
  </view>
</template>

<script>
import {getMineOrderList} from "@/network/apis/test_api";
import mixinsNextPageManager from "@/mixins/mixinsNextPageManager";
import mixinsPullDownRefresh from "@/mixins/mixinsPullDownRefresh";

import ZshuTabs from "@/components/zshu-components/zshu-tabs.vue";

import ZshuNavbar from "@/components/zshu-components/zshu-navbar.vue";
import YlxSlider from "@/components/ylx-components/ylx-slider.vue";


export default {
  components: {YlxSlider, ZshuNavbar, ZshuTabs},
  mixins: [mixinsNextPageManager, mixinsPullDownRefresh],
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


      navbarHeight: 60,
      viewDataList: [null, null, null],
      originList: [],
      isEmpty: false,
      isLoading: true,

    }
  },
  computed: {
    // 计算 index 基于 activeId
    currentIndex: {
      get() {
        return this.listTabs.findIndex(item => item.id === this.activeId);
      },
      set(value) {
        this.activeId = this.listTabs[value].id;
      }
    },
    // 使用计算属性来寻找当前激活的索引
    currentTabIndex() {
      return this.listTabs.findIndex(item => item.id === this.activeId);
    }
  },
  watch: {
    // 监控 activeId 的变化
    activeId(newId, oldId) {
      // 仅当activeId发生变化并且newId不等于oldId时才执行更新
      if (newId !== oldId) {
        let index = this.currentTabIndex; // 使用计算属性获取当前索引

        // 检查这个索引的数据是否已经加载
        if (!this.viewDataList[index]) {
          // 仅当需要时才更新
          this.viewDataList[index] = this.originList[index];
        }
      }
    }
  },
  onReachBottom() {
    console.log('444444')
  },

  onLoad() {
    const eventName = '/pages/tabbar3/tabbar3'


    uni.$on(eventName, (handler) => {
      handler((callbackPrams) => {
        console.log('$on-tabbar3', callbackPrams)
      })
    })
    uni.$emit('GlobEvent' + eventName)


    /*this.getMineOrderListApi()
    this.ylxNextPageManager.setEmitFunctions(this.getMineOrderListApi)
    this.ylxNextPageManager.reloadCallback(this.ylxReloadCallback)
    this.ylxPullDownRefresh.setEmitFunctions(this.ylxNextPageManager.reload)*/

  },

  methods: {
    ylxReloadCallback() {
      this.viewDataList = [null, null, null]
      this.getMineOrderListApi()
    },
    scrollReachBottom() {
      console.log('1111-0scrollReachBottom')
    },
    startPull(callback) {
      this.$set(this.viewDataList, this.currentIndex, null)

      callback && callback()
    },

    getMineOrderListApi() {
      this.isLoading = true

      setTimeout(()=>{
        this.isLoading = false

      },200)

    },
    feachVideo() {
      getMineOrderList({
        page: this.ylxNextPageManager.getPage(),
        page_size: this.ylxNextPageManager.getPageSize(),
        status: this.currentIndex
      }).then(res => {

        // this.originList = this.ylxNextPageManager.setDataList(res.data.data)
        let originList = res.data.data
        this.originList = originList
        this.viewDataList = originList
        // this.$set(this.viewDataList, this.currentIndex, originList)

        // this.isEmpty = !originList[this.currentIndex]
        // this.isLoading = false
        this.$refs.refYlxSlider.closeCircle()

      })
    },

  },

}
</script>

<style scoped>

</style>
