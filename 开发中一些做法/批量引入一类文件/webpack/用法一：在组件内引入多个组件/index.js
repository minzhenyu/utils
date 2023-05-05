// 在组件内引入多个组件 https://blog.csdn.net/ksjdbdh/article/details/122349542
const path = require("path");
const files = require.context("", false, /\.vue$/);
const modules = {};
files.keys().forEach((key) => {
  const name = path.basename(key, ".vue");
  modules[name] = files(key).default || files(key);
});
console.log(modules);
export default { components: modules };
