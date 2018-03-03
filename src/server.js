const express = require(`express`);
const {getErrorMessage} = require(`./utils/log`);
const generateEntity = require(`./utils/generate-entity`);
const multer = require(`multer`);
const bodyParser = require(`body-parser`);

const app = express();
const upload = multer({storage: multer.memoryStorage()});

const AMOUNT = 13;
const posts = [];
for (let i = 0; i < AMOUNT; i++) {
  posts.push(generateEntity());
}

const toPage = (data, skip = 0, limit = 50) => {
  return {
    data: data.slice(skip, skip + limit),
    skip,
    limit
  };
};

app.use(`/`, express.static(`static`));
app.use(bodyParser.json());

app.get(`/api/posts`, (req, res) => res.send(toPage(posts)));
app.get(`/api/posts/:date`, (req, res) => {
  const {date} = req.params;
  const post = posts.find((it) => it.date === date);
  if (!post) {
    res.status(404).end();
  } else {
    res.send(post);
  }
});
app.post(`/api/posts`, upload.none(), (req, res) => {
  res.send(req.body);
});

module.exports = {
  name: `--server`,
  description: `Запускает сервер`,
  execute(port = 3000) {
    app.listen(port, (err) => {
      if (err) {
        console.error(getErrorMessage(err));
      }

      console.log(`Server start!`);
    });
  },
  app
};
