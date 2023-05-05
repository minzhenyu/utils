// 在使用Vite时，源代码中不应使用require。它仅适用于ESM。对于Vite v2，可以使用import.meta.globEager。对于Vite〉v2，不推荐使用import.meta.globEager。请改用import.meta.glob('*', { eager: true })。

// https://vitejs.dev/guide/features.html#glob-import
// Vite v2
import.meta.globEager;

// 对于Vite〉v2，
import.meta.glob("*", { eager: true });

//require 自动引入实现
const moduleFiles = require.context("./modules", false, /\.ts$/);
//import 自动引入实现
const files = import.meta.globEager("./modules/*.ts");
