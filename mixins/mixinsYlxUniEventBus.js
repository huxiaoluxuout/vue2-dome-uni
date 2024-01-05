import {ylxUniOn} from "@/utils/uniTools";

export default {

    data() {
        return {
            preEventName: '',
            currentEventName: '',
            ylxOnUniGetInfoName: 'ylxOnUniGetInfo',
        }
    },
    onLoad() {
        const {ylxOnUniGetInfoName} = this;
        let {preEventName, currentEventName} = ylxUniOn(this[ylxOnUniGetInfoName])
        this.preEventName = preEventName
        this.currentEventName = currentEventName
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
            uni.$emit(this.preEventName, {params, callback})
        },

        ylxOnUniGetInfo({params, callback}) {
            console.log('ylxOnUniGetInfoFunction', params)
            callback(params)
        },
    },


    onUnload() {
        const {ylxOnUniGetInfoName} = this;
        uni.$off(this.currentEventName,this[ylxOnUniGetInfoName])
    },

}


