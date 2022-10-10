import calendarFormatter from "../index.js";

const date = new Date();
const month = date.getMonth();
const day = date.getDay();
const hour = date.getHours();

const chinaHourTimeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const getChinaHourTime = (hour = hour) => {
  const index = hour / 2;
  return chinaHourTimeList[index];
};

// 1）大安：代表大吉

// 2）留莲：代表一般

// 3）速喜：代表好事在眼前，测事大吉

// 4）赤口：代表口舌是非，有争议或者官司

// 5）小吉：代表将会有好的结果，只需要耐心等待

// 6）空亡：这是最凶的卦，对占事不利
const list = ["空亡", "大吉", "留莲", "速喜", "赤口", "小吉"];

// 输入公历月日时
const getIsOk = (month = month, day = day, hour = hour) => {
  const lHour = getChinaHourTime(hour);
  const { lDay, lMonth } = calendarFormatter.solar2lunar(2020, 5, 26);
  const index = (lHour + lDay + lMonth) % 6;
  return list[index];
};
getIsOk();
export { getIsOk };
