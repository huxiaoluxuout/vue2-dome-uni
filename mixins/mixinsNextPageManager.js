import {throttle} from "@/utils/tools";

import useDoQueue from "@/common/hooks/useuseDoQueue"

import useCallbackOnDataReady from "@/common/hooks/useCallbackOnDataReady"


const {setFunctions, addFunctions, DoFunQueue} = useDoQueue()

const {registerCallbacks, readyCallback, unReadyCallback} = useCallbackOnDataReady();


/*const useNextPageManager = {
    // 当前页码
    page: 1,
    // 每页数量
    pageSize: 10,
    // 列表数据
    dataList: [],

    isLastPage: false,

    // 重新加载
    reload() {
        this.page = 1
        this.pageSize = 10
        // this.dataList = [];
        registerCallbacks();
        return this


    },

    updateDataList(newResDataList, oldDataList) {

        if (!Array.isArray(newResDataList)) {
            throw new Error('传入数据只能是数组');
        }

        let isCanGetNextPage = newResDataList.length % this.pageSize === 0

        if (isCanGetNextPage) {

            this.page++;
            this.isLastPage = false;
            this.dataList = oldDataList.concat(newResDataList);

        } else {
            if (!this.isLastPage) {

                this.dataList = oldDataList.concat(newResDataList);

                this.isLastPage = true

            } else {

                console.warn('数据加载完成，尝试刷新页面');
            }
        }

    },
    // 设置列表数据
    setDataList(newResData) {
        this.updateDataList(newResData, this.dataList);
        return this
    },


    nexPageSetFunName(func, args) {
        setFunctions(func, args)
        return this
    },
    nexPageSetFunNames(func, args) {
        addFunctions(func, args)
        return this
    },

    // 执行函数的调用
    nexPageDoFunQueue() {
        DoFunQueue()
    },

    // 响应重新加载
    onNexPageReload: readyCallback


}*/

const foo = function () {
    // 当前页码
    let page = 1
    // 每页数量
    let pageSize = 10
    // 列表数据
    let dataList = []

    let isLastPage = false

    return {
        page,
        pageSize,
        dataList,
        isLastPage,
        // 重新加载
        reload() {
            page = 1
            pageSize = 10
            registerCallbacks();
        },
        updateDataList(newResDataList, oldDataList) {

            if (!Array.isArray(newResDataList)) {
                throw new Error('传入数据只能是数组');
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

        },
        // 设置列表数据
        setDataList(newResData) {
            this.updateDataList(newResData, dataList);
        },


        nexPageSetFunction(func, args) {
            setFunctions(func, args)
        },
        nexPageSetAddFunction(func, args) {
            addFunctions(func, args)
        },

        // 执行函数的调用
        nexPageDoFunQueue() {
            DoFunQueue()
        },

        // 响应重新加载
        onNexPageReload: readyCallback
    }
}

export default {
    data() {
        return {
            foo1: foo
        }
    },
    onReachBottom() {
        console.log('onReachBottom----XXXXXXX')
    },
    methods: {},

}
//======================================================================================


