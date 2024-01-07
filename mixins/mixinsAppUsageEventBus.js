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
            uni.$emit('getAPP', this[eventBusEmit])
            uni.$on(eventBusName, this[eventBusEmit])
        }
    },
}
