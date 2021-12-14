const fn = function(n){
    console.log(n)
  }
  const str = 'string'
  const arr = [1,2,3]
  const obj = {
     a:123,
     b:456
  }
  const num = 1
  const b = true
  const n = null     
  const u = undefined
  
  console.log(typeof str) // string
  console.log(typeof arr) // object
  console.log(typeof obj) // object
  console.log(typeof num) // number
  console.log(typeof b) // boolean
  console.log(typeof n) // object null是一个空的对象
  console.log(typeof u) // undefined
  console.log(typeof fn) // function




  /**
* @description: 数据类型的检测
* @param {any} data 要检测数据类型的变量
* @return {string} type 返回具体的类型名称【小写】
*/
const isTypeOf = (data) => {
    return Object.prototype.toString.call(data).replace(/\[object (\w+)\]/, '$1').toLowerCase()
}

console.log(isTypeOf({})) // object
console.log(isTypeOf([])) // array
console.log(isTypeOf("ss")) // string
console.log(isTypeOf(1)) // number
console.log(isTypeOf(false)) // boolean
console.log(isTypeOf(/w+/)) // regexp
console.log(isTypeOf(null)) // null
console.log(isTypeOf(undefined)) // undefined
console.log(isTypeOf(Symbol("id"))) // symbol
console.log(isTypeOf(() => { })) // function