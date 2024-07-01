import instanceUniEventBus from "@/utils/common/uniEventBus/instanceUniEventBus";

import {onUnmounted, ref} from 'vue';

export function instanceUniEventBusMixins(callback) {
    const currentEventName = ref('')
    instanceUniEventBus.setCurrentPageEvent().then(res => {
        currentEventName.value = res
        callback()
    })
    onUnmounted(() => {
        instanceUniEventBus.removeCurrentEvent(currentEventName.value)
    })
}

