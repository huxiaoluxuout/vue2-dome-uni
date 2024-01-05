export default {
    globalData: {
        appParam: {}
    },
    onLaunch: function () {
        uni.getSystemInfo({
            success(res) {
                // #ifdef MP
                if (res.brand && res.brand !== "devtools" && process.env.NODE_ENV === 'development') {
                    // 打开调试
                    uni.setEnableDebug({
                        enableDebug: options.query?.isDebugger === '1'
                    })
                }
                // #endif

            }
        })
        uni.$on('getAPP', this.handleGetApp)
        uni.$on('emitApp', this.handleApp)
    },

    methods: {
        // 跳转到还未打开过的tabbar页面
        // 向tabbar页面传参
        handleApp({eventName, param}) {
            this.appParam = param
            uni.$emit(eventName, param)
            uni.$once(eventName, this.handleGetApp)
        },
        handleGetApp(handler) {
            if (typeof handler === 'function') {
                handler(this.appParam)
            }
        },
    },


}


