// 函数柯里化
// 柯里化的定义：接收一部分参数，返回一个函数接收剩余参数，接收足够参数后，执行原函数。

// 当柯里化函数接收到足够参数后，就会执行原函数，如何去确定何时达到足够的参数呢？

// 有两种思路：

// 通过函数的 length 属性，获取函数的形参个数，形参的个数就是所需的参数个数
// 在调用柯里化工具函数时，手动指定所需的参数个数

const curry = function(fn,len= fn.length){
        return _curry.call(this,fn,len)
}

const _curry=function(fn, len, ...args){
    return function(...params){
            let _args = [...args,...params]
            if(_args.length>=len){
                    return fn.apply(this,_args)
            }else{
                    return _curry.call(this,fn, len, ..._args)
            }
    }
}

// 使用
const _fn=curry(function(a,b,c){
    console.log(a,b,c)
})

_fn(1)(2)(3)
_fn(1,2)(3)
_fn(1,2,3)

// lodash 还有占位符用法 不做具体实现
