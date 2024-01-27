
export default {
    data() {
        return {
            name: 'render-vm'
        }
    },
    mounted() {
        this.initEcharts()
    },
    methods:{
        initEcharts() {
            console.log('000---initEcharts',this.msg)
        },
        // 接收逻辑层传递的数据
        receiveNumber(newValue, oldValue, ownerVm, vm) {
           /* console.log('newValue', newValue)
            console.log('oldValue', oldValue)
            console.log('ownerVm', ownerVm)
            console.log('vm', vm)*/
        },
        // 调用逻辑层的方法
        emitData(e, ownerVm) {
            // ownerVm.callMethod('receiveRenderData', this.name)
            this.$ownerInstance.callMethod('receiveRenderData', this.msg)
        }
    }
}
