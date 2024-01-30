export const getCID = () => {
    // #ifdef APP-PLUS
    uni.getPushClientId({
        success(res) {
            console.log('getPushClientId',res.cid);
        },
        fail(err) {
            console.log(err)
        }
    })


    // #endif

}
