//手写函数


// **********************************************
//防抖函数  场景,输入框多次触发,按钮多次发送请求

let debounce  = (fn,time=1000)=>{
    let timeLock = null
    return function(...args){
        clearTimeout(timeLock)
        setTimeout(()=>{
            fn(...args)
        },time)
    }
}

// **********************************************


// 节流函数  规定时间内只执行一次, 场景;长列表滚动,瀑布流加载
let throttle = (fn,time =100)=>{
    let flag = true
    return function(...args){
        if(flag){
            flag = false
            setTimeout(()=>{
                flag = true
                fn(...args)
            },time)
        }
    }
}


// **********************************************

// 函数柯里化  fn(a)(b)(c) 函数返回函数执行n次
// 用法
// function sumFn(a,b,c){return a+ b + c};
// let sum = curry(sumFn);
// sum(2)(3)(5)//10
// sum(2,3)(5)//10
let curry = (fn,...args)=>{
    let fnLen = fn.length, argsLen = args.length

    if(fnLen>argsLen){
        return function(...args2s){
            return curry(fn,...args,...args2s)
        }
    }else{
        return fn(...args)
    }
}


// 多参传递柯里化
// 支持多参数传递
function progressCurrying(fn, args) {
    var _this = this
    var len = fn.length;
    var args = args || [];

    return function() {
        var _args = Array.prototype.slice.call(arguments);
        Array.prototype.push.apply(args, _args);

        // 如果参数个数小于最初的fn.length，则递归调用，继续收集参数
        if (_args.length < len) {
            return progressCurrying.call(_this, fn, _args);
        }

        // 参数收集完毕，则执行fn
        return fn.apply(this, _args);
    }
}


// 柯里化 实现bind函数
Function.prototype.bind = function (context) {
    var _this = this
    var args = Array.prototype.slice.call(arguments, 1)
 
    return function() {
        return _this.apply(context, args)
    }
}


//  闭包实现每隔一秒打印 1234
for (var i=1; i<=5; i++) {
    (function (i) {
      setTimeout(() => console.log(i), 1000*i)
    })(i)
}

// **********************************************

// 观察者模式
class Subject{
    constructor(name){
      this.name = name
      this.observers = []
      this.state = 'XXXX'
    }
    // 被观察者要提供一个接受观察者的方法
    attach(observer){
      this.observers.push(observer)
    }
  
    // 改变被观察着的状态
    setState(newState){
      this.state = newState
      this.observers.forEach(o=>{
        o.update(newState)
      })
    }
  }
  
  class Observer{
    constructor(name){
      this.name = name
    }
  
    update(newState){
      console.log(`${this.name}say:${newState}`)
    }
  }
  
  // 被观察者 灯
  let sub = new Subject('灯')
  let mm = new Observer('小明')
  let jj = new Observer('小健')
   
  // 订阅 观察者
  sub.attach(mm)
  sub.attach(jj)
   
  sub.setState('灯亮了来电了')


// **********************************************

// EventEmitter 实现 vue 事件监听简版
class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(event, callback) {
        let callbacks = this.events[event] || [];
        callbacks.push(callback);
        this.events[event] = callbacks;
        return this;
    }
    off(event, callback) {
        let callbacks = this.events[event];
        this.events[event] = callbacks && callbacks.filter(fn => fn !== callback);
        return this;
    }
    emit(event, ...args) {
        let callbacks = this.events[event];
        callbacks.forEach(fn => {
            fn(...args);
        });
        return this;
    }
    once(event, callback) {
        let wrapFun = function (...args) {
            callback(...args);
            this.off(event, wrapFun);
        };
        this.on(event, wrapFun);
        return this;
    }
}

// **********************************************
// 休眠函数 sleep
// 用法
// function test() {
//     console.log('111');
//     sleep(2000);
//     console.log('222');
//   }
  
// test()
let sleep = (dely=1000)=>{
    var start = (new Date()).getTime();
  while ((new Date()).getTime() - start < delay) {
    continue;
  }
}

// **********************************************

