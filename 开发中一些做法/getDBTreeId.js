//一般场景是数据库层级
// 无法保证id全局唯一此时,
// 可能提供了单层次唯一值
// 此时可以用查找所有上级目录,组合id 成为唯一id
//

/**
 * @description:
 * @param {*} ids 有序数组,父子关系
 * @param {*} joinWord 链接键 '_-,.' 一般使用特殊符号
 * @return {*}
 */
const getID = function (ids, joinWord) {
  if (ids.length > 0) {
    return ids.join(joinWord);
  } else {
    return false;
  }
};
/**
 * @description:
 * @param {*} id 有序数组,父子关系
 * @param {*} joinWord 链接键 '_-,.' 一般使用特殊符号
 * @return {*}
 */
const getLevelFromID = function (id, joinWord) {
  return id.split(joinWord).length;
};

console.log(getID([], "-"));

console.log(getID([1, 2, 3], "-"));

console.log(getLevelFromID("1-2-3", "-"));

// export default { getID };

//id计算函数
export const getTasks = () => {
  selectTreeByProjectId(this.$route.params.projectId).then((res) => {
    const loop = (data) => {
      if (data.children !== undefined) {
        data.children.forEach((c) => {
          c.id = data.id + "_" + c.id;
          loop(c);
        });
      }
    };
    res.forEach((e) => loop(e));
    this.tree = res;
  });
};
//id获取方法
export const clickTask = () => {
  const tasks = (this.selectTasks = []);
  this.$refs.task.getCheckedKeys().forEach(function (data, index) {
    const s = (data + "").split("_");
    if (s.length > 1) {
      tasks.push(s[s.length - 1]);
    }
  });
  console.log("selectTasks", this.selectTasks);
  this.modified = this.selectTasks.length > 0;
};
