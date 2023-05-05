//app.js与user.js是两个模块，将来都需要被引入到index.js中进行使用
import Vue from "vue";
import Vuex from "vuex";
// 省去了一大堆的import
// import app from "./modules/app"
// import user from "./modules/user"
import getters from "./getters";
Vue.use(Vuex);

const files = require.context("./modules", false, /\.js$/);
console.log("------------");
console.log(files.keys());
console.log("------------");
const modules = {};

files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
});

console.log("------------");
console.log(modules);
console.log("------------");

export default new Vuex.Store({
  // 省去了手动注册
  // modules: {
  //   app,
  //   user,
  // },
  modules: { ...modules },
  getters,
});
