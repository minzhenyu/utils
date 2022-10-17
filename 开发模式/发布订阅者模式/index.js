// 怎么理解发布订阅者和观察者的区别呢 ？

// 发布订阅者模式只有一个中间者，好像啥事情都需要它亲自来做。
// 而且仔细观察的话，发布订阅者模式会存在一个事件名和事件的对应关系，今天可以发布天气预报，只有订阅了天气预报的才会被通知，
// 订阅了 KFC疯狂星期四闹钟事件 的不会被提醒。

// 而观察者模式，等被观察者发出了一点动静（执行notify），所有观察者都会被通知。

// 观察者模式的对象化，多个观察者模式

/* 
     一个消息队列 {abc:[fn1,fn2,fn3]}
     向消息队列中添加内容 $on
     删除消息队列中的内容 $off
     触发消息队列里面的内容 $emit 
     */
class Observe {
  constructor() {
    this.message = {};
  }
  $on(type, fn) {
    this.message[type]
      ? this.message[type].push(fn)
      : (this.message[type] = [fn]);
  }
  $off(type, fn) {
    if (!this.message[type]) return;
    if (!fn) {
      this.message[type] = undefined;
    } else {
      this.message[type] = this.message[type].filter((el) => el != fn);
    }
  }
  $emit(type, ...args) {
    if (!this.message[type]) return;
    this.message[type].forEach((el) => {
      el(...args);
    });
  }
}
const person1 = new Observe();

function handler1() {
  console.log("handler1");
}
function handler2() {
  console.log("handler2");
}
person1.$on("abc", handler1);
person1.$on("abc", handler2);
person1.$emit("abc");
console.log(person1);

// map方式
class ObserveMap {
  constructor() {
    this.message = new Map();
  }
  $on(type, fn) {
    this.message.has(type)
      ? this.message.get(type).push(fn)
      : this.message.set(type, [fn]);
  }
  $off(type, fn) {
    if (!this.message.has(type)) return;
    if (!fn) {
      // 不传方法默认删除全部该类型
      this.message.delete(type);
    } else {
      // 筛选剩余fn
      const filterMessage = this.message.get(type).filter((el) => el != fn);
      this.message.set(type, filterMessage);
    }
  }
  $emit(type, ...args) {
    if (!this.message.has(type)) return;
    this.message.get(type).forEach((el) => {
      el(...args);
    });
  }
}

const personMap = new ObserveMap();

function handlerMap1() {
  console.log("handlerMap1");
}
function handlerMap2() {
  console.log("handlerMap2");
}
personMap.$on("abc", handlerMap1);
personMap.$on("abc", handlerMap2);
personMap.$emit("abc");
console.log(personMap);
