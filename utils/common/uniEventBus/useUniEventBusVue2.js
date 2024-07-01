import instanceUniEventBus from "@/utils/common/uniEventBus/instanceUniEventBus";

export default {
    data() {
        return {
            currentEventName: '',
        }
    },
    onLoad: function () {
        instanceUniEventBus.setCurrentPageEvent().then(currentEventName => {
            this.currentEventName = currentEventName
        })
    },
    onUnload() {
        uni.$off(this.currentEventName)
    },
}

