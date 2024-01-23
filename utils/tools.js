const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const handleAction = (isSuccess, errorHandler, successHandler, ...args) => {
    if (isSuccess) {
        if (typeof successHandler === 'function') {
            successHandler(...args);
        }
    } else if (typeof errorHandler === 'function') {
        errorHandler(...args);
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
    objectToQueryString,
    parseQueryString,
    uuid,
    objectToString,
    removeElementsByIndex,

}

