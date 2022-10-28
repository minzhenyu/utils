// 不支持值为undefined、函数和循环引用的情况
export function simpleDeepClone(obj) {
  const cloneObj = JSON.parse(JSON.stringify(obj));
  return cloneObj;
}

// 完整版
export function deepClone(obj, cache = new WeakMap()) {
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

// 测试
const obj = { name: "Jack", address: { x: 100, y: 200 } };
obj.a = obj; // 循环引用
const newObj = deepClone(obj);
console.log(newObj.address === obj.address); // false
