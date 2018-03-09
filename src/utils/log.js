const colors = require(`colors/safe`);

function getHelpCommand(name, description) {
  return `${colors.grey(name)} \t– ${colors.green(description)}`;
}

function getErrorMessage(name) {
  const text = colors.red(`Неизвестная команда ${name}.`);

  return `
    ${text}
    Чтобы прочитать правила использования приложения, наберите "--help"
  `;
}

function formatError(name, value, message) {
  return {
    name,
    value,
    message
  };
}

module.exports = {
  getHelpCommand,
  getErrorMessage,
  formatError
};

