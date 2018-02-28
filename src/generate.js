const fs = require(`fs`);
const util = require(`util`);
const writeFile = util.promisify(fs.writeFile);
const generateEntity = require(`./utils/generate-entity`);

const fileWriteOptions = {
  encoding: `utf-8`,
  mode: 0o644,
};

module.exports = {
  name: `generate`,
  desctiprion: `Генерирует тестовые данные для проекта`,
  execute({amount, path}) {
    const data = [];

    for (let i = 0; i < amount; i++) {
      data.push(generateEntity());
    }

    return writeFile(`${process.cwd()}/${path}`, JSON.stringify(data), fileWriteOptions);
  }
};
