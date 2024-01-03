
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

const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


// 事件处理器函数，根据条件执行操作或回调
const handlerEvent = (
    {
        isPass: isPass = true,
        errorHandle: errorCallback = () => {
        },
        handle: handle
    },
    ...args) => {
    if (isPass) {
        // 执行操作函数

        handle(...args);
    } else {

        // 调用错误回调
        errorCallback && errorCallback(...args);
    }
};


// 将参数转换为查询字符串
const objectToQueryString = (params, starStr = '?') => {
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



// 对象转成字符串 (style)
const objectToString = (obj) => {
    let str = '';
    for (const key in obj) {
        str += `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}:${obj[key]};`;
    }
    return str;
}

// 根据传入的索引进行删除
function removeElementsByIndex(arr, indexes, callback) {
    indexes = Array.isArray(indexes) ? indexes : [indexes];
    // 根据传入的索引进行删除
    for (let i = indexes.length - 1; i >= 0; i--) {
        const index = indexes[i];
        if (index >= 0 && index < arr.length) {
            arr.splice(index, 1);
        }
    }
    callback && callback()

}

export {
    throttle,
    debounce,
    objectToQueryString,
    parseQueryString,
    handlerEvent,
    uuid,
    objectToString,
    removeElementsByIndex,
}

