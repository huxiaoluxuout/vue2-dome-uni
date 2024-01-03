import pagesConfig from "@/pages.json";
import permision from "@/js_sdk/wa-permission/permission";


const {tabBar: {list: tabBarPages}} = pagesConfig


// 微信登录 code
const ylxLoginCode = () => {
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
const ylxPayMoney = function (data) {
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
const ylxMyLocation = () => {
    return new Promise((resolve, reject) => {
        let resultLocation = permision.checkSystemEnableLocation();
        if (resultLocation) {
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
                    resolve(fail);

                }
            })
        } else {
            uni.showModal({
                title: '请先开启GPS定位服务',
                success: function (res) {
                    if (res.confirm) {
                        permision.gotoAppPermissionSetting()
                    } else if (res.cancel) {

                    }
                }
            });
        }

    });

}

// 打开地图选择位置
const ylxChooseLocation = () => {
    return new Promise((resolve, reject) => {
        let resultLocation = permision.checkSystemEnableLocation();
        if (resultLocation) {
            uni.chooseLocation({
                success: (res) => {
                    const addressInfo = {

                        province: res.address.slice(0, res.address.indexOf('省') + 1),
                        city: res.address.slice(res.address.indexOf('省') + 1, res.address.indexOf('市') + 1),
                        area: res.address.slice(res.address.indexOf('市') + 1, res.address.indexOf('区') + 1)
                    }
                    resolve(Object.assign(res, addressInfo));
                },
                fail: function (err) {
                    reject(err);
                }
            });
        } else {
            uni.showModal({
                title: '请先开启GPS定位服务',

                success: function (res) {
                    if (res.confirm) {
                        permision.gotoAppPermissionSetting()
                    } else if (res.cancel) {

                    }
                }
            });
        }

    });
}

// IOS 底部兼容
const ylxIOSBottomHeight = () => {
    const {model} = uni.getSystemInfoSync()
    const models = ['X', 'XR', 'XS', '11', '12', '13', '14', '15'];
    if (model.indexOf('iPhone') !== -1 && models.some(item => model.indexOf(item) !== -1)) {
        return 35
    } else {
        return 0
    }
};

// 节点信息
const ylxViewInfo = (selector, callback, that) => {
    uni.createSelectorQuery()
        .in(that)
        .select(selector)
        .boundingClientRect((rect) => {
            callback(rect)
        })
        .exec();
}

//统一提示方便全局修改
const ylxToast = (title, duration = 1500, mask = true, icon = 'none') => {
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


const ylxDebuggerMsg = () => {
    uni.showToast({title: '开发调试中', icon: 'none'})
    throw new Error('开发调试中')
}

// 路径补全
const ylxFilterPath = (path) => {
    return /^\//.test(path) ? path : '/' + path
};
const toTargetPage = (pagePath, parseInfo = {}, api) => {

    if (!pagePath) return;

    const pattern = /\/?([^?]+)/;
    const route = pagePath.match(pattern)[1];
    const isTabBarPage = tabBarPages.map(item => ylxFilterPath(item.pagePath)).includes(ylxFilterPath(route));


    if (isTabBarPage) {
        uni.switchTab({
            url: ylxFilterPath(route),
            fail: function (fail) {
                console.error(fail)
            }
        })
    } else {

        let startStr = pagePath.indexOf('?') === -1 ? '?' : '&';
        let queryString = '';
        if (Object.keys(parseInfo).length) {
            queryString = startStr + Object.keys(parseInfo).map((key) => `${key}=${parseInfo[key]}`).join('&');
        }

        uni[api]({
            url: ylxFilterPath(pagePath + queryString),
            success: function (res) {
                console.log(res.errMsg)
            },
            fail: function (fail) {
                console.error('fail', fail.errMsg);
            }
        })
    }
}


const ylxNavigateTo = (pagePath, parse = {}) => toTargetPage(pagePath, parse, 'navigateTo');
const ylxRedirectTo = (pagePath, parse = {}) => toTargetPage(pagePath, parse, 'redirectTo');


const ylxAttributeStylers = (item, keyMap = []) => {
    // 原始数组
    const originalArray = ['flex', 'backgroundColor', 'filter', 'color'];

    // 创建一个新数组，将原始数组和键映射数组合并，同时去除重复的键。
    const mergedKeys = Array.from(new Set([...originalArray, ...keyMap]));

    // 初始化结果对象。
    const result = {};

    // 遍历合并后的键数组，提取属性值并添加到结果对象中。
    for (const key of mergedKeys) {
        const value = item[key];
        if (value !== null && value !== undefined) {
            result[key] = value;
        }
    }

    return result;
};

// 对象转成字符串 (style)
const ylxStyleObjectToString = (obj) => {
    let str = '';
    for (const key in obj) {
        str += `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}:${obj[key]};`;
    }
    return str;
}



const ylxUniOn = (uniCallback) => {
    let pages = getCurrentPages();
    let currentEvenName = pages[pages.length - 1]['route'];
    let preEvenName = '';
    if (pages.length > 1) {
        preEvenName = pages[pages.length - 2]['route'];
    }

    uni.$on(currentEvenName, uniCallback)
    return {currentEvenName, preEvenName}

}

export {
    ylxAttributeStylers,
    ylxStyleObjectToString,
    ylxIOSBottomHeight,
    ylxFilterPath,
    ylxLoginCode,
    ylxPayMoney,
    ylxMyLocation,
    ylxChooseLocation,
    ylxViewInfo,

    ylxDebuggerMsg,
    ylxNavigateTo,
    ylxRedirectTo,

    ylxToast,
    ylxUniOn,

}
