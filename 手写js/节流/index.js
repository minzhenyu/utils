export function throttle(fn, delay = 5000) {
  let last = 0; //上次触发时间
  return function (...args) {
    const now = Date.now();
    if (now - last > delay) {
      //间隔 delay 触发一次
      last = now;
      fn.apply(this, args);
      //fn.call(this,...args)
      //fn.bind(this)(...args)
    }
  };
}

// 测试
function task() {
  console.log("run task");
}
const debounceTask = throttle(task, 1000);
window.addEventListener("scroll", debounceTask);
