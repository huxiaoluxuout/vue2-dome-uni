import {splitQueryUrl} from "@/utils/tools";

// 向未打卡的页面传参(tabbar)

export default {
    onLaunch: function () {

        uni.$on('OnGlobEvent', ({type = 'navigateTo', eventName, isPath = true, handler}) => {
            uni.$emit(eventName, handler)
            uni.$once('GlobEvent' + eventName, ()=> {
                uni.$emit(eventName, handler)
            })
            if(type==='navigateTo'){

            }else if(type==='switchTab'){

            }

            if (isPath) {
                const {path, query, startStr} = splitQueryUrl(eventName)
                uni[type]({url: path + query + (startStr + 'eventName=' + eventName)})
            }
        })
    },
}


