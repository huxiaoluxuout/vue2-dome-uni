import useDoQueue from "@/common/hooks/useDoQueue"

import useCallbackOnDataReady from "@/common/hooks/useCallbackOnDataReady"


const {setFunction, addFunctions, DoFunQueue} = useDoQueue()

const {registerCallbacks, readyCallback, unReadyCallback} = useCallbackOnDataReady();


const PageManager = function () {
    // 每页数量
    const pageSize = 10

    // 当前页码
    let page = 1

    // 列表数据
    let dataList = []

    let isLastPage = false


    const updateDataList = (newResDataList, oldDataList) => {

        if (!Array.isArray(newResDataList)) {
            throw new Error('传入数据只能是数组');
        }
        if (!newResDataList.length) {
            console.log('没有新数据了')
            return
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
    }
}

const nextPageManager = PageManager();

export default {
    onLoad() {
        nextPageManager.addEmitFunctions(this.ylxOnReachBottom)
        // nextPageManager.reloadCallback(this.ylxReachBottomCallBack)
    },
    data() {
        return {
            ylxNextPageManager: nextPageManager,
            // nextPageManager: PageManager(),
        }
    },
    methods: {

        ylxOnReachBottom() {
            console.log('ylxOnReachBottom');

        },
      /*  ylxReachBottomCallBack() {
            console.log('ylxReachBottomCallBack');

        },*/
    },
    onReachBottom() {
        nextPageManager.nexPageDoFunQueue()
    }

}


