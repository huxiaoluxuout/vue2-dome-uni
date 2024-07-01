import {nextTick, reactive, ref, watch} from "vue";

import {throttle} from "@/utils/throttle";
import useDoQueue from "@/utils/common/useDoQueue";

const {setFunction, addFunctions, invokeAllFn} = useDoQueue()

export default function useReachBottom() {

    // 当前页码
    const page = ref(1)

    // 每页数量
    const pageSize = ref(10)

    // 是否正在加载中
    const isLoading = ref(false)
    const optionsPrams = reactive({})
    let reloadNextPageStatus = true
    /*onLoad((options) => {
        Object.assign(optionsPrams, options)
        // reload()
    })*/

    // 重新加载
    const reload = (dataList) => {
        isLoading.value = false
        page.value = 1
        pageSize.value = 10
        dataList.length = 0
        invokeAllFn();

    }

    // 更新pages
    const updateNextPage = (reloadNextPage) => {
        reloadNextPageStatus = reloadNextPage
        uni.stopPullDownRefresh();
        if (reloadNextPage) {
            isLoading.value = false; // 加载完成
            page.value++; // 页码加1
        } else {
            isLoading.value = false; // 加载失败
        }
    }

    // 触底加载下一页数据
    const reachBottomHandler = () => {
        throttle(() => {
            // 加载下一页数据
            if (!isLoading.value) {
                //isLoading.value = true; // 标记为正在加载中
                // console.log('加载下一页数据')
                if (reloadNextPageStatus) {
                    invokeAllFn();
                }
            }
        })
    }

    // 下拉刷新
    const pullDownRefreshHandler = (dataList) => {
        //isLoading.value = true; // 标记为正在加载中
        setTimeout(() => {
            uni.stopPullDownRefresh();
        }, 3000)
        reload(dataList)
    }

    return {
        page: page.value,
        pageSize: pageSize.value,
        optionsPrams,
        isLoading,
        reachBottomHandler,
        pullDownRefreshHandler,
        reload,
        updateNextPage,

        setFunction,
        addFunctions,
        invokeAllFn
    };
}
