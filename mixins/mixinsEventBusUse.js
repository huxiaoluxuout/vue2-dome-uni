export default {

    onLoad(options) {
        if (options.eventName) {
            let eventName = options.eventName
            let register = false
            uni.$emit(eventName, () => {
                register = true
                uni.$off(eventName, this.ylxOnHandler)
            })
            this.onEvent(register, eventName)
        }
    },
    methods: {
        onEvent(register, eventName) {
            if (register) return
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


