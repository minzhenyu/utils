// 存储localStorage
setStore = (params) => {
    let name = params.name,
        content = params.content,
        type = params.type,
        datetime = params.datetime;
    name = `${process.env.VUE_APP_NAME}-${name}`;
    const obj = { dataType: typeof content, content: content, datetime: new Date().getTime() };
    if (type) obj.type = type;
    try {
        if (type) {
            window.sessionStorage.setItem(name, JSON.stringify(obj));
        } else {
            //
            localStorage.setItem(name, JSON.stringify(obj));
            store.set(name, JSON.stringify(obj));
        }
    } catch (e) {
        console.log(e);
    }
};
// 获取localStorage
getStore = (params) => {
    let { name, type } = params;
    let obj = {};
    let content;
    name = `${process.env.VUE_APP_NAME}-${name}`;
    obj = store.get(name);
    if (validatenull(obj)) obj = window.sessionStorage.getItem(name);
    if (validatenull(obj)) return (obj = obj ? JSON.parse(obj) : {});
    if (obj.dataType === "string") {
        content = obj.content;
    } else if (obj.dataType === "number") {
        content = Number(obj.content);
    } else if (obj.dataType === "boolean") {
        content = eval(obj.content);
    } else if (obj.dataType === "object") {
        content = obj.content;
    }
    return content;
};
// 删除localStorage
removeStore = (name) => {
    name = `${process.env.VUE_APP_NAME}-${name}`;
    store.remove(name);
    window.sessionStorage.removeItem(name);
};
