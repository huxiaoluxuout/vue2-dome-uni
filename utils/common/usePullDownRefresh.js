
import {onPullDownRefresh} from "@dcloudio/uni-app";


const updateUserInfo =  () => {

    uni.stopPullDownRefresh();

}

export default function (){
    onPullDownRefresh(updateUserInfo)

}
