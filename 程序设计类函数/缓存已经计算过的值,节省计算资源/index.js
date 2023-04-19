// 缓存结算结果
// 斐波那契函数可用,计算过的值可以快速出结果,节省计算资源

export const Memorize = function (func) {
  let cache = new Map();

  return function () {
    const key = JSON.stringify(arguments);
    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func.apply(this, arguments);
    cache.set(key, result);
    return result;
  };
};

// 使用
// const fibonacci = (n) => {
//   if (n < 2) {
//     return 1;
//   }
//   return fibonacci(n - 1) + fibonacci(n - 2);
// };

// const MemorizeFibonacci = Memorize(fibonacci);

// console.time("10");
// MemorizeFibonacci(10);
// console.timeEnd("10");

// console.time("20");
// MemorizeFibonacci(20);
// console.timeEnd("20");

// console.time("30");
// MemorizeFibonacci(30);
// console.timeEnd("30");

// console.time("30");
// MemorizeFibonacci(30);
// console.timeEnd("30");

export const memoize = function (fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
};

// 用法
// const add = (x,y)=>{
//     return x+y
// }
// const memoizeAdd = memoize(add)

// console.time('1')
// memoizeAdd(1,3)
// console.timeEnd('1')

// console.time('2')
// memoizeAdd(1,3)
// console.timeEnd('2')
