// 空格 替换为%20

const s = "We are happy.";

const replaceEmpty = (s) => {
  return s
    .split("")
    .map((chat) => {
      if (chat === " ") return "%20";
      return chat;
    })
    .join("");
};
const replaceEmpty1 = (s) => {
  return s.replaceAll(" ", "%20");
};

console.log(replaceEmpty(s));
console.log(replaceEmpty1(s));

console.log(replaceEmpty("啊十九   大   很  好 的啊"));
console.log(replaceEmpty1("啊十九   大   很  好 的啊"));
