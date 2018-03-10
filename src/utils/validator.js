const {formatError} = require(`./log`);

function validator(data, schema) {
  const errors = [];

  for (const key of Object.keys(schema)) {
    const val = data[key];

    if (!val && schema[key].required) {
      errors.push(formatError(key, val, `${key} – обязательное поле`));
    }

    if (val) {
      schema[key].validate(val, errors);
    }
  }

  return errors;
}

module.exports = validator;
