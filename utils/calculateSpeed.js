import Big from "@/utils/lib/big.min"

let previousLatitude, previousLongitude, previousTime

export function calculateSpeed({latitude, longitude}) {
    const currentTime = new Date().getTime();// 获取当前时间戳
    let speedKph = 0; // 初始化速度变量（公里/小时）
    if (previousLatitude && previousLongitude && previousTime) {
        const distance = calculateDistance(latitude, longitude, previousLatitude, previousLongitude); // 距离单位：公里
        const timeDiff = currentTime - previousTime; // 时间差单位：毫秒
        if (timeDiff > 0) { // 确保时间差不是0，避免除以0的情况
            let diffSpeedTime = new Big(timeDiff).div(3600000) // 时间差单位：小时
            speedKph = new Big(distance).div(diffSpeedTime) // 转换速度为公里/小时
        }
    }

// 更新上一次的位置和时间信息
    previousLatitude = latitude;
    previousLongitude = longitude;
    previousTime = currentTime;

    return {latitude, longitude, time: formatDate(currentTime), speedKph};

}


// 计算两个经纬度之间的距离
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 地球半径，单位：千米

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}


// 将角度转换为弧度
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

// 格式化时间戳
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();

    // getMonth() 返回的月份是从0开始的，所以需要加1
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    // getDate() 返回的是月份中的第几天（1-31）
    const day = date.getDate().toString().padStart(2, '0');

    // getHours() 返回的是小时（0-23）
    const hours = date.getHours().toString().padStart(2, '0');

    // getMinutes() 返回的是分钟（0-59）
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // getSeconds() 返回的是秒数（0-59）
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // 拼接所有部分，得到格式为 "YYYY-MM-DD HH:mm:ss"
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
