// 可用于初始化只执行一次,按钮只能执行一次
export const Onece = function (func) {
  let ran = false;
  let result;
  return function () {
    if (ran) return result;
    result = func.apply(this, arguments);
    ran = true;
    return result;
  };
};
