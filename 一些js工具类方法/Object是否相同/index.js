/**      * @param {*} obj1 对象   * @param {*} obj2 对象   * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串   */
function objEqual(obj1, obj2) {
    const keysArr1 = Object.keys(obj1);
    const keysArr2 = Object.keys(obj2);
    if (keysArr1.length !== keysArr2.length) return false;
    else if (keysArr1.length === 0 && keysArr2.length === 0) return true;
    else return !keysArr1.some((key) => obj1[key] != obj2[key]);
}
