function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

console.log("undefined:", isNumber());
console.log('"":', isNumber(""));
console.log('"1":', isNumber("1"));
console.log("1:", isNumber(1));
console.log("1c:", isNumber("1c"));
console.log("c1c:", isNumber("c1c"));
console.log("null:", isNumber(null));
console.log("NaN:", isNumber(NaN));
