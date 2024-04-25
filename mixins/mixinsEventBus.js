// 向未打开的页面传参(tabbar)


// 以问号 (?) 分割 URL，获取路径和查询字符串
function splitQueryUrl(pathUrl) {
    let url = /^\//.test(pathUrl) ? pathUrl : '/' + pathUrl
    let parts = url.split('?');
    let path = parts[0];
    let query = parts[1];
    return {
        path,
        query: query ? '?' + query : '',
        startStr: query ? '&' : '?',
    }
}


export default {
    onLaunch: function () {

        uni.$on('OnGlobEvent', ({type = 'navigateTo', eventPathName, isToPage = true, options = {}}) => {

            const {path, query, startStr} = splitQueryUrl(eventPathName)

            uni.$emit(path, options)
            uni.$once('GlobEvent' + path, () => uni.$emit(path, options))

            if (isToPage && (type === 'navigateTo' || type === 'switchTab')) {

                uni[type]({
                    url: path + query + (startStr + 'eventName=' + path),
                    fail(errMsg) {
                        console.error('errMsg', errMsg)
                    },
                })
            } else {
                console.error("Invalid type. Must be 'navigateTo' or 'switchTab'.");
            }
        })
    }
}



