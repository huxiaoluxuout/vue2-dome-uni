export class UniEventBusCore {
    NAVIGATION_TYPES = {
        navigateTo: 'navigateTo',
        switchTab: 'switchTab'
    };

    registerGlobEvent() {
        uni.$on('OnGlobEvent', ({toPageType = this.NAVIGATION_TYPES.navigateTo, eventPathName, isToPage = true, options = {}}) => {
            const {path, query, startStr} = this.splitQueryUrl(eventPathName);
            uni.$emit(path, options)
            uni.$once('GlobEvent' + path, () => uni.$emit(path, options))
            this.handleNavigation(toPageType, path, query, startStr, options, isToPage);
        });
    }

    handleNavigation(toPageType, path, query, startStr, options, isToPage) {
        if (isToPage) {
            if (toPageType === this.NAVIGATION_TYPES.navigateTo || toPageType === this.NAVIGATION_TYPES.switchTab) {
                let pathUrl = toPageType === this.NAVIGATION_TYPES.navigateTo ? `${path}${query}${startStr}eventName=${path}` : path;
                uni[toPageType]({
                    url: pathUrl,
                    fail(errMsg) {
                        console.error('errMsg', errMsg);
                    },
                });
            }
        }
    }

    /**
     * options  onPageNotice接收的参数
     * eventPathName {/} 目标地址
     * toPageType {navigateTo | switchTab}
     * */
    pageNotice({eventPathName, options = {}}, isToPage = false, toPageType = this.NAVIGATION_TYPES.navigateTo) {
        uni.$emit('OnGlobEvent', {
            isToPage,
            toPageType,
            eventPathName,
            options,
        });
    }

    currentEventName = '';

    getCurrentPageEventName() {
        return new Promise(resolve => {
            const pages = getCurrentPages();
            this.currentEventName = '/' + pages[pages.length - 1]['route']
            resolve(this.currentEventName);
        });
    }

    /**
     *接收其它页面传入的参数
     * */
    onPageNotice(otherPageFn) {
        if (typeof otherPageFn !== 'function') {
            console.error('传入的参数必须是函数！');
            return;
        }

        if (this.currentEventName) {
            let hasRegistered = false;
            uni.$emit(this.currentEventName, () => {
                hasRegistered = true;
                uni.$off(this.currentEventName, otherPageFn);
            });
            this.onEvent(hasRegistered, this.currentEventName, otherPageFn);
        }
    }

    onEvent(hasRegistered, eventName, ylxOnHandler) {
        if (hasRegistered) return;
        uni.$on(eventName, ylxOnHandler);
        uni.$emit('GlobEvent' + eventName);
    }

    removeCurrentPageEventName(currentEventName) {
        uni.$off(currentEventName);
    }

    splitQueryUrl(pathUrl) {
        let url = /^\//.test(pathUrl) ? pathUrl : '/' + pathUrl;
        let [path, query] = url.split('?');
        return {
            path,
            query: query ? '?' + query : '',
            startStr: query ? '&' : '?',
        };
    }
}
