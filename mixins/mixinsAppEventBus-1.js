export default {
    globalData: {
        param: {}
    },
    onLaunch: function () {
        uni.$on('getAPP', this.handlerGetApp)
        uni.$on('APP', this.handlerApp)
    },

    methods: {
        // 跳转到还未打开过的tabbar页面
        // 向tabbar页面传参
        handlerApp({eventName, param}) {
            this.param = param
            uni.$emit(eventName, param)
            uni.$once(eventName, this.handlerGetApp)
        },
        handlerGetApp(handler) {
            if (typeof handler === 'function') {
                handler(this.param)
            }
        },
    },


}


