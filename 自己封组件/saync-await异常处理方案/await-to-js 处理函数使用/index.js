// 安装
// # use npm
// npm i await-to-js --save
// # use yarn
// yarn add await-to-js

// 使用
import to from "await-to-js";

// 获取列表list
const [err, data] = await to(getList(params));
if (err) return;
// 获取单个详情
const info = await to(getListById(list[0]?.id));
