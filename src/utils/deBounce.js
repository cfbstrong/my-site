export default function(fn, delay = 100){
    //函数防抖
    //防止事件频发触发，以最后一次为准
    let timerId;
    return (...args)=>{
        clearTimeout(timerId)
        timerId = setTimeout(()=>{
            fn(...args)
        }, delay)
    }
}
