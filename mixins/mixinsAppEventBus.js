import {splitQueryUrl} from "@/utils/tools";

// 向未打卡的页面传参(tabbar)

export default {
    onLaunch: function () {
        uni.$on('OnGlobEvent', ({eventName, isPath = true, handler}) => {
            uni.$once(eventName, handler)
            if (isPath) {
                const {path, query, startStr} = splitQueryUrl(eventName)
                uni.navigateTo({url: path + query + (startStr + 'eventName=' + eventName)})
            }
        })
    },
}


