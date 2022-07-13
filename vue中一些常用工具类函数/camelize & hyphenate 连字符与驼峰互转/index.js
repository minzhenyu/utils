//链接字符驼峰互转
const camelizeRE = /-(\w)/g;
// const camelize = cacheStringFunction((str) => {
//   return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
// });
// 清爽版
const camelize = (str) =>
  str.replace(camelizeRE, (_, c) => {
    return c ? c.toUpperCase() : "";
  });
// 举例：
// on-click-a => onClickAcamelize('on-click-a');
const hyphenateRE = /\B([A-Z])/g;
// const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, '-$1').toLowerCase());
// 清爽版
const hyphenate = (str) => str.replace(hyphenateRE, "-$1").toLowerCase();
// 仿照 camelize 写法
// const hyphenate = str => str.replace(hyphenateRE, (_, c) => {    return c ? `-${c.toLowerCase()}` : '';
// });
// 举例：
// (onClickA) => on - click - ahyphenate("onClickA");
