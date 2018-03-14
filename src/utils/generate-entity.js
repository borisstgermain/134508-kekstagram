const effects = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];

const hashtags = [
  `#latergramm`, `#love`, `#пятница`, `#рабочиебудни`, `#btw`,
  `#лучшийдень`, `#приветотпуск`, `#hellosummer`, `#яневеста`, `#яблоко`,
  `#сказачноебали`
];

const strings = [
  `Я в сладком раю!`,
  `Дарите девушкам книги. И не только в середине месяца`,
  `#latergram - это когда всё будет, но попозже. Send your love into the future`,
  `5 лет назад я училась в 11 классе и сразу знала, куда я буду поступать`,
  `Если мы не идём в Большой, Большой идёт к нам!`,
  `Дебюсси - «Остров радости»`,
  `Ну не импрессионист Коровин, не импрессионист!`,
  `Когда жизнь - сплошной праздник`,
  `А спонсор нашей игры - песни Олега Газманова!`,
  `Старшая сестра - звучит горденько!`
];

const generateUrl = () => {
  return `https://picsum.photos/600/?random`;
};

const getRandomStrings = (collection, maxAmount, minAmount = 1) => {
  const amount = generateRandomNumber(minAmount, maxAmount);
  const stringArr = [];

  for (let i = 0; i < amount; i++) {
    let string = collection[generateRandomNumber(0, collection.length - 1)];

    if (stringArr.indexOf(string) === -1) {
      stringArr.push(string);
    }
  }

  return stringArr;
};

/**
 * Generate random number between min and max included
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
const generateRandomNumber = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const generateEnitity = () => {
  return {
    url: generateUrl(),
    scale: generateRandomNumber(0, 100),
    effect: effects[generateRandomNumber(0, 5)],
    hashtags: getRandomStrings(hashtags, 5, 2),
    description: strings[generateRandomNumber(0, 9)],
    likes: generateRandomNumber(0, 1000),
    comments: getRandomStrings(strings, 9),
    date: Date.now()
  };
};

module.exports = generateEnitity;
