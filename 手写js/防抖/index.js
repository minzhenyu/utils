export function deounce(fn, delay = 5000) {
  let timer;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      //fn.call(this,...args)
      //fn.bind(this)(...args)
    }, delay);
  };
}

// 使用// 测试 https://juejin.cn/post/7031322059414175774
function task() {
  console.log("run task");
}
const debounceTask = debounce(task, 1000);
window.addEventListener("scroll", debounceTask);
