require(`dotenv`).config();
const executor = require(`./src/cli/executor`);
const {getErrorMessage} = require(`./src/utils/log`);
const {name, author} = require(`./package.json`);

const args = process.argv.slice(2);
const [command, ...arg] = args;

if (!command) {
  console.log(`
      Привет пользователь!
      Эта программа будет запускать сервер «${name}».
      Автор: ${author}.

      Запустите программу с параметром --help для справки
    `);
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
