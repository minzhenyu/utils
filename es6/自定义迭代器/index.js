let obj = { a: "hello", b: "world" };
// 自定义迭代器
function createIterator(items) {
  let keyArr = Object.keys(items);
  let i = 0;
  return {
    next: function () {
      let done = i >= keyArr.length;
      let value = !done ? items[keyArr[i++]] : undefined;
      return {
        value: value,
        done: done,
      };
    },
  };
}

let iterator = createIterator(obj);
console.log(iterator.next()); // "{ value: 'hello', done: false }"
console.log(iterator.next()); // "{ value: 'world', done: false }"
console.log(iterator.next()); // "{ value: undefined, done: true }"

export { createIterator };
