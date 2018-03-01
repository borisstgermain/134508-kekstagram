const executor = require(`./src/executor`);
const {getErrorMessage} = require(`./src/utils/log`);

const args = process.argv.slice(2);
const [command, ...arg] = args;

if (!command) {
  executor.greeting.execute();
} else {
  let exec;

  for (let execute in executor) {
    if (executor[execute].name === command) {
      exec = executor[execute];
    }
  }

  if (exec) {
    exec.execute(...arg);
  } else {
    console.error(getErrorMessage(command));
    process.exit(1);
  }
}
