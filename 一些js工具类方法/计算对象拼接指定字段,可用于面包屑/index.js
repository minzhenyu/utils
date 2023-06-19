function getPropertyByPath(obj, keys) {
  let value = obj;

  for (let key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key];
    } else {
      return null;
    }
  }

  return value;
}

function evaluateExpression(str, obj) {
  const regex = /\${(.*?)}/g;
  let resultStr = str;

  resultStr = resultStr.replace(regex, (_, path) => {
    const keys = path.split(".");
    const propertyValue = getPropertyByPath(obj, keys);
    console.log(path, propertyValue);
    return propertyValue !== null ? propertyValue : "";
  });

  return resultStr;
}

const row = {
  a: 1,
  b: { v: 2 },
  V: { v: 3 },
  "V#e": { v: 4, "V#T": { a: 5 } },
  "V#f": null,
};
const expression = "${row.a}+${row.b.v}+xxxxx${row.V.v}";
const result = evaluateExpression(expression, row);

console.log(result);

// 空值测试
const expression3 = "${row.a}+${row.b.v}+${row.V#e.v}+${row.V#f.xxx}";
const result3 = evaluateExpression(expression3, row);

console.log(result3);

// 多层嵌套测试

const expression2 =
  "${row.a}+${row.b.v}+${row.V#e.v}+${row.V#f}+${row.V#e.V#T.a}";
const result2 = evaluateExpression(expression2, row);

console.log(result2);
