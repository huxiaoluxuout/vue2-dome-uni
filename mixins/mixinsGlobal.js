import {ylxUniOn} from "@/utils/uniTools";

export default {
    data() {
        return {
            currentEvenName: '',
            preEvenName: '',
            isPageReady: false,
        }
    },
    onLoad() {
        let {currentEvenName, preEvenName} = ylxUniOn(this.ylxGetInfoFromChild)
        this.preEvenName = preEvenName
        this.currentEvenName = currentEvenName
    },
    methods: {
        ylxGetInfoFromChild(info) {
            console.log('GetInfoFromChild', info)
        },
        ylxEmit(param) {
            uni.$emit(this.preEvenName, param)
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


