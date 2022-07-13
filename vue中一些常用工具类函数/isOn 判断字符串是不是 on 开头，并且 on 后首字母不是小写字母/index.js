const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
// 示例isOn('onChange');
// true
// isOn('onchange');
// false
// isOn('on3change');
// true
