// 参考地址:https://juejin.cn/post/7037078362417791007

const arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
];

const tree = {
  id: 1,
  name: "部门1",
  pid: 0,
  children: [
    {
      id: 2,
      name: "部门2",
      pid: 1,
      children: [],
    },
    {
      id: 3,
      name: "部门3",
      pid: 1,
      children: [
        {
          id: 4,
          name: "部门4",
          pid: 3,
          children: [
            {
              id: 5,
              name: "部门5",
              pid: 4,
              children: [],
            },
          ],
        },
      ],
    },
  ],
};
// 数组转tree
//方法一: getChildren
const getChildren = (arr, pId) => {
  const children = [];
  for (const item of arr) {
    if (item.pid === pId) {
      children.push({ ...item, children: getChildren(arr, item.id) });
    }
  }
  return children;
};

//方法二:  getNode
const getNode = (arr, id) => {
  const node = arr.find((item) => item.id === id);
  node.children = [];
  for (const item of arr) {
    if (item.pid === id) {
      node.children.push(getNode(arr, item.id));
    }
  }
  return node;
};

// 方法三:循环
const getTree = (arr, pid) => {
  const map = new Map();
  for (const item of arr) {
    const { id, pid } = item;
    // id 创建初始值/ 合并已存在
    if (!map.has(id)) {
      map.set(id, { ...item, children: [] });
    } else {
      map.set(id, { ...map.get(id), ...item });
    }
    // pid  存在往children塞值,否则初始化
    if (map.has(pid)) {
      map.get(pid).children.push(map.get(id));
    } else {
      map.set(pid, { children: [map.get(id)] });
    }
  }

  return map.get(pid);
};

// tree 转 数组
// 递归
const tree2Arr = (tree, res = []) => {
  res.push(tree);
  if (tree.children && tree.children.length) {
    for (const child of tree.children) {
      tree2Arr(child, res);
    }
  }
  return res;
};

/**
 * @param { arr: array } 接收子数组，调用时可以构造 `{children: [...]}` 开始调用
 * @return { arr: array }
 */
function fn(arr) {
  const res = [];
  res.push(...arr); // chilren插入结果数组
  for (const item of arr) {
    // 遍历子元素，若包含children则递归调用
    if (item.children && item.children.length) {
      res.push(...fn(item.children));
    }
  }
  return res;
}

// 循环
// 大部分递归都可以用栈的思想改为循环，将每次需要处理的元素压入栈中，处理后弹出，至栈为空

const tree2Arr2 = (tree) => {
  const res = [];
  const stack = [];
  stack.push(tree);
  while (stack.length) {
    const item = stack[0];
    res.push(item);
    stack.shift();
    if (item.children && item.children.length) {
      stack.push(...item.children);
    }
  }
  return res;
};
console.log("数组转数>>>>>>>");
console.log("getChildren:", JSON.stringify(getChildren(arr, 0)));
console.log("getNode:", JSON.stringify(getNode(arr, 1)));
console.log("getTree:", JSON.stringify(getTree(arr, 0)));
console.log("树转数组>>>>>>");
console.log("tree2Arr:", JSON.stringify(tree2Arr(tree)));
console.log("fn:", JSON.stringify(fn([{ children: [tree] }])));
console.log("tree2Arr2:", JSON.stringify(tree2Arr2(tree)));
