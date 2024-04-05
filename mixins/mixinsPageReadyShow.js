export default {
    data() {
        return {
            isPageReady: false,
        }
    },

    methods: {
        ylxOnPageReadyShow() {
            // console.log('ylxOnPageReadyShow')
        },
    },
    onShow() {
        if (this.isPageReady) {
            this.ylxOnPageReadyShow()
        }
    },
    onReady() {
        this.isPageReady = true
    },


}


