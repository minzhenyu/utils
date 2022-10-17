let str = "abcd,abcd,dcab";
// ab 即头尾字符串
str = str.replace(/^(\s|ab)+|(\s|ab)+$/g, "");
