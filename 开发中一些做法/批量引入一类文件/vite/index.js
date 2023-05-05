// 在使用Vite时，源代码中不应使用require。它仅适用于ESM。对于Vite v2，可以使用import.meta.globEager。对于Vite〉v2，不推荐使用import.meta.globEager。请改用import.meta.glob('*', { eager: true })。

// https://vitejs.dev/guide/features.html#glob-import
// Vite v2
import.meta.globEager;

// 对于Vite〉v2
//匹配某个文件夹下的所有 .js 文件：./path/*.js
//匹配某个文件夹及其子文件夹下的所有 .vue 文件：./path/**/*.vue
//排除某个文件夹下的某个文件：./path/!(*.md)
import.meta.glob("*", { eager: true });

//require 自动引入实现
const moduleFiles = require.context("./modules", false, /\.ts$/);
//import 自动引入实现
const files = import.meta.globEager("./modules/*.ts");

// https://blog.csdn.net/weixin_45172119/article/details/129233197
const modules = import.meta.glob("./path/*.js");

for (const path in modules) {
  const module = await modules[path]();
  // 在这里处理导入的模块
}
