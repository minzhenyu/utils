const elementIsInFocus = (el) => el === document.activeElement;

elementIsInFocus(anyElement);
// 元素处于焦点返回true，反之返回false
export { elementIsInFocus };
