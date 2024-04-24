import {request} from '@/network/request'

export const getLogin = (data) => request({url: '/index/api/login', method: 'post', data});



export const getMineOrderList = (data) => request({url: '/feiying/api.order/getMineOrderList', method: 'post', data});


// 视频列表
export const fetchVideoList= (data) => request({url: '/common/api.video/videolist', method: 'post', data})
