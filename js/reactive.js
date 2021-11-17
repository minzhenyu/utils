let activeEffect
class Dep {
  subscribes = new Set()
  dep() {
    if (activeEffect) {
      this.subscribes.set(activeEffect)
    }
  }
  notify() {
    this.subscribes.forEach((effect) => {
      effect()
    })
  }
}

function watchEffect(effect) {
  activeEffect = effect
  effect()
  activeEffect = null
}

// 使用

const dep = new Dep()

let actualCount = 0
const state = {
  get count() {
    dep.depend()
    return actualCount
  },
  set count(newCount) {
    actualCount = newCount
    dep.notify()
  },
}

watchEffect(() => {
  console.log(state.count)
}) // 0

state.count++ // 1