// 多维数组扁平化 arr.flat(层数,默认一层 | Infinity)
// [1,2,3,[4,5,6]].flat(Infinity)

// flat 方法
let arr = [1,2,[3,4,[5,[6]]]]
console.log(arr.flat(Infinity))//flat参数为指定要提取嵌套数组的结构深度，默认值为 1

//用reduce实现
function fn(arr){
   return arr.reduce((prev,cur)=>{
      return prev.concat(Array.isArray(cur)?fn(cur):cur)
   },[])
}





// **********************************************
// 对象数组去重   对象数组转换为字符串数组
function objSort(obj){
    let newObj = {}
    //遍历对象，并将key进行排序
    Object.keys(obj).sort().map(key => {
        newObj[key] = obj[key]
    })
    //将排序好的数组转成字符串
    return JSON.stringify(newObj)
}
// 字符串 去重 后, 返回对象
function unique(arr){
    let set = new Set();
    for(let i=0;i<arr.length;i++){
        let str = objSort(arr[i])
        set.add(str)
    }
    //将数组中的字符串转回对象
    arr = [...set].map(item => {
        return JSON.parse(item)
    })
    return arr
}



// **********************************************


// 转化为驼峰命名
var s1 = "get-element-by-id"
// 转化为 getElementById
var f = function(s) {
    return s.replace(/-\w/g, function(x) {
        return x.slice(1).toUpperCase();
    })
}


// **********************************************



// 查找字符串中出现最多的字符和个数


let getMostString = (str = "abcabcabcbbccccc")=>{

    let count = 0;
    let char = '';
    
     // 使其按照一定的次序排列
    str = str.split('').sort().join('');
    // "aaabbbbbcccccccc"
    
    // 定义正则表达式
    let re = /(\w)\1+/g;
    str.replace(re,($0,$1) => {
        if(count < $0.length){
            count = $0.length;
            char = $1;        
        }
    });
    console.log(`字符最多的是${char}，出现了${count}次`);
    const  obj = {
            char,
            count
    }
    return obj
}



// 图片懒加载

let imgList = [...document.querySelectorAll('img')]
let length = imgList.length

const imgLazyLoad = function() {
    let count = 0
    return (function() {
        let deleteIndexList = []
        imgList.forEach((img, index) => {
            let rect = img.getBoundingClientRect()
            if (rect.top < window.innerHeight) {
                img.src = img.dataset.src
                deleteIndexList.push(index)
                count++
                if (count === length) {
                    document.removeEventListener('scroll', imgLazyLoad)
                }
            }
        })
        imgList = imgList.filter((img, index) => !deleteIndexList.includes(index))
    })()
}

// 这里最好加上防抖处理
document.addEventListener('scroll', imgLazyLoad)


// **********************************************

// 模板引擎实现
let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let data = {
  name: '姓名',
  age: 18
}
render(template, data); // 我是姓名，年龄18，性别undefined

function render(template, data) {
  const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
  if (reg.test(template)) { // 判断模板里是否有模板字符串
    const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
    template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
    return render(template, data); // 递归的渲染并返回渲染后的结构
  }
  return template; // 如果模板没有模板字符串直接返回
}



// **********************************************


// 解析 URL Params 为对象
let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
parseParam(url)
/* 结果
{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}
*/

function parseParam(url) {
  const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
  const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
  let paramsObj = {};
  // 将 params 存到对象中
  paramsArr.forEach(param => {
    if (/=/.test(param)) { // 处理有 value 的参数
      let [key, val] = param.split('='); // 分割 key 和 value
      val = decodeURIComponent(val); // 解码
      val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

      if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else { // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val;
      }
    } else { // 处理没有 value 的参数
      paramsObj[param] = true;
    }
  })

  return paramsObj;
}

// **********************************************

// 实现正则切分千分位（10000 => 10,000）

//无小数点
let num1 = '1321434322222'
num1.replace(/(\d)(?=(\d{3})+$)/g,'$1,')
//有小数点
let num2 = '342243242322.3432423'
num2.replace(/(\d)(?=(\d{3})+\.)/g,'$1,')





