import App from './App'

import {EventBus} from "@/utils/EventBus";

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import uView from '@/uni_modules/uview-ui'

Vue.use(uView)

import store from './store'

Vue.prototype.$store = store

const eventBus = new EventBus()

function splitQueryUrl(pathUrl) {
    // 以问号 (?) 分割 URL，获取路径和查询字符串
    let url = /^\//.test(pathUrl) ? pathUrl : '/' + pathUrl
    let parts = url.split('?');
    let path = parts[0];
    let query = parts[1];
    return {
        path,
        query: query ? '?' + query : '',
        startStr: query ? '&' : '?',
    }
}

eventBus.on('OnGlobEvent', ({eventName, isPath = true, handler}) => {
    eventBus.once(eventName, handler)
    if (isPath) {
        const {path, query, startStr} = splitQueryUrl(eventName)
        uni.navigateTo({url: path + query + (startStr + 'eventName=' + eventName)})
    }
})


Vue.prototype.$EventBus = eventBus


import PageReadyShow from "./mixins/mixinsPageReadyShow";

Vue.mixin(PageReadyShow)


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {createSSRApp} from 'vue'
import {splitQueryUrl} from "@/utils/tools";

export function createApp() {
    const app = createSSRApp(App)
    return {
        app
    }
}

// #endif
