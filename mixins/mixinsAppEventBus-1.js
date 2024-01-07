export default {
    globalData: {
        appParam: {}
    },
    onLaunch: function () {
        uni.$on('getAPP', this.handleGetApp)
        uni.$on('emitApp', this.handleApp)
    },

    methods: {

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


