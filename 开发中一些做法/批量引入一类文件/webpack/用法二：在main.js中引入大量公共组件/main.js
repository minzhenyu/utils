import Vue from "vue";
// 自定义组件
const requireComponents = require.context("../views/components", true, /\.vue/);
// 打印结果
// 遍历出每个组件的路径
requireComponents.keys().forEach((fileName) => {
  // 组件实例
  const reqCom = requireComponents(fileName);
  // 截取路径作为组件名
  const reqComName = reqCom.name || fileName.replace(/\.\/(.*)\.vue/, "$1");
  // 组件挂载
  Vue.component(reqComName, reqCom.default || reqCom);
});
