/**
 * [description]
 * @param  {Function} fn    实际要执行的函数
 * @param  {Number}   delay 延迟事件，单位是毫秒
 * @return {Function}       返回一个‘debounce’的函数
 */
const throttle = function (fn, delay) {
  // 定时器，用来 setTimeout
  let timer = null;

  // 返回一个函数，这个函数会在一个事件区间结束后 delay 毫秒时执行 fn 函数
  return function (...args) {
    const context = this;
    // clearTimeout(timer);
    // console.log(args[]);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};
export default throttle;
