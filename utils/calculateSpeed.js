

export function calculateSpeed() {
    let previousLatitude = null, previousLongitude = null, previousTime = null;

    let totalDistance = 0, totalTime = 0, speed = 0, averageSpeed = 0;
    let num = 0

    return function calcSpeed(latitude, longitude) {
        num++;

        const currentTime = new Date().getTime();
        if (previousLatitude !== null && previousLongitude !== null && previousTime !== null) {

            const distance = calculateDistance(latitude, longitude, previousLatitude, previousLongitude);
            const timeDiff = (currentTime - previousTime) / 1000;
            // 相差几分钟
            const diffM = timeDiff / 60;
            // 相差几小时
            const diffH = diffM / 60;
            speed = distance / diffH;
            totalTime += diffH;

            console.log(`距离: ${distance} km, 间隔: ${timeDiff} s, 时速: ${speed} km/h`);

            totalDistance += distance;
            averageSpeed = totalDistance / totalTime;
            console.log(`总距离: ${totalDistance} km, 平均速度: ${averageSpeed} km/h, 总时长: ${totalTime} h`);

            previousLatitude = latitude;
            previousLongitude = longitude;
            previousTime = currentTime;


        } else {
            totalTime = 0;
            console.log(`初始位置集。未检测到移动.`);
            previousLatitude = latitude;
            previousLongitude = longitude;
            previousTime = currentTime;
        }


        return {
            totalDistance,
            averageSpeed,
            speedKph: speed,
            totalTime: totalTime * 60 * 60
        };
    }


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
