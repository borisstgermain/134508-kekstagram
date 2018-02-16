const args = process.argv.slice(2);


if (!args[0]) {
  console.log(`Привет пользователь!
      Эта программа будет запускать сервер «Kekstagram».
      Автор: Alexey Borisov.`);
} else {
  switch (args[0]) {
    case `--version`:
      console.log(`v1.0.0`);
      break;

    case `--help`:
      console.log(`
        Доступные команды:
        --help    – печатает этот текст;
        --version – печатает версию приложения;
      `);
      break;

    default:
      console.error(`
        Неизвестная команда ${args[0]}.
        Чтобы прочитать правила использования приложения, наберите "--help"`
      );
      process.exit(1);
  }
}