// **********************************************

// 通用的事件侦听器函数
const EventUtils = {
    // 视能力分别使用dom0||dom2||IE方式 来绑定事件
    // 添加事件
    addEvent: function(element, type, handler) {
      if (element.addEventListener) {
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
      } else {
        element["on" + type] = handler;
      }
    },
    // 移除事件
    removeEvent: function(element, type, handler) {
      if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
      } else if (element.detachEvent) {
        element.detachEvent("on" + type, handler);
      } else {
        element["on" + type] = null;
      }
    },
   // 获取事件目标
    getTarget: function(event) {
      return event.target || event.srcElement;
    },
    // 获取 event 对象的引用，取到事件的所有信息，确保随时能使用 event
    getEvent: function(event) {
      return event || window.event;
    },
   // 阻止事件（主要是事件冒泡，因为 IE 不支持事件捕获）
    stopPropagation: function(event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    },
    // 取消事件的默认行为
    preventDefault: function(event) {
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    }
  };


// **********************************************


//   随机排序函数

let arr = [2,3,454,34,324,32]
arr.sort(randomSort)
function randomSort(a, b) {
  return Math.random() > 0.5 ? -1 : 1;
}


// **********************************************

// 手写一个 jsonp
const jsonp = function (url, data) {
    return new Promise((resolve, reject) => {
        // 初始化url
        let dataString = url.indexOf('?') === -1 ? '?' : ''
        let callbackName = `jsonpCB_${Date.now()}`
        url += `${dataString}callback=${callbackName}`
        if (data) {
            // 有请求参数，依次添加到url
            for (let k in data) {
                url += `${k}=${data[k]}`
            }
        }
        let jsNode = document.createElement('script')
        jsNode.src = url
        // 触发callback，触发后删除js标签和绑定在window上的callback
        window[callbackName] = result => {
            delete window[callbackName]
            document.body.removeChild(jsNode)
            if (result) {
                resolve(result)
            } else {
                reject('没有返回数据')
            }
        }
        // js加载异常的情况
        jsNode.addEventListener('error', () => {
            delete window[callbackName]
            document.body.removeChild(jsNode)
            reject('JavaScript资源加载失败')
        }, false)
        // 添加js节点到document上时，开始请求
        document.body.appendChild(jsNode)
    })
}
jsonp('http://192.168.0.103:8081/jsonp', {
    a: 1,
    b: 'heiheihei'
})
.then(result => {
    console.log(result)
})
.catch(err => {
    console.error(err)
})



// **********************************************



// 深拷贝（deepclone）
// 判断类型，正则和日期直接返回新对象
// 空或者非对象类型，直接返回原值
// 考虑循环引用，判断如果hash中含有直接返回hash中的值
// 新建一个相应的new obj.constructor加入hash
// 遍历对象递归（普通key和key是symbol情况）
function deepClone(obj,hash = new WeakMap()){
    if(obj instanceof RegExp) return new RegExp(obj);
    if(obj instanceof Date) return new Date(obj);
    if(obj === null || typeof obj !== 'object') return obj;
    //循环引用的情况
    if(hash.has(obj)){
        return hash.get(obj)
    }
    //new 一个相应的对象
    //obj为Array，相当于new Array()
    //obj为Object，相当于new Object()
    let constr = new obj.constructor();
    hash.set(obj,constr);
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            constr[key] = deepClone(obj[key],hash)
        }
    }
    //考虑symbol的情况
    let symbolObj = Object.getOwnPropertySymbols(obj)
    for(let i=0;i<symbolObj.length;i++){
        if(obj.hasOwnProperty(symbolObj[i])){
            constr[symbolObj[i]] = deepClone(obj[symbolObj[i]],hash)
        }
    }
    return constr
}




// **********************************************

// ajax 实现
function ajax(url,method,body,headers){
    return new Promise((resolve,reject)=>{
        let req = new XMLHttpRequest();
        req.open(methods,url);
        for(let key in headers){
            req.setRequestHeader(key,headers[key])
        }
        req.onreadystatechange(()=>{
            if(req.readystate == 4){
                if(req.status >= '200' && req.status <= 300){
                    resolve(req.responeText)
                }else{
                    reject(req)
                }
            }
        })
        req.send(body)
    })
}



