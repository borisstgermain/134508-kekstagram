const generateEntity = require(`./utils/generate-entity`);

module.exports = {
  name: `generate`,
  desctiprion: `Генерирует тестовые данные для проекта`,
  execute(amount) {
    const data = [];

    for (let i = 0; i < amount; i++) {
      data.push(generateEntity());
    }

    return data;
  }
};
