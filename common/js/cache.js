const TOKEN_KEY = '__token__'
const CART_LIST_KEY = '__cartList__'
const SEARCH_HISTORY = '__searchHistory__'

// __token__
export function getTokenCache() {
    return uni.getStorageSync(TOKEN_KEY) ? uni.getStorageSync(TOKEN_KEY) : ''
}

export function setTokenCache(token) {
    uni.setStorageSync(TOKEN_KEY, token)
    return token
}

export function removeTokenCache() {
    uni.removeStorageSync(TOKEN_KEY)
    return ''
}

// __cartList__
export function getCartListCache() {
    return uni.getStorageSync(CART_LIST_KEY) ? uni.getStorageSync(CART_LIST_KEY) : {}
}

export function setCartListCache(cartGoods) {
    uni.setStorageSync(CART_LIST_KEY, cartGoods)
    return cartGoods
}

//__searchHistory__
export function getSearchHistoryCache() {
    return uni.getStorageSync(SEARCH_HISTORY) ? uni.getStorageSync(SEARCH_HISTORY) : []
}

export function setSearchHistoryCache(searchHistory) {
    uni.setStorageSync(SEARCH_HISTORY, searchHistory)
    return searchHistory
}