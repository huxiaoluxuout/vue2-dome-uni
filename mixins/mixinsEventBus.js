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

        uni.$on('OnGlobEvent', ({type = 'navigateTo', eventName, isPath = true, handler}) => {
            uni.$emit(eventName, handler)
            uni.$once('GlobEvent' + eventName, ()=> {
                uni.$emit(eventName, handler)
            })

            if (isPath) {
                const {path, query, startStr} = splitQueryUrl(eventName)
                uni[type]({url: path + query + (startStr + 'eventName=' + eventName)})
            }
        })
    },
}


