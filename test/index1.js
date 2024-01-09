/*
const handlerEvent = (isPass = true) => (errorHandle) => (handler) => (...args) => {
    if (isPass) {
        if (typeof handler === 'function') {
            handler(...args);
        }
    } else if (typeof errorHandle === 'function') {
        errorHandle(...args);
    }
};

const passCallback = (e) => {
    console.log('passCallback', e);
};

const errCallback = (e) => {
    console.log('errCallback', e);
};

const handle1 = handlerEvent()()(passCallback);
handle1('handle1'); // passCallback handle1

const handle2 = handlerEvent(true)()(passCallback);
handle2('handle2'); // passCallback handle2

const handle3 = handlerEvent(false)(passCallback)(errCallback);
handle3('handle3'); // errCallback handle3


*/

console.log(3%3)
console.log(4%3)
console.log(5%3)
console.log(6%3)
console.log(7%3)
