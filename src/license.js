const {license} = require(`../package.json`);

module.exports = {
  name: `--license`,
  description: `Печатает лицензию приложения`,
  execute() {
    console.log(license);
  }
};
