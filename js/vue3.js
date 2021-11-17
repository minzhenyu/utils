//缩写 vue3  发布模式  代理模式
//参考地址原理: https://mp.weixin.qq.com/s/0oUkdqj9jE9IEQic8QrfyA

let activeEffect

class Dep {
  subscribers = new Set()

  constructor(value) {
    this._value = value
  }

  get value() {
    this.depend()
    return this._value
  }

  set value(value) {
    this._value = value
    this.notify()
  }

  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect)
    }
  }

  notify() {
    this.subscribers.forEach((effect) => {
      effect()
    })
  }
}

function watchEffect(effect) {
  activeEffect = effect
  effect()
  activeEffect = null
}

// proxy version
const reactiveHandlers = {
  get(target, key) {
    const value = getDep(target, key).value
    if (value && typeof value === 'object') {
      return reactive(value)
    } else {
      return value
    }
  },
  set(target, key, value) {
    getDep(target, key).value = value
  },
}

const targetToHashMap = new WeakMap()
// WeakMap 的 key 只能是 Object 类型。 原始数据类型 是不能作为 key 的（比如 Symbol）。值可以是任意

function getDep(target, key) {
  let depMap = targetToHashMap.get(target)
  if (!depMap) {
    depMap = new Map()
    targetToHashMap.set(target, depMap)
  }

  let dep = depMap.get(key)
  if (!dep) {
    dep = new Dep(target[key])
    depMap.set(key, dep)
  }

  return dep
}

function reactive(obj) {
  return new Proxy(obj, reactiveHandlers)
}

// 使用
const obj = reactive({ count: 0 })
obj.count++
