const arr = [1,3,4,5,2,3,4,23,34]

const item = new Set(arr.sort())
const sortRule=(x,y)=>{
    return x>y?1:x===y?0:-1
}
console.log('sort',arr.sort(sortRule))
console.log([...item])


//  数组去重
function dedupe(arr){
    return [...new Set(arr)]   
}
console.log('dedupe',dedupe(arr))
