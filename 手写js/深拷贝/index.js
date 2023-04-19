// 不支持值为undefined、函数和循环引用的情况
function simpleDeepClone(obj) {
  const cloneObj = JSON.parse(JSON.stringify(obj));
  return cloneObj;
}

// 完整版
function deepClone(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (cache.has(obj)) return cache.get(obj); //循环引用返回缓存对象 防止递归进入死循环
  let cloneObj = new obj.constructor();
  cache.set(obj, cloneObj); //缓存对象,用于循环引用情况
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], cache);
    }
  }

  return cloneObj;
}

// 新版
const isObj = (val) => typeof val === "object" && val !== null;
const deepClone1 = (obj) => {
  // 1. 准备你想返回的变量（新地址）。
  const newObj = obj instanceof Array ? [] : {}; // 核心代码。

  // 2. 做拷贝；简单数据类型只需要赋值，如果遇到复杂数据类型就再次进入进行深拷贝，直到所找到的数据为简单数据类型为止。
  for (const key in obj) {
    const item = obj[key];
    newObj[key] = isObj(item) ? deepClone1(item) : item;
  }

  // 3. 返回拷贝的变量。
  return newObj;

  // const newObj = obj instanceof Array ? [] : {};
  for (const key in obj) {
    const item = obj[key];
    newObj[key] = isObj(item) ? deepClone1(item) : item;
  }
  return newObj;
};

const deepClone2 = (obj, map = new WeakMap()) => {
  if (isObj(obj)) {
    let target = Array.isArray(obj) ? [] : {};
    if (map.has(obj)) {
      return map.get(obj);
    }
    map.set(obj, target);
    Reflect.ownKeys(obj).forEach((item) => {
      target[item] = isObj(obj[item]) ? deepClone2(obj[item], map) : obj[item];
    });
    return target;
  } else {
    return obj;
  }
};

// 测试
const obj = { name: "Jack", address: { x: 100, y: 200 } };
obj.a = obj; // 循环引用
const newObj = deepClone(obj);
console.log(newObj.address === obj.address); // false

const newObj1 = deepClone1(obj);
console.log(newObj1.address === obj.address);

const newObj2 = deepClone2(obj);
console.log(newObj2.address === obj.address);
