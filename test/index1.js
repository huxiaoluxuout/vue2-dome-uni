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
const createHandler = (isSuccess = true) => (errorHandler = null) => (successHandler = null) => (...args) => {
    if (isSuccess) {
        if (typeof successHandler === 'function') {
            successHandler(...args);
        }
    } else if (typeof errorHandler === 'function') {
        errorHandler(...args);
    }
};

const handleSuccess = (data) => {
    console.log('Success:', data);
};

const handleError = (error) => {
    console.log('Error:', error);
};

const handle1 = createHandler()()(handleSuccess);
handle1('handle1'); // Success: handle1

const handle2 = createHandler(true)()(handleSuccess);
handle2('handle2'); // Success: handle2

const handle3 = createHandler(false)(handleError)();
handle3('handle3'); // Error: handle3


