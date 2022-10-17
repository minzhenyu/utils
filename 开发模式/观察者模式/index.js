// 怎么理解发布订阅者和观察者的区别呢 ？

// 发布订阅者模式只有一个中间者，好像啥事情都需要它亲自来做。
// 而且仔细观察的话，发布订阅者模式会存在一个事件名和事件的对应关系，今天可以发布天气预报，只有订阅了天气预报的才会被通知，
// 订阅了 KFC疯狂星期四闹钟事件 的不会被提醒。

// 而观察者模式，等被观察者发出了一点动静（执行notify），所有观察者都会被通知。

// 需要被观察者主动触发

// Observerd
// 1存贮观察者
// 2新增观察者
// 3触发观察者更新 (循环触发观察者update)

// Observer
// 1定义更新后要触发事件
// 2更新定义更新方法 update=>{触发初始化定义事件}

//被观察者 存贮 观察者
class Observerd {
  constructor() {
    // 我要看看到底有多少人在观察俺
    this.observerList = [];
  }
  // 新增观察者
  addObserver(observer) {
    // 添加一个观察俺的人
    this.observerList.push(observer);
  }
  // 删除观察者
  delObserver(name) {
    this.observerList = this.observerList.filter((observer) => {
      return observer.name != name;
    });
  }
  // 触发观察者
  notify() {
    // 我要闹点动静，所有观察者都会知道这个信息，具体怎么做就是他们自己的事情了
    this.observerList.forEach((observer) => observer.update());
  }
}

//
class Observer {
  constructor(name, doSome) {
    // 用于识别删除
    this.name = name;
    // 观察到小白鼠有动静之后，观察者做的事情
    this.doSome = doSome;
  }
  // 更新 触发自身方法
  update() {
    console.log(this.doSome);
  }
}

const ob1 = new Observer(
  "test1",
  "我是ob1，我观察到小白鼠有反应了，太饿了，我得去吃个饭了"
);
const ob2 = new Observer(
  "test2",
  "我是ob2，我观察到小白鼠有反应了，我要继续工作！"
);
const obs = [ob1, ob2];
const xiaoBaiShu = new Observerd();
obs.forEach((item) => {
  xiaoBaiShu.addObserver(item);
});
xiaoBaiShu.notify(); //主动触发更新
// 删除后触发
xiaoBaiShu.delObserver("test2");
xiaoBaiShu.notify(); //主动触发更新
