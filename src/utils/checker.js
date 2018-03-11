function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function numberInRange(value, min = 0, max = 100) {
  const num = parseInt(value, 10);

  return {
    ok: num >= min && num <= max,
    message: `число, в пределах от 0 до 100`
  };
}

function textRange(value, len = 140) {
  return {
    ok: value.length <= len,
    message: `строка — не более ${len} символов`
  };
}

function isContainSymbol(arr, symbol) {
  const symbolExist = arr.find((item) => item.indexOf(symbol) !== -1);

  return {
    ok: !symbolExist,
    message: `должно содержать одно слово без '${symbol}'`
  };
}

function isContainFirstSymbol(arr, symbol = `#`) {
  const symbolIsMissing = arr.find((item) => item[0] !== symbol);

  return {
    ok: !symbolIsMissing,
    message: `каждая строка начинается с символа '${symbol}'`
  };
}

function isStringLong(arr, long) {
  const stringTooLong = arr.find((item) => item.length > long);

  return {
    ok: !stringTooLong,
    message: `длина одного слова не превышает ${long} символов`
  };
}

function isUniqueArr(arr) {
  return {
    ok: new Set(arr).size === arr.length,
    message: `элементы не должны повторяться`
  };
}

function isImage(image) {
  return {
    ok: image.mimetype.startsWith(`image/`),
    message: `должно быть картинкой`
  };
}


module.exports = {
  isImage,
  isNumeric,
  numberInRange,
  textRange,
  isContainSymbol,
  isContainFirstSymbol,
  isStringLong,
  isUniqueArr
};
