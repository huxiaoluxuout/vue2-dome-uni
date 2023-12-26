<template>
	<view>
000

	 <button @click="navigateTo('pages/A1/A1')"> 页面1</button>
	 
    <tabbar :INDEX="0"></tabbar>

	</view>
</template>

<script>
	import ZshuNavbar from "@/components/zshu-components/zshu-navbar.vue";
  import {navigateTo} from "@/utils/tools";

  export default {
    components: {ZshuNavbar},
		data() {
			return {

			}
		},
		methods: {
      navigateTo

		}
	}
</script>

<style>

</style>
