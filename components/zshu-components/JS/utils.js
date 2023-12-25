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

// 对象转成字符串
const objectToString = (obj) => {
    let str = '';
    for (const key in obj) {
        str += `${key}:${obj[key]};`;
    }
    return str;
}


export {
    filterPath, $msg, objectToString
}
