const {getHelpCommand} = require(`./utils/log`);
const commands = [
  require(`./version`),
  require(`./author`),
  require(`./description`),
  require(`./license`),
  require(`./server`),
];


module.exports = {
  name: `--help`,
  description: `Печатает доступные команды`,
  execute() {
    console.log(`Доступные команды:`);
    console.log(getHelpCommand(this.name, this.description));
    for (const {name, description} of commands) {
      console.log(getHelpCommand(name, description));
    }
  }
};
