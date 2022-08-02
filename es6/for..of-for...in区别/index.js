// for in 适用对象  循环index
// for of  适合用数组  循环 val

const arr = [1, 2, 3, 4];
for (item of arr) {
  console.log("数组:", item);
}

const obj = {
  a: 1,
  b: 2,
  c: 3,
};

for (key in obj) {
  console.log(`对象: key: ${key},值:${obj[key]}`);
}
