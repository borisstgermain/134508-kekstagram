function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function numberInRange(value, min, max) {
  const num = parseInt(value, 10);

  return num >= min && num <= max;
}

function isContainSymbol(arr, symbol) {
  const symbolExist = arr.find((item) => item.indexOf(symbol) !== -1);

  return !symbolExist;
}

function isContainFirstSymbol(arr, symbol) {
  const symbolIsMissing = arr.find((item) => item[0] !== symbol);

  return !symbolIsMissing;
}

function isStringLong(arr, long) {
  const stringTooLong = arr.find((item) => item.length > long);

  return !stringTooLong;
}

function isUniqueArr(arr) {
  return new Set(arr).size === arr.length;
}

module.exports = {
  isNumeric,
  numberInRange,
  isContainSymbol,
  isContainFirstSymbol,
  isStringLong,
  isUniqueArr
};
