import {authorizeUtils, checkGPS, showAuthTipModal} from "@/common/js/authorizeUtils";

// 拨打电话
const makePhoneCall = (phoneNumber, callback) => {
    uni.makePhoneCall({
        phoneNumber: '' + phoneNumber,
        fail: (fail) => {
            console.error(fail)
        },
        complete: () => {
            if (typeof callback === 'function') {
                callback()
            }
        }
    });
}

export const uniMakePhoneCall = async (phoneNumber, callback) => {
    // #ifdef WEB
    if (typeof callback === 'function') {
        callback()
    }
    // #endif


    // #ifdef APP-PLUS
    var osName = plus.os.name;

    if (osName.toLowerCase() === "android") {
        let authorize = "android.permission.CALL_PHONE"
        await showAuthTipModal(authorize)
        makePhoneCall(phoneNumber, callback)

    } else if (osName.toLowerCase() === "ios") {
        makePhoneCall(phoneNumber, callback)
    }

    // #endif


    // #ifdef MP
    makePhoneCall(phoneNumber, callback)
    // #endif

}


// 相机
const openCamaraAuthorize = async (disabled) => {
    let authorize = "android.permission.CAMERA"
    await showAuthTipModal(authorize, !disabled)
}


// 相册
const openAlbumAuthorize = async (disabled) => {
    let authorize = "android.permission.READ_EXTERNAL_STORAGE"
    await showAuthTipModal(authorize, !disabled)
}

// 相机 相册
const openAlbumCamaraAuthorize = async (disabled) => {
    let authorize = "android.permission.READ_EXTERNAL_STORAGE.android.permission.CAMERA"
    await showAuthTipModal(authorize, !disabled)
}


export const uniChooseImage = async (options = {}) => {

    let count = options.count || 9;
    let sizeType = options.sizeType || ['original', 'compressed'];
    let sourceType = options.sourceType || ['album', 'camera'];

    let isAlbum = sourceType.includes('album');
    let isCamera = sourceType.includes('camera');

    // #ifdef APP-PLUS
    if (isAlbum && isCamera) {
        await openAlbumCamaraAuthorize();
    } else if (isCamera) {
        await openCamaraAuthorize();
    } else if (isAlbum) {
        await openAlbumAuthorize();
    }
    // #endif


    return new Promise((resolve, reject) => {

        uni.chooseImage({
            count: count,
            sizeType: sizeType,
            sourceType: sourceType,
            success: (res) => {
                resolve(res);
            },
            fail: (fail) => {
                console.error('chooseImage', fail)
                if (fail.errMsg.startsWith('chooseImage:fail No')) {
                    if (isAlbum && isCamera) {
                        authorizeUtils('android.permission.READ_EXTERNAL_STORAGE.android.permission.CAMERA')

                    } else if (isCamera) {
                        authorizeUtils('android.permission.CAMERA')

                    } else if (isAlbum) {
                        authorizeUtils('android.permission.READ_EXTERNAL_STORAGE')
                    }

                }
                reject(fail);
            }
        });

    })
}

/**
 * 申请位置授权
 */
const openLocationAuthorize = async (disabled) => {
    let authorize = "android.permission.ACCESS_FINE_LOCATION"
    await showAuthTipModal(authorize, !disabled)
}


const hasLocation = async () => {

    try {
        await checkGPS();
        var osName = plus.os.name;
        if (osName.toLowerCase() === "android") {
            await openLocationAuthorize();
        }

    } catch (error) {
        // 错误处理
        console.error(error.message);
        uni.showModal({
            title: '错误',
            content: error.message, // 显示实际的错误信息
            showCancel: false,
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定');
                }
            }
        });
        return Promise.reject(error);
    }
};

// 获取经纬度
export const uniGetLocation = async (type) => {
    // #ifdef WEB
    console.log('web')
    // #endif

    // #ifdef APP-PLUS
    await hasLocation();
    // #endif

    return new Promise(resolve => {
        uni.getLocation({
            type: type, //wgs84 gcj02
            isHighAccuracy: true,
            geocode: false,
            success: function (res) {
                resolve(res)
            },
            fail: (fail) => {
                console.error('fail', fail);
                if (fail.errMsg.startsWith('getLocation:fail')) {
                    authorizeUtils('android.permission.ACCESS_FINE_LOCATION')

                }
            }
        })
    })
};


// 打开地图选择位置
export const uniChooseLocation = async ({latitude, longitude, keyword} = {}) => {
    // #ifdef WEB
    console.log('web')
    // #endif

    // #ifdef APP-PLUS
    await hasLocation();

    // #endif

    return new Promise(resolve => {
        uni.chooseLocation({
            latitude,
            longitude,
            keyword,
            success: function (res) {
                resolve(res);
            },
            fail: function (fail) {
                console.error('fail', fail);
            }
        });
    })
}


const startLocationUpdate = (type) => {
    return new Promise((resolve, reject) => {
        uni.startLocationUpdate({
            type:type, // wgs84 gcj02
            success(startRes) {
                resolve(startRes)
            },
            fail(fail) {
                console.error('开启接收位置消息失败：', fail)
                if (fail.errMsg.startsWith('startLocationUpdate:fail')) {
                    authorizeUtils('android.permission.ACCESS_FINE_LOCATION')

                }

                reject(fail)
            },
        });
    })
}


export const uniOnLocationChange = async (type) => {

    // #ifdef WEB
    console.log('web')
    // #endif

    // #ifdef APP-PLUS
    await hasLocation();
    // #endif

    try {
        await startLocationUpdate(type)
        uni.onLocationChange(function (res) {
            uni.$emit('onLocationChangeData', res)
        })


    } catch (e) {
        console.log(e)
    }

}

