import useDoQueue from "@/common/hooks/useuseDoQueue"

import useCallbackOnDataReady from "@/common/hooks/useCallbackOnDataReady";


const {setFunctions, addFunctions, DoFunQueue} = useDoQueue()

const {readyCallback, registerCallbacks, unReadyCallback} = useCallbackOnDataReady();

// 下拉刷新完成
const funQueue = () => {
    DoFunQueue();
    uni.stopPullDownRefresh();
    registerCallbacks();
    console.log('下拉刷新完成');
}

const pullDownRefreshFunctions = () => {
    return {
        // 只能加一个,多了会被覆盖
        pullDownRefreshSetFunctions: setFunctions,
        pullDownRefreshAddFunctions: addFunctions,
        // 刷新重置回调
        pullDownRefreshReload: readyCallback,
    }
}


export default {
    data() {
        return {
            pullDownRefreshFunctions
        }
    },
    onPullDownRefresh() {
        funQueue()
    },
    methods: {},

}
