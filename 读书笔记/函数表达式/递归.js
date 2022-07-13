//通常写法
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}

//报错情况
const a = factorial;

factorial = null;
// 此时 调用a 报错

// 完美写法 防止上述报错
const factorial = function f(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * f(num - 1);
  }
};
