const nums = [1, 2, 3, 4];

const sortFn = (nums) => {
  let result = [];
  for (item of nums) {
    if (item % 2 === 0) {
      result.push(item);
    } else {
      result = [item, ...result];
    }
  }
  return result;
};

console.log(sortFn(nums));
