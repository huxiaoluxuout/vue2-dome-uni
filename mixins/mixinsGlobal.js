import {ylxUniOn} from "@/utils/uniTools";

export default {
    data() {
        return {
            currentEvenName: '',
            preEvenName: '',
            isPageReady: false,
        }
    },
    onLoad(options) {
        console.log(options)
        let {currentEvenName, preEvenName} = ylxUniOn(this.ylxGetInfoFromChild)
        this.preEvenName = preEvenName
        this.currentEvenName = currentEvenName
    },
    methods: {
        ylxUniEmit(params, callback) {
            const callbackType = typeof callback;
            if (callbackType !== 'undefined') {
                if (callbackType !== 'function') {
                    callback = function () {
                    }
                    console.error('第二个参数必为函数！')
                }
            } else {
                callback = function () {
                }
            }
            uni.$emit(this.preEvenName, {params, callback})
        },

        ylxGetInfoFromChild({params, callback}) {
            setTimeout(() => {
                callback('hehehe')
            }, 200)
        },


        ylxOnShow() {
            console.log('ylxOnShow')
        },
    },
    onShow() {
        if (this.isPageReady) {
            this.ylxOnShow()
        }
    },

    onReady() {
        this.isPageReady = true
    },

    onUnload() {
        uni.$off(this.currentEvenName, this.ylxGetInfoFromChild)
    },

}


