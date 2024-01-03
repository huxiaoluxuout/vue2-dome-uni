<template>
  <view>


    <zshu-tabs :view-height="44" :activeId="activeId" @updateActiveId="(id)=>{activeId = id}"
               :list-tabs="listTabs"></zshu-tabs>
    <button @click="ylxNavigateTo('pages/A1/A1?aa=66',{})"> 页面1</button>

    000
    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid architecto ducimus enim exercitationem
      necessitatibus nostrum odio omnis quidem quis repellat, reprehenderit rerum voluptatem? Accusamus aspernatur
      consectetur cupiditate doloremque, eum veritatis.
    </div>
    <div>Consequatur nostrum placeat voluptates! Aliquam architecto corporis cumque deleniti iste nam non optio vitae
      voluptate! Consequuntur, cum, cumque doloremque error exercitationem in, magni maxime modi officia quisquam
      repellendus rerum vitae!
    </div>
    <div>Accusantium alias aperiam cum dicta doloribus dolorum harum magnam nihil non omnis, quaerat sunt ullam! Impedit
      incidunt iste iusto natus. Dignissimos dolorem esse excepturi iusto laborum necessitatibus nisi quaerat quia!
    </div>
    <div>Ad aliquam neque ullam? Animi dolor, dolore dolores eaque eum, libero maiores maxime molestias numquam odio
      perspiciatis provident quae quam quas reiciendis repudiandae temporibus veritatis voluptatibus. Necessitatibus
      officiis porro voluptates.
    </div>
    <div>Alias aperiam cum dolorum facilis placeat suscipit. Atque blanditiis consequuntur dolor ducimus error optio
      possimus sit veniam vero voluptatum? Ad, cumque impedit inventore minus officia veritatis. Deserunt illo illum
      quis.
    </div>
    <div>Accusamus dignissimos distinctio dolorum ducimus fugiat iste libero nihil perferendis placeat praesentium,
      provident quae quam quasi quos, ratione sed voluptate voluptatum. Est maiores minima minus, officia quod quos
      similique suscipit!
    </div>
    <div>Aliquam autem expedita laboriosam laborum maiores molestiae provident quas suscipit. Ab animi facere sed? Amet
      assumenda at atque doloribus dolorum ducimus earum nihil, quas reiciendis repellat reprehenderit temporibus
      tenetur totam.
    </div>
    <div>Consectetur deserunt doloribus laudantium, minus nisi non numquam obcaecati placeat sequi sit. Accusamus, amet
      dolore dolorem doloremque eius est et eum inventore laborum modi omnis porro quas quis veritatis vero!
    </div>
    <div>Consequatur culpa cupiditate ducimus ratione. Ab accusantium, amet architecto beatae consectetur cum deserunt
      eius eligendi eveniet exercitationem facere hic ipsum modi molestiae quae quaerat saepe sequi vero. Animi,
      consequuntur, quo.
    </div>
    <div>Adipisci beatae blanditiis corporis delectus distinctio dolores excepturi, ipsum officiis omnis porro
      repudiandae sapiente voluptate voluptates. Aliquam commodi corporis deleniti dignissimos eius illo natus, nesciunt
      nisi ratione repellendus ullam veniam.
    </div>
    <tabbar :INDEX="0"></tabbar>

  </view>
</template>

<script>
import ZshuNavbar from "@/components/zshu-components/zshu-navbar.vue";

import {ylxNavigateTo} from "@/utils/uniTools";

export default {
  components: {ZshuNavbar},
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
    }
  },
  methods: {
    ylxNavigateTo,
    ylxGetInfoFromChild({params, callback}) {
      console.log(params)
      setTimeout(() => {
        callback('hehehe')
      }, 200)
    },

    testHandler() {

    }

  }
}
</script>

<style>

</style>
