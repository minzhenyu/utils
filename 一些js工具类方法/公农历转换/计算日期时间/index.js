const chinaHourTimeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const getChinaHourTime = () => {
  const index = new Date().getHours() / 2;
  return chinaHourTimeList[index];
};

export { getChinaHourTime };
