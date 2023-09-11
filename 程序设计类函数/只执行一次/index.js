// 可用于初始化只执行一次,按钮只能执行一次
export const Onece = function (func) {
  let run = false;
  let result;
  return function () {
    if (run) return result;
    result = func.apply(this, arguments);
    run = true;
    return result;
  };
};
