//防止快速点击多次触发
export const Debounce = function (func, delay) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};

//一段时间内只触发一次,防止资源消耗过高
export const Throttle = function (func, delay) {
  let await = false;
  return (...args) => {
    if (await) {
      return;
    }
    func(...args);
    await = true;
    setTimeout(() => {
      await = false;
    }, delay);
  };
};
