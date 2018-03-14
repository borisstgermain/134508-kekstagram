const readline = require(`readline`);
const {isNumeric} = require(`../utils/checker`);
const generate = require(`../generate`);
const postStore = require(`../server/posts/store`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

module.exports = {
  name: `--fill`,
  description: `Заполняет БД данными`,
  execute() {
    questionAmount()
        .then((res) => {
          const data = generate.execute(res);

          postStore.saveSet(data);

          rl.close();
        })
        .catch(() => {
          rl.close();
          process.exit(1);
        });
  }
};
