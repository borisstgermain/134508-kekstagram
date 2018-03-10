const express = require(`express`);
const {getErrorMessage} = require(`./utils/log`);
const generateEntity = require(`./utils/generate-entity`);
const multer = require(`multer`);
const bodyParser = require(`body-parser`);
const validator = require(`./utils/validator`);
const {schema} = require(`./posts/validation`);

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
app.post(`/api/posts`, upload.single(`filename`), (req, res) => {
  const data = req.body;
  data.filename = req.file || data.filename;
  const errors = validator(data, schema);

  if (errors.length > 0) {
    res.status(400)
        .json(errors)
        .end();

    return;
  }

  delete data.filename;

  res.status(200)
      .send(data);
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
