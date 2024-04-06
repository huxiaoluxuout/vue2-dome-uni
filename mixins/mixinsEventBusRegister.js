export default {

    data() {
        return {
            ylxPrevEventName: '',
            currentRouteEventName: '',
        }
    },
    onLoad() {
        const pages = getCurrentPages();
        this.currentRouteEventName = pages[pages.length - 1]['route'];
        if (pages.length > 1) {
            this.ylxPrevEventName = pages[pages.length - 2]['route'];
        }
        uni.$on(this.currentRouteEventName, this.ylxOnGetInfoHandler)
    },
    onUnload() {
        uni.$off(this.currentRouteEventName)
    },
    methods: {
        ylxOnGetInfoHandler(handler) {
            if (typeof handler === 'function') {
                handler((callbackPrams) => {
                    console.log('ylxOnGetInfoHandler', callbackPrams)
                })
            } else {
                console.log(handler)
            }

        },
    },


}


