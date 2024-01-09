const productionUrl = 'https://feiying.ahjinti.cn'
const testURL = 'https://feiying.ahjinti.cn'

export const devURL = 'https://feiying.ahjinti.cn'
export const proxyDevURL = 'http://192.168.0.16:3000/api'
// export const devURL = 'https://h.longduosci.com'

export const BASE_URL = proxyDevURL

export const uploadImgUrl = proxyDevURL + '/common/api.common/upload'

// export const BASE_URL = process.env.NODE_ENV === 'development' ? devURL : ''



export const TOKEN_EXPIRY_INTERVAL = 1000 * 60 * 60 * 24; // 24小时过期

// export const TOKEN_EXPIRY_INTERVAL = 1000 * 6; // 6s过期
