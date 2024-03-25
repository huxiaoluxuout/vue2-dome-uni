const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


// 将参数转换为查询字符串
const encodeObjectToQueryString = (params, starStr = '?') => {
    if (Object.keys(params).length === 0) {
        return '';
    }

    const separator = Object.keys(params)[0] === starStr ? '' : '&';
    return separator + Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
}

// 解析查询字符串
const encodeParseQueryString = (queryString) => {
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
const objectStyleToString = (obj) => {
    let str = '';
    for (const key in obj) {
        str += `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}:${obj[key]};`;
    }
    return str;
}
/**
 * 从 URL 中?分割出路径和查询字符串
 * @param  {String} url 完整的 URL
 * @return {Object}     包含路径和查询字符串的对象
 */
function splitQueryUrl(url) {
    // 以问号 (?) 分割 URL，获取路径和查询字符串
    let parts = url.split('?');
    let path = parts[0];
    let query = parts[1];
    return {
        path,
        query: query ? '?' + query : ''
    }
}



// 根据传入的索引批量删除
function removeElementsByIndex(arr, indexes, callback) {
    indexes = Array.isArray(indexes) ? indexes : [indexes];
    // 根据传入的索引进行删除
    for (let i = indexes.length - 1; i >= 0; i--) {
        const index = indexes[i];
        if (index >= 0 && index < arr.length) {
            arr.splice(index, 1);
        }
    }
    typeof callback === 'function' && callback()

}

function isEmptyData(value) {
    const dataType = Object.prototype.toString.call(value).replace(/\[object (\w+)]/, "$1").toLowerCase();
    if (value === undefined || value === null) {
        return true;
    } else if (dataType === 'string') {
        return value.trim().length === 0;
    } else if (dataType === 'array') {
        return value.length === 0;
    } else if (dataType === 'object') {
        return Object.keys(value).length === 0;
    } else if (dataType === 'number') {
        return value === 0;
    }
    return false;
}
function deepEqual(obj1, obj2) {
    // 判断是否为对象
    if (obj1 === obj2) return true;
    if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) return false;

    // 获取属性列表
    let props1 = Object.getOwnPropertyNames(obj1);
    let props2 = Object.getOwnPropertyNames(obj2);

    // 属性数量不同，直接返回 false
    if (props1.length !== props2.length) return false;

    // 逐一比较属性值
    for (let propName of props1) {
        if (!obj2.hasOwnProperty(propName)) return false;

        let val1 = obj1[propName];
        let val2 = obj2[propName];

        // 递归处理对象和数组
        if (val1 instanceof Object) {
            if (!deepEqual(val1, val2)) return false;
        } else if (val1 instanceof Array) {
            if (!arrayEquals(val1, val2)) return false;
        } else if (val1 !== val2) {
            return false;
        }
    }

    return true;
}

function arrayEquals(arr1, arr2) {
    if (!arr2) return false;
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
            if (!arrayEquals(arr1[i], arr2[i])) return false;
        } else if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

/*// 使用示例
let obj1 = { a: 1, b: 2, c: { d: 3 } };
let obj2 = { a: 1, b: 2, c: { d: 3 } };
let obj3 = { a: 1, b: 2, c: { d: 4 } };

console.log(deepEqual(obj1, obj2)); // 输出 true
console.log(deepEqual(obj1, obj3)); // 输出 false

let arr1 = [1, 2, [3, 4]];
let arr2 = [1, 2, [3, 4]];
let arr3 = [1, 2, [3, 5]];

console.log(arrayEquals(arr1, arr2)); // 输出 true
console.log(arrayEquals(arr1, arr3)); // 输出 false*/



export {
    uuid,
    encodeObjectToQueryString,
    encodeParseQueryString,
    objectStyleToString,
    removeElementsByIndex,
    isEmptyData,
    splitQueryUrl

}

