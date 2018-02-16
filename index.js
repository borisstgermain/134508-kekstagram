const executor = require(`./src/executor`);

const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log(`
    Привет пользователь!
    Эта программа будет запускать сервер «Kekstagram».
    Автор: Alexey Borisov.
  `);
  process.exit(0);
}

for (let execute in executor) {
  if (executor[execute].name === command) {
    executor[execute].execute();
    process.exit(0);
  }
}

console.error(`
  Неизвестная команда ${command}.
  Чтобы прочитать правила использования приложения, наберите "--help"
`);
process.exit(1);
