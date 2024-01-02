import {ylxOnUni} from "@/utils/tools";

export default {
    data() {
        return {
            currentEvenName: '',
            proEvenName: '',
            isPageReady: false,
        }
    },
    onLoad() {
        let {currentEvenName, proEvenName} = ylxOnUni(this.ylxGetInfoFromChild)
        this.proEvenName = proEvenName
        this.currentEvenName = currentEvenName
    },
    methods: {
        ylxGetInfoFromChild(info) {
            console.log('GetInfoFromChild', info)
        },
        ylxEmit(param) {
            uni.$emit(this.proEvenName, param)
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


