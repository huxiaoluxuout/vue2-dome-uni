/**
 * 根据提供的键映射数组，返回包含所有键的样式对象。
 * @param {Object} item - 包含样式属性的对象。
 * @param {Array} keyMap - 要包含的键的数组。
 * @returns {Object} - 包含所有非空非undefined键值对的样式对象。
 */

const attributeStylers = (item, keyMap = []) => {
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


// 路径补全
const filterPath = (path) => {
    return /^\//.test(path) ? path : '/' + path
}

const $msg = (title, duration = 1500, mask = true, icon = 'none') => {
    //统一提示方便全局修改
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

// 对象转成字符串 (style)

const styleObjectToString = (obj) => {
    let str = '';
    for (const key in obj) {
        str += `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}:${obj[key]};`;
    }
    return str;
}


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

const getViewInfo = (selector, callback, that) => {
    uni.createSelectorQuery()
        .in(that)
        .select(selector)
        .boundingClientRect((rect) => {
            callback(rect)
        })
        .exec()
}


export {
    getIOSBottomHeight,
    filterPath,
    $msg,
    styleObjectToString,
    getViewInfo,
    attributeStylers
}
