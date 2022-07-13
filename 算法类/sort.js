//TODO 排序
// [1,3,6,6,1,567,69,9,0]

// 1、冒泡排序
// 外层遍历整个数组
// 内层遍历未排序完成的数组,并判断大小  满足条件就交换位置
// 此时外层遍历几次末尾就排序了几个元素,未排序的长度就是 length-i; index就是 length-1-i
//此方法也可以末尾开始遍历
const bubbleSort = (arr) => {
  const length = arr.length;
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const tem = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = tem;
      }
    }
  }
  return arr;
};
// 2、选择排序
// 遍历数组 中遍历 i+1 到末尾 对比后获取最小/最大  下标并记录
// 0 对比 1,2,3...,取最小/最大下标 ;  1对比2,3,4...
// 外层遍历  调换下标 指定 数组元素
// 不占内存
//可以末尾开始遍历

//注意:外层只需要遍历到最后第二个元素,i<len-1, 内层遍历到最后一个元素 j<len
const selectionSort = (arr) => {
  const len = arr.length;
  let minIndex, temp;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
};
// 3、插入排序
// 从第2个元素开始排序
// 默认前面排序第i个一个一个向前比对,当前一个元素大于当前  向后移动,向前移动下标,
//外层循环结束时需要 把当前值赋值给preIndex + 1
const insertionSort = (arr) => {
  const len = arr.length;
  let preIndex, cur;
  for (let i = 1; i < length; i++) {
    preIndex = i - 1;
    cur = arr[i];
    while (preIndex >= 0 && arr[preIndex] > cur) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = cur;
  }
  return arr;
};
// 4、希尔排序
// 5、归并排序
// 6、快速排序
// 7、堆排序
// 8、计数排序
// 9、桶排序
// 10、基数排序

const a = [1, 3, 6, 6, 1, 567, 69, 9, 0];

console.log(selectionSort(a));
