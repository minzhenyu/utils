export class MyPromise {
  constructor(executor) {
    this.status = "pending"; // 初始状态为等待
    this.value = null; // 成功的值
    this.reason = null; // 失败的原因
    this.onFulfilledCallbacks = []; // 成功的回调函数数组
    this.onRejectedCallbacks = []; // 失败的回调函数数组
    let resolve = (value) => {
      if (this.status === "pending") {
        this.status = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn(value)); // 调用成功的回调函数
      }
    };
    let reject = (reason) => {
      if (this.status === "pending") {
        this.status = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn(reason)); // 调用失败的回调函数
      }
    };
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.status === "fulfilled") {
        setTimeout(() => {
          const x = onFulfilled(this.value);
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        });
      }
      if (this.status === "rejected") {
        setTimeout(() => {
          const x = onRejected(this.reason);
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        });
      }
      if (this.status === "pending") {
        this.onFulfilledCallbacks.push(() => {
          // 将成功的回调函数放入成功数组
          setTimeout(() => {
            const x = onFulfilled(this.value);
            x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
          });
        });
        this.onRejectedCallbacks.push(() => {
          // 将失败的回调函数放入失败数组
          setTimeout(() => {
            const x = onRejected(this.reason);
            x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
          });
        });
      }
    });
  }
  // TODO:all,race
}

// 测试
function p1() {
  return new MyPromise((resolve, reject) => {
    setTimeout(resolve, 1000, 1);
  });
}
function p2() {
  return new MyPromise((resolve, reject) => {
    setTimeout(resolve, 1000, 2);
  });
}
p1()
  .then((res) => {
    console.log(res); // 1
    return p2();
  })
  .then((ret) => {
    console.log(ret); // 2
  });
