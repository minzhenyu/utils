/*
   所有在./components目录下的.vue组件自动注册为全局组件
   以<mc-***></mc-***>为组件标签名，***是组件的.name
*/
const requireContext = require.context("../components", true, /\.vue$/);
const requireAll = (context) => context.keys().map(context);

console.log(requireContext);
console.log(requireAll(requireContext));
export default (Vue) => {
  requireAll(requireContext).forEach((item) => {
    Vue.component(`vc-${item.default.name}`, item.default);
  });
};
