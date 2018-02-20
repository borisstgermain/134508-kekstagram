const effects = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];

const hashtags = [
  `latergramm`, `love`, `пятница`, `рабочиебудни`, `btw`,
  `лучшийдень`, `приветотпуск`, `hellosummer`, `яневеста`, `яблоко`,
  `сказачноебали`
];

const strings = [
  `Я в сладком раю!`,
  `Дарите девушкам книги. И не только в середине месяца`,
  `#latergram - это когда всё будет, но попозже. Send your love into the future`,
  `5 лет назад я училась в 11 классе и сразу знала, куда я буду поступать, хотя, откровенно говоря, немного упиралась, но выбора не было, ибо я шла по стопам`,
  `Если мы не идём в Большой, Большой идёт к нам!`,
  `Дебюсси - «Остров радости»`,
  `Ну не импрессионист Коровин, не импрессионист!`,
  `Когда жизнь - сплошной праздник`,
  `А спонсор нашей игры - песни Олега Газманова!`,
  `Старшая сестра - звучит горденько!`
];

function getRandomHashtag() {
  const amount = generateRandomNumber(1, 5);
  const hashtagArr = [];

  for (let i = 0; i < amount; i++) {
    let hashtag = `#${hashtags[generateRandomNumber(0, hashtags.length)]}`;

    if (hashtagArr.indexOf(hashtag) === -1) {
      hashtagArr.push(hashtag);
    }
  }

  return hashtagArr;
}

function getRandomComments() {
  const amount = generateRandomNumber(1, 9);
  const comments = [];

  for (let i = 0; i < amount; i++) {
    let comment = strings[generateRandomNumber(0, strings.length)];

    if (comments.indexOf(comment) === -1) {
      comments.push(comment);
    }
  }

  return comments;
}

function getRandomEntity() {
  return {
    url: `https://picsum.photos/600/?random`,
    scale: generateRandomNumber(0, 100),
    effect: effects[generateRandomNumber(0, 5)],
    hashtags: getRandomHashtag(),
    description: strings[generateRandomNumber(0, 9)],
    likes: generateRandomNumber(0, 1000),
    comments: getRandomComments()
  };
}

/**
 * Generate random number between min and max included
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
function generateRandomNumber(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function generateEnitity() {
  const amount = generateRandomNumber(1, 20);
  const entities = [];

  for (let i = 0; i < amount; i++) {
    entities.push(getRandomEntity());
  }

  return entities;
}

module.exports = generateEnitity;