// **********************************************

// Promise的实现
// 实现 Promise 需要完全读懂 Promise A+ 规范，不过从总体的实现上看，有如下几个点需要考虑到：

// Promise本质是一个状态机，且状态只能为以下三种：Pending（等待态）、Fulfilled（执行态）、Rejected（拒绝态），状态的变更是单向的，只能从Pending -> Fulfilled 或 Pending -> Rejected，状态变更不可逆
// then 需要支持链式调用
class Promise {
    callbacks = [];
    state = 'pending';//增加状态
    value = null;//保存结果
    constructor(fn) {
        fn(this._resolve.bind(this), this._reject.bind(this));
    }
    then(onFulfilled, onRejected) {
        return new Promise((resolve, reject) => {
            this._handle({
                onFulfilled: onFulfilled || null,
                onRejected: onRejected || null,
                resolve: resolve,
                reject: reject
            });
        });
    }
    _handle(callback) {
        if (this.state === 'pending') {
            this.callbacks.push(callback);
            return;
        }
 
        let cb = this.state === 'fulfilled' ? callback.onFulfilled : callback.onRejected;
 
        if (!cb) {//如果then中没有传递任何东西
            cb = this.state === 'fulfilled' ? callback.resolve : callback.reject;
            cb(this.value);
            return;
        }
 
        let ret = cb(this.value);
        cb = this.state === 'fulfilled' ? callback.resolve : callback.reject;
        cb(ret);
    }
    _resolve(value) {
 
        if (value && (typeof value === 'object' || typeof value === 'function')) {
            var then = value.then;
            if (typeof then === 'function') {
                then.call(value, this._resolve.bind(this), this._reject.bind(this));
                return;
            }
        }
 
        this.state = 'fulfilled';//改变状态
        this.value = value;//保存结果
        this.callbacks.forEach(callback => this._handle(callback));
    }
    _reject(error) {
        this.state = 'rejected';
        this.value = error;
        this.callbacks.forEach(callback => this._handle(callback));
    }
}
// Promise.resolve
// Promsie.resolve(value) 可以将任何值转成值为 value 状态是 fulfilled 的 Promise，但如果传入的值本身是 Promise 则会原样返回它。
Promise.resolve=(value) =>{
  if (value && value instanceof Promise) {
    return value;
  } else if (value && typeof value === 'object' && typeof value.then === 'function') {
    let then = value.then;
    return new Promise(resolve => {
      then(resolve);
    });
  } else if (value) {
    return new Promise(resolve => resolve(value));
  } else {
    return new Promise(resolve => resolve());
  }
}
// Promise.reject
// 和 Promise.resolve() 类似，Promise.reject() 会实例化一个 rejected 状态的 Promise。但与 Promise.resolve() 不同的是，如果给 Promise.reject() 传递一个 Promise 对象，则这个对象会成为新 Promise 的值。
Promise.reject = function(reason) {
    return new Promise((resolve, reject) => reject(reason))
}
// Promise.all
// 传入的所有 Promsie 都是 fulfilled，则返回由他们的值组成的，状态为 fulfilled 的新 Promise；
// 只要有一个 Promise 是 rejected，则返回 rejected 状态的新 Promsie，且它的值是第一个 rejected 的 Promise 的值；
// 只要有一个 Promise 是 pending，则返回一个 pending 状态的新 Promise；
Promise.all = function(promiseArr) {
    let index = 0, result = []
    return new Promise((resolve, reject) => {
        promiseArr.forEach((p, i) => {
            Promise.resolve(p).then(val => {
                index++
                result[i] = val
                if (index === promiseArr.length) {
                    resolve(result)
                }
            }, err => {
                reject(err)
            })
        })
    })
}
// Promise.race
// Promise.race 会返回一个由所有可迭代实例中第一个 fulfilled 或 rejected 的实例包装后的新实例。
Promise.race = function(promiseArr) {
    return new Promise((resolve, reject) => {
        promiseArr.forEach(p => {
            Promise.resolve(p).then(val => {
                resolve(val)
            }, err => {
                rejecte(err)
            })
        })
    })
}




