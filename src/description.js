const {description} = require(`../package.json`);

module.exports = {
  name: `--description`,
  description: `Печатает описание приложения`,
  execute() {
    console.log(description);
  }
};
