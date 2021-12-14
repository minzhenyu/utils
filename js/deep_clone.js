// JSON 方法
export function deepClone(obj){
    let _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
    return objClone
}  

// 递归方法
export function deepClone(obj){
    let objClone = Array.isArray(obj)?[]:{};
    if(obj && typeof obj==="object"){
        for(key in obj){
            if(obj.hasOwnProperty(key)){
                //判断ojb子元素是否为对象，如果是，递归复制
                if(obj[key]&&typeof obj[key] ==="object"){
                    objClone[key] = deepClone(obj[key]);
                }else{
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}  


// 借用JQ的extend方法。

// $.extend( [deep ], target, object1 [, objectN ] )

// deep表示是否深拷贝，为true为深拷贝，为false，则为浅拷贝

// target Object类型 目标对象，其他对象的成员属性将被附加到该对象上。

// object1  objectN可选。 Object类型 第一个以及第N个被合并的对象。