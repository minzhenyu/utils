/*
 * @Author: zy.min
 * @Date: 2022-01-24 15:10:07
 * @LastEditTime: 2022-01-24 15:19:31
 * @LastEditors: zy.min
 */
// set 用法

// 去重
const unique = (arr)=>{
    return [...new Set(arr)]
}

// 并集
const union = (arr1,arr2)=>{
    const arr = arr1.concat(arr2)
    return [...new Set(arr)]
    // return [...new Set([...arr1,...arr2])]
}

// 交集
const intersect=(arr1,arr2)=>{
    const arr=arr1.filter(item=>{
        return arr2.includes(item)
    })
    return [...new Set(arr)]
}


export {union,intersect}