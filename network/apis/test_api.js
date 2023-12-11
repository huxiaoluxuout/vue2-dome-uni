import {request} from '@/network/request'

export const getMineOrderList = (data) => request({url: '/feiying/api.order/getMineOrderList', method: 'post', data});


