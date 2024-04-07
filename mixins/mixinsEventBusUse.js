export default {

    onLoad(options) {
        if (options.eventName) {
            let eventName = options.eventName
            let hasRegistered = false
            uni.$emit(eventName, () => {
                hasRegistered = true
                uni.$off(eventName, this.ylxOnHandler)
            })
            this.onEvent(hasRegistered, eventName)
        }
    },

    methods: {
        onEvent(hasRegistered, eventName) {
            if (hasRegistered) return
            uni.$on(eventName, this.ylxOnHandler)
            uni.$emit('GlobEvent' + eventName)
        },
        ylxOnHandler(handler) {
            if (typeof handler === 'function') {
                handler((callbackPrams) => {
                    console.log('A1', callbackPrams)
                })
            } else {
                console.log(handler)

            }

        },
    },


}


