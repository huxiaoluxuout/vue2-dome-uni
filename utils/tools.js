// IOS 底部兼容
const getIOSBottomHeight = () => {
    const {model} = uni.getSystemInfoSync()
    const models = ['X', 'XR', 'XS', '11', '12', '13', '14', '15'];
    if (model.indexOf('iPhone') !== -1 && models.some(item => model.indexOf(item) !== -1)) {
        return 35
    } else {
        return 0
    }
};

// 登录 code
const getLoginCode = () => {
    return new Promise((resolve, reject) => {
        // #ifdef MP-WEIXIN
        uni.login({
            provider: 'weixin',
            success: function (res) {
                resolve(res);
            },
            fail: function (fail) {
                reject(fail);
            },
        });
        // #endif

    });
};

//微信支付
const payMoney = function (data) {
    return new Promise((resolve, reject) => {
        uni.requestPayment({
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: data.signType,
            paySign: data.paySign,
            success: function (success) {
                resolve(success);
            },
            fail: function (fail) {
                reject(fail);
            }
        });
    })
}

// 获取当前位置
const getMyLocation = () => {
    return new Promise((resolve, reject) => {
        uni.getLocation({
            type: 'gcj02',
            isHighAccuracy: 'true',
            geocode: 'true',
            success: (res) => {
                console.log('res', res)
                resolve(res);
            },
            fail: (fail) => {
                console.log(fail)
            }
        })
    });

}

// 打开地图选择位置
const getChooseLocation = () => {
    return new Promise((resolve, reject) => {
        uni.chooseLocation({
            success: (res) => {
                const addressInfo = {

                    province: res.address.slice(0, res.address.indexOf('省') + 1),
                    city: res.address.slice(res.address.indexOf('省') + 1, res.address.indexOf('市') + 1),
                    area: res.address.slice(res.address.indexOf('市') + 1, res.address.indexOf('区') + 1)
                }
                resolve(Object.assign(res, addressInfo));
                console.log('res', res)

            },
            fail: function (err) {
                reject(err);
            }
        });
    });
}

//统一提示方便全局修改
const $msg = (title, duration = 1500, mask = true, icon = 'none') => {
    if (Boolean(title) === false) {
        return;
    }
    uni.showToast({
        title,
        duration,
        mask,
        icon
    });
}

// 获取页面栈
const getPageInfo = (callback, task = 1) => {

    // #ifdef MP

    const pages = getCurrentPages();
    if (pages.length < task + 1) {
        console.error('获取的页面不在栈内')
        return
    }
    console.log('pages', pages[pages.length - 1 - task].$vm)
    const {$vm, options, route: pagePath, onLoad, $page: {fullPath}} = pages[pages.length - 1 - task];
    callback && callback({...$vm, options, pagePath, onLoad, fullPath})

    // #endif


    // #ifdef WEB
    console.error('WEB')
    // #endif

}


// 页面路由跳转 --start

import pagesConfig from "@/pages.json";

const {tabBar: {list: tabBarPages}} = pagesConfig

// 路径补全
const filterPath = (path) => {
    return /^\//.test(path) ? path : '/' + path
};

const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


const toTargetPage = (pagePath, parseInfo = {}, api) => {

    if (!pagePath) return;

    const pattern = /\/?([^?]+)/;
    const route = pagePath.match(pattern)[1];

    const isTabBarPage = tabBarPages.map(item => filterPath(item.pagePath)).includes(filterPath(route));


    if (isTabBarPage) {
        uni.switchTab({
            url: filterPath(route),
            fail: function (fail) {
                $msg(fail.errMsg)
            }
        })
    } else {

        let env = pagePath.indexOf('?') === -1 ? '?' : '&'

        uni[api]({
            url: filterPath(pagePath + env),
            success: function (res) {
                console.log(res.errMsg)
            },
            fail: function (fail) {
                console.error('fail', fail.errMsg);
            }
        })
    }
}


const navigateTo = (pagePath, parse) => toTargetPage(pagePath, parse, 'navigateTo');
const redirectTo = (pagePath, parse) => toTargetPage(pagePath, parse, 'redirectTo');


// 事件处理器函数，根据条件执行操作或回调
const handleEvent = ({condition, errorCallback}, actionFunction, ...actionArgs) => {
    // const context = this;
    if (condition) {
        // 执行操作函数
        // actionFunction.apply(context, actionArgs);
        actionFunction(...actionArgs);
    } else {
        // 调用错误回调
        errorCallback();
    }
};

// 页面路由跳转 --end


// 将参数转换为查询字符串
const convertToQueryString = (params, starStr = '?') => {
    if (Object.keys(params).length === 0) {
        return '';
    }

    const separator = Object.keys(params)[0] === starStr ? '' : '&';
    return separator + Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
}

// 解析查询字符串
const parseQueryString = (queryString) => {
    const params = {};

    if (queryString.startsWith('?')) {
        queryString = queryString.slice(1);
    }

    const keyValues = queryString.split('&');
    keyValues.forEach(keyValue => {
        const [key, value] = keyValue.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    });

    return params;
};


/**
 * 节流
 * @param func
 * @param delay
 * @returns {(function(): void)|*}
 */
const throttle = (func, delay = 200) => {
    // console.log('throttle')
    let timerId;

    return function () {
        if (!timerId) {
            timerId = setTimeout(() => {
                func.apply(this, arguments);
                timerId = null;
            }, delay);
        }
    };
}

/**
 * 防抖
 * @param func
 * @param delay
 * @returns {(function(): void)|*}
 */

const debounce = (func, delay = 500, immediate = true) => {
    let timerId;

    return function () {
        const context = this;
        const args = arguments;

        const later = function () {
            timerId = null;

            if (!immediate) {
                func.apply(context, args);
            }
        };

        const callNow = immediate && !timerId;

        clearTimeout(timerId);
        timerId = setTimeout(later, delay);

        if (callNow) {
            func.apply(context, args);
        }
    };
}

const getViewInfo = (selector, callback, that) => {
    uni.createSelectorQuery()
        .in(that)
        .select(selector)
        .boundingClientRect((rect) => {
            callback(rect)
        })
        .exec();
}

const debuggerMsg = () => {
    uni.showToast({title: '开发调试中', icon: 'none'})
    throw new Error('开发调试中')
}

// 对象转成字符串 (style)
const objectToString = (obj) => {
    let str = '';
    for (const key in obj) {
        str += `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}:${obj[key]};`;
    }
    return str;
}
export {
    getViewInfo,
    throttle,
    debounce,
    getIOSBottomHeight,
    filterPath,
    $msg,
    getLoginCode,
    navigateTo,
    redirectTo,
    convertToQueryString,
    parseQueryString,
    payMoney,
    getMyLocation,
    getChooseLocation,

    getPageInfo,

    handleEvent,

    uuid,
    objectToString,
    debuggerMsg,

}

