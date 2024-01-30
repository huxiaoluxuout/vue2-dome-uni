'use strict';

const uniPush = uniCloud.getPushManager({
	appId: "__UNI__89D6275"
}) 

exports.main = async (event, context) => {

	return await uniPush.sendMessage({
		force_notification: true,
		"push_clientid": "ef316f59f4f5fc16d6598f93bb13e2da",
		"title": "通知栏显示的标题",
		"content": "通知栏显示的内容",
		"payload": {
			"text": "体验一下uni-push2.0"
		}
	})
};