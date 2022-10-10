const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

// 除了利用 JSON 的 API，还有更新的深拷贝对象的 structuredClone API，但并不是在所有的浏览器中都支持。
structuredClone(obj);
