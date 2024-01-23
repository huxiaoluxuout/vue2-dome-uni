/**
 * 权限开启检测
 * @returns {Promise<number>} 0.永久拒绝 1.临时拒绝 2.同意权限开启
 *
 */
export const checkPermission = (authorize) => {
    let permissions = [authorize]
    return new Promise((resolve) => {
        plus.android.requestPermissions(permissions,
            function (resultObj) {
                // console.log(resultObj);

                // 永久拒绝
                if (resultObj.deniedAlways.length) {
                    resolve(0)

                } else
                    // 临时拒绝
                if (resultObj.deniedPresent.length) {
                    resolve(1)

                } else
                    // 同意权限开启
                if (resultObj.granted.length) {
                    resolve(2)
                }
            }
        );
    })
}


const checkAuthorize = (authorize, resolve) => {
    checkPermission(authorize).then(res => {
        if (res === 2) {
            resolve(true)
        } else if (res === 1) {
            resolve(true)
        } else if (res === 0) {
            authorizeUtils(authorize)
            resolve(false)
        }
    })
}

/**
 * 判断GPS定位服务未是否开启
 * @returns {Promise<unknown>}
 */
export const checkGPS = () => {
    return new Promise((resolve, reject) => {
        // #ifdef WEB
        resolve(true);
        // #endif

        // #ifdef APP-PLUS
        var osName = plus.os.name;
        if (osName.toLowerCase() === "android") {
            var context = plus.android.importClass("android.content.Context");
            var locationManager = plus.android.importClass("android.location.LocationManager");
            var main = plus.android.runtimeMainActivity();
            var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
            var result = mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER);

            if (result) {
                resolve(result);
            } else {
                reject(new Error("定位服务未开启"));
            }

        } else if (osName.toLowerCase() === "ios") {
            var cllocationManger = plus.ios.import("CLLocationManager");
            var iosResult = cllocationManger.locationServicesEnabled();
            plus.ios.deleteObject(cllocationManger);

            if (iosResult) {
                resolve(iosResult);
            } else {
                reject(new Error("定位服务未开启"));
            }
        }
        // #endif

    });
}


/**
 * 授权前告知用户使用意图
 * @param authorize
 * @param disabled 1.默认 false 2. true 内部不需要申请权限，由外部申请
 * @returns {Promise<unknown>}
 */
export const showAuthTipModal = (authorize, disabled=false) => {

    // #ifdef  APP-PLUS
    const contentData = {
        ['android.permission.ACCESS_FINE_LOCATION']: {
            title: "定位权限说明",
            describe: "便于您检索附近的客户，请您确认授权，否则无法使用该功能"
        },

        ["android.permission.CALL_PHONE"]: {
            title: "拨打电话权限说明",
            describe: "便于您使用该功能拨打客服电话，联系客户。请您确认授权，否则无法使用该功能"
        },
        ["android.permission.READ_EXTERNAL_STORAGE"]: {
            title: "相册权限说明",
            describe: "便于您使用该功能上传您的照片、图片、视频，完善师傅认证信息。请您确认授权，否则无法使用该功能"
        },
        ["android.permission.CAMERA"]: {
            title: "相机权限说明",
            describe: "便于您使用该功能拍摄图片、录制视频，请您确认授权，否则无法使用该功能"
        },
        ["android.permission.READ_EXTERNAL_STORAGE.android.permission.CAMERA"]: {
            title: "相册、相机权限说明",
            describe: '相册：便于您使用该功能上传您的照片、图片、视频，完善师傅认证信息。\n相机：便于您使用该功能拍摄图片、录制视频。\n请您确认授权，否则无法使用上述功能'
        },
    }
    return new Promise((resolve, reject) => {
        let type1 = uni.getStorageSync(authorize)

        if (!type1) {
            uni.showModal({
                title: contentData[authorize].title,
                content: contentData[authorize].describe,
                confirmText: '确定使用',
                success: (res) => {

                    if (res.confirm) {
                        uni.setStorageSync(authorize, true)
                        if (disabled) {
                            resolve()
                            return
                        }
                        checkAuthorize(authorize, resolve)

                    } else if (res.cancel) {
                        if (disabled) {
                            return
                        }
                        resolve(false)
                    }
                },
                fail: (fail) => {
                    console.error(fail)
                }
            })

        } else {
            if (disabled) {
                resolve()
            } else {
                checkAuthorize(authorize, resolve)

            }


        }
    })
    // #endif


}

/**
 * 用户拒绝授权提示手动授权
 */
export const authorizeUtils = (authorize) => {
    console.log('用户拒绝授权提示手动授权', authorize)
    const contentData = {
        ['android.permission.ACCESS_FINE_LOCATION']: "获取定位权限失败，请手动打开授权或检查系统定位开关",
        ["android.permission.CALL_PHONE"]: "获取拨打电话权限失败，请手动打开授权",

        ["android.permission.READ_EXTERNAL_STORAGE"]: "获取相册权限失败，请手动打开授权",
        ["android.permission.CAMERA"]: "获取相机权限失败，请手动打开授权",
        ["android.permission.READ_EXTERNAL_STORAGE.android.permission.CAMERA"]: "获取相机或相册权限失败，请手动打开授权",
    }
    uni.showModal({
        title: '权限提示',
        content: contentData[authorize],
        confirmText: "去设置",
        success: (res) => {
            if (res.confirm) {
                uni.openAppAuthorizeSetting({
                    success(res) {
                        console.log(res);
                    }
                });
            }
            if (res.cancel) {
                console.log('用户点击取消');
            }
        }
    });
}
