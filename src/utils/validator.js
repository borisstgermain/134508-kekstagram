const {formatError} = require(`./log`);

const validate = (data, schema) => {
  const errors = [];

  for (const key of Object.keys(schema)) {
    const val = data[key];

    if (!val && schema[key].required) {
      errors.push(formatError(key, val, `${key} – обязательное поле`));
    }

    if (val) {
      schema[key].validate.forEach((assertion) => {
        const {ok, message} = assertion(val);

        if (!ok) {
          errors.push(formatError(key, val, message));
        }
      });
    }
  }

  return errors;
};

module.exports = validate;