// *************************************************
// 手写 bind 函数
// bind 函数的实现步骤：

// 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
// 保存当前函数的引用，获取其余传入参数值。
// 创建一个函数返回
// 函数内部使用 apply 来绑定函数调用，需要判断函数作为构造函数的情况，这个时候需要传入当前函数的 this 给 apply 调用，其余情况都传入指定的上下文对象。
// bind 函数实现
Function.prototype.myBind = function(context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  // 获取参数
  var args = [...arguments].slice(1),
      fn = this;
  return function Fn() {
    // 根据调用方式，传入不同绑定值
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat(...arguments)
    );
  };
};



// *********************************************
// 手写类型判断函数
function getType(value) {
  // 判断数据是 null 的情况
  if (value === null) {
    return value + "";
  }
  // 判断数据是引用类型的情况
  if (typeof value === "object") {
    let valueClass = Object.prototype.toString.call(value),
      type = valueClass.split(" ")[1].split("");
    type.pop();
    return type.join("").toLowerCase();
  } else {
    // 判断数据是基本数据类型的情况和函数的情况
    return typeof value;
  }
}



// new的实现
// 一个继承自 Foo.prototype 的新对象被创建。
// 使用指定的参数调用构造函数 Foo，并将 this 绑定到新创建的对象。new Foo 等同于 new Foo()，也就是没有指定参数列表，Foo 不带任何参数调用的情况。
// 由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤1创建的对象。
// 一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤
function Ctor(){
    // ....

}

function myNew(ctor,...args){
    if(typeof ctor !== 'function'){
      throw 'myNew function the first param must be a function';
    }
    var newObj = Object.create(ctor.prototype); //创建一个继承自ctor.prototype的新对象
    var ctorReturnResult = ctor.apply(newObj, args); //将构造函数ctor的this绑定到newObj中
    var isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null;
    var isFunction = typeof ctorReturnResult === 'function';
    if(isObject || isFunction){
        return ctorReturnResult;
    }
    return newObj;
}

let c = myNew(Ctor);










// ****************************************


// 寄生式组合继承
function Person(obj) {
    this.name = obj.name
    this.age = obj.age
}
Person.prototype.add = function(value){
    console.log(value)
}
var p1 = new Person({name:"番茄", age: 18})

function Person1(obj) {
    Person.call(this, obj)
    this.sex = obj.sex
}
// 这一步是继承的关键
Person1.prototype = Object.create(Person.prototype);
Person1.prototype.constructor = Person1;

Person1.prototype.play = function(value){
    console.log(value)
}
var p2 = new Person1({name:"鸡蛋", age: 118, sex: "男"})


// ****************************************



// ES6继承
//class 相当于es5中构造函数
//class中定义方法时，前后不能加function，全部定义在class的protopyte属性中
//class中定义的所有方法是不可枚举的
//class中只能定义方法，不能定义对象，变量等
//class和方法内默认都是严格模式
//es5中constructor为隐式属性
class People{
  constructor(name='wang',age='27'){
    this.name = name;
    this.age = age;
  }
  eat(){
    console.log(`${this.name} ${this.age} eat food`)
  }
}
//继承父类
class Woman extends People{ 
   constructor(name = 'ren',age = '27'){ 
     //继承父类属性
     super(name, age); 
   } 
    eat(){ 
     //继承父类方法
      super.eat() 
    } 
} 
let wonmanObj=new Woman('xiaoxiami'); 
wonmanObj.eat();

//es5继承先创建子类的实例对象，然后再将父类的方法添加到this上（Parent.apply(this)）。 
//es6继承是使用关键字super先创建父类的实例对象this，最后在子类class中修改this。

export {
    debounce,
    throttle,
    curry,
    progressCurrying,
    EventEmitter,
    sleep,
    getMostString

}