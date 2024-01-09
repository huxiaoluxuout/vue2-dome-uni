<template>
	<view>
    <swiper class="swiper" :circular="false" :disable-touch="false"  swiperDuration="250">
      <swiper-item v-for="(item, index) in displaySwiperList" :key="index">
        <view class="wrap_content">
          <view>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias eius enim libero soluta velit. Amet assumenda debitis distinctio eius est impedit laborum odit
            omnis, pariatur quae quas quisquam quod repudiandae?
          </view>
          <view>Adipisci alias animi at deserunt dolores expedita hic impedit iste maxime nesciunt nulla pariatur possimus quia, rem tempora, unde, veniam. Ea eos fugiat, inventore
            magni neque obcaecati quidem vitae voluptatibus.
          </view>
        </view>
      </swiper-item>
    </swiper>

	</view>
</template>

<script>
	export default {
		data() {
			return {
        displaySwiperList:[
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaawwwwwwwwwwwwwwwwwwwwwwwwwww',2,3,4
        ]
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
.swiper {
  height: calc(100vh - 120px);
}

.wrap_content {
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: gray;
  height: 140vh;
  color: aqua;
  font-size: 80px;
  word-break: break-all;
  overflow-y: auto;
  margin: 0 40px;
}
</style>
