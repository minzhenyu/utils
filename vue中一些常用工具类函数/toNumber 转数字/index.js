const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};

// toNumber('111');
// 111
//toNumber('a111');
// 'a111'
// toNumber('11a11');
// '11'
// toNumber(NaN);
// NaN
// isNaN vs Number.isNaN
// isNaN 判断是不是数字 is Not a Number
// Number.isNaN 判断是不是 NaNisNaN(NaN);
// trueisNaN('a');
// trueNumber.isNaN(NaN);
// trueNumber.isNaN('a');
// false
// Number.isNaN 的 polyfillif (!Number.isNaN) {    Number.isNaN = function (n) {
// 方法一        return (window.isNaN(n) && typeof n === 'number');
// 方法二 利用只有 NaN 不跟自己相等的特性        return n !== n;
//   };
// }
