// NO 永远返回 false 的函数
const NO = () => false;
// NOOP 空函数
const NOOP = () => {};
// EMPTY_ARR 空数组
const EMPTY_ARR = __DEV__ ? Object.freeze([]) : [];

//  EMPTY_OBJ 空对象

const EMPTY_OBJ = __DEV__ ? Object.freeze({}) : {};
