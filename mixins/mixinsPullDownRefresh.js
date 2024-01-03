import useDoQueue from "@/common/hooks/useDoQueue"

import useCallbackOnDataReady from "@/common/hooks/useCallbackOnDataReady";


const {setFunction, addFunctions, DoFunQueue} = useDoQueue()

const {readyCallback, registerCallbacks, unReadyCallback} = useCallbackOnDataReady();


const pullDownRefreshFunctions = () => {
    return {
        // 只能加一个,多了会被覆盖
        setEmitFunctions: setFunction,
        addEmitFunctions: addFunctions,
        // 刷新重置回调
        reloadCallback: readyCallback,

        // 下拉刷新完成
        funQueue: () => {
            DoFunQueue();
            uni.stopPullDownRefresh();
            registerCallbacks();
            console.log('下拉刷新完成');
        }
    }
}

const pullDownRefresh = pullDownRefreshFunctions()
export default {
    data() {
        return {
            ylxPullDownRefresh: pullDownRefresh
        }
    },
    onLoad() {
        // pullDownRefresh.setEmitFunctions(this.ylxOnPullDown)
        // pullDownRefresh.reloadCallback(this.ylxPullDownCallBack)
    },
    methods: {
        ylxOnPullDown() {

        },
        ylxPullDownCallBack() {

        },
    },
    onPullDownRefresh() {
        pullDownRefresh.funQueue()
    },

}
