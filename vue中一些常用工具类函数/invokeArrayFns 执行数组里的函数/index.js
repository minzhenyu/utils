const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
// 示例
// const arr = [
//   function (val) {
//     console.log(val + "张三");
//   },
//   function (val) {
//     console.log(val + "李四");
//   },
//   function (val) {
//     console.log(val + "王五");
//   },
// ];
// invokeArrayFns(arr, "我是：");
