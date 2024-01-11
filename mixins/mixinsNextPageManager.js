import useDoQueue from "@/common/hooks/useDoQueue"

import useCallbackOnDataReady from "@/common/hooks/useCallbackOnDataReady"


const {setFunction, addFunctions, DoFunQueue} = useDoQueue()

const {registerCallbacks, readyCallback, unReadyCallback} = useCallbackOnDataReady();


const PageManager = function () {
    // 每页数量
    const pageSize = 7

    // 当前页码
    let page = 1

    // 列表数据
    let dataList = []

    let isLastPage = false
    let len1 = 0
    let len2 = 0


    const updateDataList = (newResDataList, oldDataList) => {

        if (!Array.isArray(newResDataList)) {
            console.error('传入数据只能是数组');
            return
        }
        len1 = dataList.length

        if (newResDataList.length === 0) {
            len2 = dataList.length
            console.warn('没有新数据了，尝试刷新页面');
            return dataList
        }

        let isCanGetNextPage = newResDataList.length % pageSize === 0

        if (isCanGetNextPage) {

            page++;
            isLastPage = false;
            dataList = oldDataList.concat(newResDataList);

        } else {
            if (!isLastPage) {
                dataList = oldDataList.concat(newResDataList);
                isLastPage = true

            } else {

                console.warn('数据加载完成，尝试刷新页面');
            }
        }
        len2 = dataList.length
        return dataList

    }

    // 执行函数的调用
    const nexPageDoFunQueue = () => {
        DoFunQueue()
    }
    // 重新加载
    const reload = () => {
        console.log('重新加载')
        page = 1
        dataList = []
        isLastPage = false
        registerCallbacks();
    }

    // 设置列表数据
    const setDataList = (newResData) => {
        return updateDataList(newResData, dataList);
    }

    const nexPageSetFunction = (func, args) => {
        setFunction(func, args)
    }

    const nexPageSetAddFunction = (func, args) => {
        addFunctions(func, args)
    }

    const getPage = () => page

    const getPageSize = () => pageSize

    const getDataList = () => dataList
    const getLen1 = () => len1
    const getLen2 = () => len2


    return {
        getPage,
        getPageSize,
        getDataList,
        setDataList,

        nexPageDoFunQueue,
        setEmitFunctions: nexPageSetFunction,
        addEmitFunctions: nexPageSetAddFunction,
        reload,
        reloadCallback: readyCallback,
        getLen1,
        getLen2
    }
}

const nextPageManager = PageManager();

export default {
    onLoad() {
        // nextPageManager.setEmitFunctions(this.ylxSetFunctions)
        // nextPageManager.reloadCallback(this.ylxReloadCallback)
    },
    data() {
        return {
            ylxNextPageManager: nextPageManager,

        }
    },
    methods: {
        ylxOnReachBottom() {
            // console.log('ylxOnReachBottom');
        },
       /* ylxSetFunctions() {

        },*/
        ylxReloadCallback() {

        },

    },
    onReachBottom() {
        console.log('onReachBottom')
        console.log(nextPageManager.getLen1(), nextPageManager.getLen2())
        if (nextPageManager.getLen1() < nextPageManager.getLen2()) {
            nextPageManager.nexPageDoFunQueue()
        }
    }

}


