const hasChanged = (value, oldValue) =>
  value !== oldValue && (value === value || oldValue === oldValue);
// 示例 hasChanged(1, 1); // falsehasChanged(1, 2); // truehasChanged(+0, -0); // falsehasChanged(NaN, NaN); // false// 场景：watch 监测值是不是变化了// 扩展 Object.is & ===Object.is(+0, -0); // false           Object.is(NaN, NaN); // true+0 === -0 // trueNaN === NaN // fals
