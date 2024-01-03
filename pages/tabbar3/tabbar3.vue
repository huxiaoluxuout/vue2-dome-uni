<template>
  <view>
    <zshu-navbar title="我的" bg-color="blue" color="#fff"
                 :navbar-style="{background:`url(https://s11.ax1x.com/2023/09/12/pPg4o7R.jpg)`}"
                 @navbarHeight="(e)=>navbarHeight=e"
    ></zshu-navbar>

    <zshu-tabs is-custom :top="navbarHeight" :activeId="activeId" @updateActiveId="(id)=>{activeId = id}"
               :list-tabs="listTabs"></zshu-tabs>

    <div>
      00000Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem eos error explicabo illo maxime non vero.
      Asperiores beatae, cum dignissimos dolore error harum odio odit qui repudiandae sunt. Consequatur, enim.
    </div>
    <div>Amet aperiam autem, deleniti deserunt dignissimos dolores dolorum eius hic iste laboriosam laborum, laudantium
      magnam magni maxime minima, modi nam pariatur porro quaerat recusandae similique suscipit ullam voluptate
      voluptatem voluptates.
    </div>
    <div>Adipisci corporis deserunt, dolor ducimus, ea error est expedita harum hic id impedit in ipsa iure maxime
      molestias nobis officia qui quo similique tempore temporibus veritatis voluptas voluptate voluptatem voluptatibus?
    </div>
    <div>Accusantium amet atque consequuntur dolore dolorum hic laborum molestiae, optio perferendis possimus quis
      repellat reprehenderit saepe similique temporibus ullam, ut. Amet at atque, dolor doloribus natus neque nihil
      obcaecati rerum!
    </div>
    <div>At eos ex reiciendis! Alias eveniet expedita harum labore neque, quaerat quas voluptatem. Commodi consequuntur,
      dolor doloremque explicabo fuga fugiat labore nesciunt nisi nostrum possimus praesentium, quam qui quia
      temporibus.
    </div>
    <div>Ab cumque cupiditate debitis dolorem, dolores ea explicabo fugit, itaque laborum maiores, mollitia quaerat quam
      repellendus totam ullam velit voluptatibus. Architecto at consequuntur culpa eaque labore laborum natus quam
      ratione?
    </div>
    <div>Architecto, cumque dolorum, eligendi error fugit, inventore labore natus neque nisi numquam optio porro sit.
      Deserunt eaque earum inventore laboriosam magni minima minus molestias nisi praesentium quas, qui totam voluptas!
    </div>
    <div>A autem commodi cupiditate dignissimos dolore eius eum exercitationem facilis fugit id illum minus
      necessitatibus nemo quam quas recusandae rem sapiente, tenetur. At commodi deserunt enim itaque magni reiciendis
      vitae?
    </div>
    <div>A aliquid asperiores cupiditate et, illum impedit iure libero magnam magni maiores modi neque, nihil obcaecati
      officiis pariatur perferendis placeat quibusdam sequi sunt tenetur. Adipisci impedit perferendis quam vel
      voluptatem!
    </div>
    <div>Accusantium atque aut beatae consequatur corporis deleniti distinctio dolore dolorem eius, eum eveniet
      excepturi fugit illo nemo nisi quibusdam ratione recusandae rerum sapiente sequi sint sit soluta temporibus ullam
      voluptatem.
    </div>
    zzzzz
    <tabbar :INDEX="2"></tabbar>

  </view>
</template>

<script>
import {getMineOrderList} from "@/network/apis/test_api";
import mixinsNextPageManager from "@/mixins/mixinsNextPageManager";
import mixinsPullDownRefresh from "@/mixins/mixinsPullDownRefresh";

import YlxSlider from "@/components/ylx-components/ylx-slider.vue";
import ZshuTabs from "@/components/zshu-components/zshu-tabs.vue";

import ZshuNavbar from "@/components/zshu-components/zshu-navbar.vue";


export default {
  components: {ZshuNavbar, ZshuTabs, YlxSlider},
  mixins: [mixinsNextPageManager, mixinsPullDownRefresh],
  data() {
    return {

      viewDataList: [],

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

      isLoading: true,
      navbarHeight: 60
    }
  },

  onLoad() {
    this.getMineOrderListApi()
    this.ylxNextPageManager.setEmitFunctions(this.getMineOrderListApi)
    this.ylxNextPageManager.reloadCallback(this.ylxReloadCallback)
    this.ylxPullDownRefresh.setEmitFunctions(this.ylxNextPageManager.reload)

  },
  onShow() {
    console.log('tabbar 3')
  },
  methods: {
    ylxOnShow() {
      console.log('tabbar 3 ylxOnShow')
    },


    ylxReloadCallback() {

      this.viewDataList = []
      this.getMineOrderListApi()
    },

    getMineOrderListApi() {
      this.isLoading = true
      getMineOrderList({
        page: this.ylxNextPageManager.getPage(),
        page_size: this.ylxNextPageManager.getPageSize(),
        status: 5
      }).then(res => {

        this.viewDataList = this.ylxNextPageManager.setDataList(res.data.data)

        this.isLoading = false

      })
    },

  },

}
</script>

<style scoped>

</style>
