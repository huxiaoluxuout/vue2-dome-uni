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

      getMineOrderList({
        page: this.ylxNextPageManager.getPage(),
        page_size: this.ylxNextPageManager.getPageSize(),
        status: this.currentIndex
      }).then(res => {
        let arr = [
          {
            "id": 208,
            "order_sn": "24010504160520141316",
            "fault": "冒烟了",
            "device_type": "洗烘一体机",
            "service_type": "维修",
            "offer": "780-1000",
            "special_needs": "",
            "order_status": 50,
            "name": "凌风",
            "phone": "****9999",
            "lng": "117.287332",
            "lat": "31.848873",
            "province_id": 26,
            "province_name": "安徽省",
            "city_id": 279,
            "city_name": "合肥市",
            "county_id": 2241,
            "county_name": "包河区",
            "street_id": 27948,
            "street_name": "包公街道",
            "address": "包河区 包公街",
            "visit_time_start": 1704416400,
            "visit_time_end": 1704427200,
            "category_id": 1,
            "category_name": "洗衣机",
            "brand_id": 1,
            "brand_name": "海尔",
            "refund_status": 0,
            "is_pay": 0,
            "take_time": 1704442675,
            "apply_transfer": 0,
            "total_money": "479.00",
            "visit_apply": 0,
            "wait_time": 0,
            "is_finish": 1,
            "is_cancel": 0,
            "status": 40,
            "is_del": 0,
            "btn": {
              "refund_btn": false,
              "contact_btn": false,
              "start_service": false,
              "end_service": false,
              "await": false,
              "logistics": false,
              "again_service": false,
              "del_order": false,
              "payee_code": true,
              "change_visit_time": false,
              "cancel_btn": false
            },
            "order_status_text": "服务结束",
            "visit_time": "01月05日 09:00-12:00",
            "take_time_text": "2024-01-05 16:17:55",
            "distance": "10.06km"
          },
          {
            "id": 184,
            "order_sn": "24010409441920104678",
            "fault": "洗衣机报E1错误不能正常使用",
            "device_type": "洗烘一体机",
            "service_type": "维修",
            "offer": "200",
            "special_needs": "",
            "order_status": 120,
            "name": "刘女士",
            "phone": "****8096",
            "lng": "117.229380",
            "lat": "31.772592",
            "province_id": 26,
            "province_name": "安徽省",
            "city_id": 279,
            "city_name": "合肥市",
            "county_id": 2240,
            "county_name": "蜀山区",
            "street_id": 27930,
            "street_name": "莲花社区",
            "address": "尚泽大都会",
            "visit_time_start": 1704308520,
            "visit_time_end": 1704362400,
            "category_id": 1,
            "category_name": "洗衣机",
            "brand_id": 1,
            "brand_name": "海尔",
            "refund_status": 20,
            "is_pay": 0,
            "take_time": 1704337016,
            "apply_transfer": 2,
            "total_money": "0.00",
            "visit_apply": 1,
            "wait_time": 0,
            "is_finish": 1,
            "is_cancel": 0,
            "status": 120,
            "is_del": 0,
            "btn": {
              "refund_btn": false,
              "contact_btn": false,
              "start_service": false,
              "end_service": false,
              "await": false,
              "logistics": false,
              "again_service": false,
              "del_order": true,
              "payee_code": false,
              "change_visit_time": false,
              "cancel_btn": false
            },
            "order_status_text": "订单取消",
            "visit_time": "01月04日 03:02-18:00 审核中",
            "take_time_text": "2024-01-04 10:56:56",
            "distance": "150m"
          },
          {
            "id": 177,
            "order_sn": "24010203134521194362",
            "fault": "漏水",
            "device_type": "",
            "service_type": "维修",
            "offer": "120-200",
            "special_needs": "没有特殊需求",
            "order_status": 50,
            "name": "李四",
            "phone": "****2222",
            "lng": "117.290823",
            "lat": "31.855689",
            "province_id": 26,
            "province_name": "安徽省",
            "city_id": 279,
            "city_name": "合肥市",
            "county_id": 2241,
            "county_name": "包河区",
            "street_id": 27948,
            "street_name": "包公街道",
            "address": "包公祠",
            "visit_time_start": 1704150000,
            "visit_time_end": 1704196800,
            "category_id": 1,
            "category_name": "洗衣机",
            "brand_id": 8,
            "brand_name": "奥克斯",
            "refund_status": 0,
            "is_pay": 1,
            "take_time": 1704179636,
            "apply_transfer": 0,
            "total_money": "195.00",
            "visit_apply": 0,
            "wait_time": 0,
            "is_finish": 1,
            "is_cancel": 0,
            "status": 40,
            "is_del": 0,
            "btn": {
              "refund_btn": false,
              "contact_btn": false,
              "start_service": false,
              "end_service": false,
              "await": false,
              "logistics": false,
              "again_service": false,
              "del_order": true,
              "payee_code": false,
              "change_visit_time": false,
              "cancel_btn": false
            },
            "order_status_text": "已完成付款",
            "visit_time": "01月02日 07:00-20:00",
            "take_time_text": "2024-01-02 15:13:56",
            "distance": "10.88km"
          },
          {
            "id": 154,
            "order_sn": "23122702412321170315",
            "fault": "坏的",
            "device_type": "",
            "service_type": "十大",
            "offer": "500",
            "special_needs": "钱钱钱",
            "order_status": 120,
            "name": "哈哈哈",
            "phone": "****8888",
            "lng": "117.219168",
            "lat": "31.795847",
            "province_id": 26,
            "province_name": "安徽省",
            "city_id": 279,
            "city_name": "合肥市",
            "county_id": 2240,
            "county_name": "蜀山区",
            "street_id": 27925,
            "street_name": "笔架山街道",
            "address": "笔架山街道匡河路宋都·西湖花苑风荷苑",
            "visit_time_start": 1703725200,
            "visit_time_end": 1703728800,
            "category_id": 1,
            "category_name": "洗衣机",
            "brand_id": 8,
            "brand_name": "奥克斯",
            "refund_status": 20,
            "is_pay": 0,
            "take_time": 1703727376,
            "apply_transfer": 2,
            "total_money": "0.00",
            "visit_apply": 0,
            "wait_time": 0,
            "is_finish": 1,
            "is_cancel": 0,
            "status": 120,
            "is_del": 0,
            "btn": {
              "refund_btn": false,
              "contact_btn": false,
              "start_service": false,
              "end_service": false,
              "await": false,
              "logistics": false,
              "again_service": false,
              "del_order": true,
              "payee_code": false,
              "change_visit_time": false,
              "cancel_btn": false
            },
            "order_status_text": "订单取消",
            "visit_time": "12月28日 09:00-10:00",
            "take_time_text": "2023-12-28 09:36:16",
            "distance": "2.85km"
          },
          {
            "id": 161,
            "order_sn": "23122809122121194821",
            "fault": "空调脏了",
            "device_type": "",
            "service_type": "清洗",
            "offer": "100-200",
            "special_needs": "",
            "order_status": 50,
            "name": "李四",
            "phone": "****8888",
            "lng": "117.291303",
            "lat": "31.837902",
            "province_id": 26,
            "province_name": "安徽省",
            "city_id": 279,
            "city_name": "合肥市",
            "county_id": 2241,
            "county_name": "包河区",
            "street_id": 27948,
            "street_name": "包公街道",
            "address": "包公街道办事处",
            "visit_time_start": 1703714400,
            "visit_time_end": 1703732400,
            "category_id": 2,
            "category_name": "空调",
            "brand_id": 8,
            "brand_name": "奥克斯",
            "refund_status": 0,
            "is_pay": 1,
            "take_time": 1703726418,
            "apply_transfer": 0,
            "total_money": "430.00",
            "visit_apply": 0,
            "wait_time": 1703726780,
            "is_finish": 1,
            "is_cancel": 0,
            "status": 40,
            "is_del": 0,
            "btn": {
              "refund_btn": false,
              "contact_btn": false,
              "start_service": false,
              "end_service": false,
              "await": false,
              "logistics": false,
              "again_service": false,
              "del_order": true,
              "payee_code": false,
              "change_visit_time": false,
              "cancel_btn": false
            },
            "order_status_text": "已完成付款",
            "visit_time": "12月28日 06:00-11:00",
            "take_time_text": "2023-12-28 09:20:18",
            "distance": "9.28km"
          },
          {
            "id": 160,
            "order_sn": "23122809081420160920",
            "fault": "故障描述故障描述故障描述",
            "device_type": "信息",
            "service_type": "维修",
            "offer": "100",
            "special_needs": "",
            "order_status": 50,
            "name": "凌风",
            "phone": "****9999",
            "lng": "117.287332",
            "lat": "31.848873",
            "province_id": 26,
            "province_name": "安徽省",
            "city_id": 279,
            "city_name": "合肥市",
            "county_id": 2241,
            "county_name": "包河区",
            "street_id": 27948,
            "street_name": "包公街道",
            "address": "包河区 包公街",
            "visit_time_start": 1703736000,
            "visit_time_end": 1703775600,
            "category_id": 2,
            "category_name": "空调",
            "brand_id": 16,
            "brand_name": "百甲",
            "refund_status": 0,
            "is_pay": 1,
            "take_time": 1703729050,
            "apply_transfer": 2,
            "total_money": "100.00",
            "visit_apply": 2,
            "wait_time": 0,
            "is_finish": 1,
            "is_cancel": 0,
            "status": 40,
            "is_del": 0,
            "btn": {
              "refund_btn": false,
              "contact_btn": false,
              "start_service": false,
              "end_service": false,
              "await": false,
              "logistics": false,
              "again_service": false,
              "del_order": true,
              "payee_code": false,
              "change_visit_time": false,
              "cancel_btn": false
            },
            "order_status_text": "已完成付款",
            "visit_time": "12月28日 12:00-23:00",
            "take_time_text": "2023-12-28 10:04:10",
            "distance": "10.06km"
          },
          {
            "id": 155,
            "order_sn": "23122703094520159652",
            "fault": "故障描述",
            "device_type": "洗烘一体机",
            "service_type": "维修",
            "offer": "120",
            "special_needs": "无",
            "order_status": 50,
            "name": "凌风",
            "phone": "****9999",
            "lng": "117.287332",
            "lat": "31.848873",
            "province_id": 26,
            "province_name": "安徽省",
            "city_id": 279,
            "city_name": "合肥市",
            "county_id": 2241,
            "county_name": "包河区",
            "street_id": 27948,
            "street_name": "包公街道",
            "address": "包河区 包公街",
            "visit_time_start": 1703638800,
            "visit_time_end": 1703649600,
            "category_id": 1,
            "category_name": "洗衣机",
            "brand_id": 16,
            "brand_name": "百甲",
            "refund_status": 0,
            "is_pay": 1,
            "take_time": 1703661001,
            "apply_transfer": 0,
            "total_money": "260.00",
            "visit_apply": 0,
            "wait_time": 1703663488,
            "is_finish": 1,
            "is_cancel": 0,
            "status": 40,
            "is_del": 0,
            "btn": {
              "refund_btn": false,
              "contact_btn": false,
              "start_service": false,
              "end_service": false,
              "await": false,
              "logistics": false,
              "again_service": false,
              "del_order": true,
              "payee_code": false,
              "change_visit_time": false,
              "cancel_btn": false
            },
            "order_status_text": "已完成付款",
            "visit_time": "12月27日 09:00-12:00",
            "take_time_text": "2023-12-27 15:10:01",
            "distance": "10.06km"
          }
        ]
        // this.originList = this.ylxNextPageManager.setDataList(res.data.data)
        let originList = [...arr, ...res.data.data]
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
