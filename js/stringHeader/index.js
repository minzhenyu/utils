/*
 * @Author: zy.min
 * @Date: 2022-01-25 14:33:26
 * @LastEditTime: 2022-01-25 14:34:49
 * @LastEditors: zy.min
 */
// 字段名称转驼峰
function toCase(str) {
    const to = str.replace(/(-[a-z])/g, function (v) {
        return v.replace('-', '').toLocaleUpperCase();
    });

    return lower(to);
}

function lower(str) {
    return str.replace(str[0], str[0].toLowerCase());
}

// 字段名称驼峰转横杠连接
function toLine(name) {
    let line = name.replace(/([A-Z])/g, '-$1').toLocaleLowerCase();
    if (line.indexOf('-') === 0)
        line = line.substr(1);
    return line;
}
