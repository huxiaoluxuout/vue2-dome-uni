export default {

    data() {
        return {
            preEventName: '',
            currentRouteEventName: '',
        }
    },
    onLoad() {
        const pages = getCurrentPages();
        this.currentRouteEventName = pages[pages.length - 1]['route'];
        if (pages.length > 1) {
            this.preEventName = pages[pages.length - 2]['route'];
        }
        uni.$on(this.currentRouteEventName, this.ylxOnCurrentPageHandler)
    },
    onUnload() {
        uni.$off(this.currentRouteEventName)
    },
    methods: {
        ylxOnCurrentPageHandler(handler) {
            if (typeof handler === 'function') {
                handler((callbackPrams) => {
                    console.log('ylxOnCurrentPageHandler', callbackPrams)
                })
            } else {
                console.log(handler)
            }

        },
    },


}


