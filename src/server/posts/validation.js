const {
  isImage,
  numberInRange,
  textRange,
  isContainSymbol,
  isContainFirstSymbol,
  isStringLong,
  isUniqueArr
} = require(`../../utils/checker`);

const correctEffects = (val) => {
  const effects = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];

  return {
    ok: effects.indexOf(val) !== -1,
    message: `поле должно содержать одно из значение: ${effects}`
  };
};

const schema = {
  'filename': {
    required: true,
    validate: [isImage]
  },

  'scale': {
    required: true,
    validate: [(val) => numberInRange(val, 0, 100)]
  },

  'effect': {
    required: true,
    validate: [correctEffects]
  },

  'hashtags': {
    validate: [
      (val) => isContainFirstSymbol(val, `#`),
      (val) => isContainSymbol(val, ` `),
      (val) => isUniqueArr(val),
      (val) => isStringLong(val, 20),
      (val) => {
        return {
          ok: val.length <= 5,
          message: `не более 5 элементов`
        };
      }
    ]
  },

  'description': {
    validate: [(val) => textRange(val, 140)]
  }
};

module.exports = {
  schema
};
