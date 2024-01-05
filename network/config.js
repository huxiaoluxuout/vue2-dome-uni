const productionUrl = 'https://feiying.ahjinti.cn'
const testURL = 'https://feiying.ahjinti.cn'

// export const devURL = 'http://192.168.2.25:3000/api'
export const devURL = 'https://h.longduosci.com'

export const uploadImg = devURL +'/upload'


export const BASE_URL = process.env.NODE_ENV === 'development' ? devURL : testURL

// export const longDuo_BASE_URL = "https://h.longduosci.com"


export const TOKEN_EXPIRY_INTERVAL = 1000 * 60 * 60 * 24; // 24小时过期

// export const TOKEN_EXPIRY_INTERVAL = 1000 * 6; // 6s过期
