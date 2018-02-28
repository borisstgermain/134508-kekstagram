const executor = require(`./src/executor`);
const {getErrorMessage} = require(`./src/utils/log`);

const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  executor.greeting.execute();
} else {
  for (let execute in executor) {
    if (executor[execute].name === command) {
      executor[execute].execute();
      process.exit(0);
    }
  }
  console.error(getErrorMessage(command));
  process.exit(1);
}
