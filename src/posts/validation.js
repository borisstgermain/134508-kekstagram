const {numberInRange, isContainSymbol, isContainFirstSymbol, isStringLong, isUniqueArr} = require(`../utils/checker`);
const {formatError} = require(`../utils/log`);

const effects = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];

const schema = {
  'filename': {
    required: true,
    validate(val, errors) {
      if (!val.mimetype.startsWith(`image/`)) {
        errors.push(formatError(`filename`, val.mimetype, `должно быть картинкой`));
      }
    }
  },

  'scale': {
    required: true,
    validate(val, errors) {
      if (!numberInRange(val, 0, 100)) {
        errors.push(formatError(`scale`, val, `число, в пределах от 0 до 100`));
      }
    }
  },

  'effect': {
    required: true,
    validate(val, errors) {
      if (effects.indexOf(val) === -1) {
        errors.push(formatError(`description`, val, `поле должно содержать одно из значение: ${effects}`));
      }
    }
  },

  'hashtags': {
    validate(val, errors) {
      if (val.length > 5) {
        errors.push(formatError(`hashtags`, val, `не более 5 элементов`));
      }

      if (!isContainFirstSymbol(val, `#`)) {
        errors.push(formatError(`hashtags`, val, `каждая строка начинается с символа '#'`));
      }

      if (!isContainSymbol(val, ` `)) {
        errors.push(formatError(`hashtags`, val, `должно содержать одно слово без пробелов`));
      }

      if (!isUniqueArr(val)) {
        errors.push(formatError(`hashtags`, val, `слова не должны повторяться`));
      }

      if (!isStringLong(val, 20)) {
        errors.push(formatError(`hashtags`, val, `длина одного слова не превышает 20 символов`));
      }
    },
  },

  'description': {
    validate(val, errors) {
      if (val.length > 140) {
        errors.push(formatError(`description`, val, `строка — не более 140 символов`));
      }
    },
  }
};

module.exports = {
  schema
};
