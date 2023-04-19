// 二维数组找值 子数组有序数组
const arr = [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30],
];

const findItem = (arr, targe) => {
  for (i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < arr[i].length; j++) {
      const element = arr[i][j];
      if (element > targe) {
        break;
      } else if (element === targe) {
        return { i, j };
      }
    }
  }
  return false;
};

console.log(findItem(arr, 30));

console.log(findItem(arr, 0));
console.log(findItem(arr, 12));
