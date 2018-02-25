const readline = require(`readline`);
const fs = require(`fs`);
const {name, author} = require(`../package.json`);
const {isNumeric} = require(`./utils/checker`);
const generate = require(`./generate`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function questionGenerate() {
  return new Promise((resolve, reject) => {
    rl.question(`Cгенерировать данные? (y/n) `, (answer) => {
      return answer === `y` ? resolve() : reject();
    });
  });
}

function questionAmount() {
  return new Promise((resolve, reject) => {
    rl.question(`Cколько элементов в соответствии с проектом нужно создать? `, (amount) => {
      if (isNumeric(amount)) {
        resolve(amount);
      } else {
        reject(`Некорректное число!`);
      }
    });
  });
}

function questionPath(amount) {
  return new Promise((resolve) => {
    rl.question(`Укажите путь до файла: `, (path) => resolve({amount, path}));
  });
}

function questionOverwriteFile({amount, path}) {
  return new Promise((resolve, reject) => {
    fs.exists(path, (exists) => {
      if (!exists) {
        resolve({amount, path});
      } else {
        rl.question(`Перезаписать файл? (y/n) `, (answer) => {
          return answer === `y` ? resolve({amount, path}) : reject();
        });
      }
    });
  });
}

module.exports = {
  name: `greeting`,
  description: `Приветствие пользователя`,
  execute() {
    console.log(`
      Привет пользователь!
      Эта программа будет запускать сервер «${name}».
      Автор: ${author}.
    `);

    questionGenerate()
        .then(questionAmount)
        .then(questionPath)
        .then(questionOverwriteFile)
        .then((res) => {
          generate.execute(res);
          rl.close();
        })
        .catch(() => {
          rl.close();
          process.exit(1);
        });
  }
};
