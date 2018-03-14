const colors = require(`colors/safe`);

const getHelpCommand = (name, description) => {
  return `${colors.grey(name)} \t– ${colors.green(description)}`;
};

const getErrorMessage = (name) => {
  const text = colors.red(`Неизвестная команда ${name}.`);

  return `
    ${text}
    Чтобы прочитать правила использования приложения, наберите "--help"
  `;
};

const formatError = (name, value, message) => {
  return {
    name,
    value,
    message
  };
};

module.exports = {
  getHelpCommand,
  getErrorMessage,
  formatError
};

