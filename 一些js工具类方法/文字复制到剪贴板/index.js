const copyText = async (text) => await navigator.clipboard.writeText(text);
copyText("单行代码 前端世界");

const copyToClipboard = (text) =>
  navigator.clipboard &&
  navigator.clipboard.writeText &&
  navigator.clipboard.writeText(text);

copyToClipboard("Hello World!");
