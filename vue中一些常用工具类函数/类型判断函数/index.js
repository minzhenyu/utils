const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const toTypeString = (value) => Object.prototype.toString.call(value);
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isDate = (val) => toTypeString(val) === "[object Date]";
const isPlainObject = (val) =>
  Object.prototype.toString.call(val) === "[object Object]"; // isPlainObject 判断是不是普通对象（排除正则、数组、日期、new Boolean、new Number、new String 这些特殊的对象）
isObject([]); // trueisPlainObject([]) // false
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

// isPrimitive 是否为原始数据类型
function isPrimitive(value) {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "symbol" ||
    typeof value === "boolean"
  );
}

export {
  isArray,
  isFunction,
  isString,
  isSymbol,
  isObject,
  toTypeString,
  isMap,
  isSet,
  isDate,
  isPlainObject,
  isPromise,
};
