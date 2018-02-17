const {author} = require(`../package.json`);

module.exports = {
  name: `--author`,
  description: `Печатает автора приложения`,
  execute() {
    console.log(`автор: ${author}`);
  }
};
