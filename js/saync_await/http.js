// async/await 封装  原理  
let promiseValue = (promise) => {
    return promise.then((data) => [null, data]).catch((err) => [err]);
};
async function test() {
    [err, data] = await promiseValue(new Promise((resolve, reject) => resolve('正确')));
    if (err) {console.log(err)}else{
        console.log(data)
    };
    [err1, data1] = await promiseValue(new Promise((resolve, reject) => reject('错误1')));
    if (err1) console.log(err1);
    [err2, data2] = await promiseValue(new Promise((resolve, reject) => reject('错误2')));
    if (err2) console.log(err2);
};
test();//错误，错误1，错误2