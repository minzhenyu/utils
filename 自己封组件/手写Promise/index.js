const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

export class MyPromise {
  constructor(executor) {
    try {
      // 立即执行
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  // 初始状态
  state = PENDING;

  // 回调
  fulfilledCallBacks = [];
  rejectedCallBacks = [];

  // 成功
  value = null;
  // 失败
  reason = null;

  resolve = (value) => {
    if (PENDING === this.state) {
      this.state = FULFILLED;
      this.value = value;
      while (this.fulfilledCallBacks.length)
        this.fulfilledCallBacks.shift()(value);
    }
  };

  reject = (reason) => {
    if (PENDING === this.state) {
      this.state = REJECTED;
      this.reason = reason;
      while (this.rejectCallBacks.length) this.rejectCallBacks.shift()(reason);
    }
  };

  then(onFulfilled, onRejected) {
    // 如果不传，就使用默认函数
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    // 链式调用
    const promise2 = new MyPromise((resolve, reject) => {
      // 成功
      const resolveMicrotask = () => {
        // 避免循环调用
        // 这里有个问题，promise2这里其实是拿不到的，因为promise2还没有完成初始化
        // 这里需要用创建一个微任务，在微任务里面调用到的就是初始化完成的promise2。
        // 我们用 queueMicrotask 创建微任务
        queueMicrotask(() => {
          // then执行阶段错误捕获
          try {
            const x = onFulfilled(this.value);
            this.resolvePromise(x, promise2, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      };
      // 失败
      const rejectMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            this.resolvePromise(x, promise2, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      };

      if (this.state === FULFILLED) resolveMicrotask();
      else if (this.state === REJECTED) rejectMicrotask();
      else if (this.state === PENDING) {
        // 存储回调
        this.fulfilledCallBackss.push(resolveMicrotask);
        this.rejectedCallBacks.push(rejectMicrotask);
      }
    });
    return promise2;

    // if (FULFILLED === this.state) {
    //   onFulfilled(this.vlue);
    // } else if (REJECTED === this.state) {
    //   onRejected(this.reason);
    // } else if (PENDING === this.state) {
    //   this.fulfilledCallBacks.push(onFulfilled);
    //   this.fulfilledCallBacks.push(onRejected);
    // }
  }

  resolvePromise(x, self, resolve, reject) {
    // 不能返回自身（循环调用）
    if (x === self) {
      return reject(
        new TypeError("The promise and the return value are the same")
      );
    }
    // 如果返回一个Promise对象，调用其then方法
    if (x instanceof MyPromise) {
      x.then(resolve, reject);
    } else {
      // 直接返回X
      resolve(x);
    }
  }

  static resolve = (value) => {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise((resolve, rject) => {
      resolve(value);
    });
  };

  static reject = (reason) => {
    return new MyPromise((resolve, rject) => {
      rject(reason);
    });
  };

  //  TODO: All
  static all = (resolve, reject) => {
    // 全部返回都是reosolve  resolve([])
  };
  // TODO:Race
  static race = (resolve, reject) => {
    // resolve 第一个结果,其余取消
  };

  // TODO:Some
  static some = (resolve, reject) => {
    // resolve如果存在resolve 当前结果
  };
}
