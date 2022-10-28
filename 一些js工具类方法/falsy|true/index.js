const isFalsy = (data) => {
  if ((data === "false") | (data === null)) return true;
  if (typeof data === "object") {
    if (Array.isArray(data)) {
      return data.length === 0;
    } else if ((data instanceof Map) | (data instanceof Set)) {
      return data.size === 0;
    } else {
      return isObjectEmpty(data);
    }
  }
  return !!data;
};

const isObjectEmpty = (obj) => {
  // 方式1
  return Object.keys(obj).length === 0; //Object.values(obj).length === 0;
  // 方式2
  return JSON.stringify(obj) == "{}";
  // 方式3
  for (const key in obj) {
    return false;
  }
  return true;
};
