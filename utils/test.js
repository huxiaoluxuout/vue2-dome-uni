export const getCID = () => {
	// #ifdef APP-PLUS
	uni.getPushClientId({
		success(res) {
			console.log('getPushClientId', res.cid);
		},
		fail(err) {
			console.log(err)
		}
	})
	uni.onPushMessage((res) => {
		console.log("收到推送消息：", res) //监听推送消息
	})


	// #endif

}