export default {
    data() {
        return {
            eventBusName: '',
            eventBusEmit: '',
        }
    },
    onLoad: function () {
        const { eventBusName, eventBusEmit } = this;
        if (typeof eventBusName === 'string' && typeof eventBusEmit === 'string' && eventBusName && eventBusEmit) {
            // 页面第一次打开
            uni.$emit('getAPP', this[eventBusEmit])
            // 页面已经打开
            uni.$on(eventBusName, this[eventBusEmit])
        }
    },
}
