export default function useDoQueue() {
    let funcList = [];
    let addFuncList = [];

    const invokeAllFn = function () {
        const allHandlers = addFuncList.concat(funcList);
        while (allHandlers.length > 0) {
            const {func, args} = allHandlers.pop();
            func(...args);
        }
    };

    const setFunction = (func, ...args) => {
        funcList = [{func, args}];
    };

    //  方法2:  在添加前检查是否重复
    const addFunctionsCheckDuplicate = (func, ...args) => {
        const isDuplicate = addFuncList.some(item => item.func === func && item.args.length === args.length);
        if (!isDuplicate) {
            addFuncList.push({func, args});
        }
    };


    return {
        addFunctions: addFunctionsCheckDuplicate,
        setFunction,
        invokeAllFn,
    };
}
