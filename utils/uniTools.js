import pagesConfig from "@/pages.json";
import {uniChooseImage, uniChooseLocation, uniGetLocation} from "@/common/js/uniApi";

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


//调起支付 app
const ylxPayMoney = function (data) {
    /*let 参数 = {
        "provider": "wxpay",
        "orderInfo": {
            "prepayid": "wx161633121422715bc756fb68a4efb60000",
            "appid": "wxf383752c90a2a994",
            "partnerid": "1601225378",
            "package": "Sign=WXPay",
            "noncestr": "c1af7c1b65f860f830b3307dfa9",
            "timestamp": 1705393992,
            "sign": "OBidYj/ccaONa7Eg8YOPLwYKTAhHSDyweKihCxX0mqGOkFXjb96ozMASjwyLqsjaPr9q6NNb4opJxtQp7WW/owN4iPkaTTVO1Keql9YKrJ4hVl2FfLUSfroUiyrKOohzfRpvLgskivA16Z9SD1U46pJqN9X00tQc8D628SZUUQbDtVbef25JExG/v4Kq4miJz7br7NOyi8SJvSrKJGLyVDmLFlU8Jult0jRTgeyCgy6m2IXJm6lgxlB3Q76HCMqAFqBax4N7425ENEgBiSVOxVsJzW144PA+XqZ5vUpHbZGVzlz3kGN6jLMXs+uMTx0HAemNg1ZiNqCxSHiU+Ordzg=="
        }
    }*/

    return new Promise((resolve, reject) => {
        // #ifndef H5
        uni.getProvider({
            service: 'payment',
            success: resp => {
                uni.requestPayment({
                    provider: data.provider,
                    orderInfo: data.orderInfo,
                    success: function (success) {
                        resolve(success);
                    },
                    fail: function (fail) {
                        reject(fail);
                    }
                });
            }
        });
        // #endif
    })
}

// 获取当前位置
const ylxMyLocation = async () => {
    try {
        await uniGetLocation()

    } catch (err) {
        console.error(err)
    }

}

// 打开地图选择位置
const ylxChooseLocation = async () => {

    try {
        await uniChooseLocation()

    } catch (err) {
        console.error(err)
    }

}

// 选择图片/拍摄
const ylxChooseImage = async () => {
    try {
        await uniChooseImage()

    } catch (err) {
        console.error(err)
    }

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


const ylxOpenWxDebug = (options) => {
    uni.getSystemInfo({
        success(res) {
            // #ifdef MP
            if (res.brand && res.brand !== "devtools" && process.env.NODE_ENV === 'development') {
                // 打开调试
                uni.setEnableDebug({
                    enableDebug: options.query?.isDebugger === '1'
                })
            }
            // #endif

        }
    })
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
    ylxChooseImage,
    ylxViewInfo,
    ylxDebuggerMsg,
    ylxNavigateTo,
    ylxRedirectTo,
    ylxOpenWxDebug,
    ylxToast,

}
