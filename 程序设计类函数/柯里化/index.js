// 使用 Curry 函数有几个好处：

// 它有助于避免多次使用同一个变量

// 它使代码更具可读性

// 它将函数划分为多个较小的函数，符合单一职责

const curry = function (func, len = func.length) {
  return function curried(...args) {
    if (args.length >= len) return func(...args);

    return function (...moreArgs) {
      return curried(...args, ...moreArgs);
    };
  };
};
