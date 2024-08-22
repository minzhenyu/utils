// 原理: 实战koa.js
// let middleware = []
// middleware.push((next) => {
// 	console.log(0)
// 	next()
// 	console.log(3)
// })
// middleware.push((next) => {
// 	console.log(1)
// 	next()
// 	console.log(1.1)
// })
// middleware.push(() => {
//     console.log(2)
// })

// let fn = compose(middleware)
// fn()
// 打印01231.1

function compose (middleware) {
    return async function () {
       let args = arguments
       await dispatch(0)
       function async dispatch (i) {
          const fn = middleware[i]
          if (!fn) return null
          await fn(function next () {
             dispatch(i + 1)
          }, ...args)
       }
    }
}

export {compose}
