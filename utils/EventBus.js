export class EventBus {
    #listeners; // 使用私有字段存储监听器

    constructor() {
        this.#listeners = {};
    }

    on(event, callback) {
        if (typeof callback !== 'function') {
            throw new TypeError('Callback must be a function'); // 确保回调是函数
        }
        if (!this.#listeners[event]) {
            this.#listeners[event] = [];
        }
        this.#listeners[event].push({ callback, once: false });
    }

    once(event, callback) {
        if (typeof callback !== 'function') {
            throw new TypeError('Callback must be a function'); // 确保回调是函数
        }
        if (!this.#listeners[event]) {
            this.#listeners[event] = [];
        }
        this.#listeners[event].push({ callback, once: true });
    }

    off(event, callback) {
        if (!this.#listeners[event]) {
            return;
        }
        this.#listeners[event] = this.#listeners[event].filter(listener => listener.callback !== callback);
    }

    emit(event, ...args) {
        if (!this.#listeners[event]) {
            return;
        }
        this.#listeners[event].forEach((listener, index) => {
            listener.callback(...args);
            if (listener.once) {
                this.#listeners[event].splice(index, 1); // 立即移除，防潜在内存泄漏
            }
        });
    }
}
