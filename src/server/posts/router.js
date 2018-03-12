const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const validator = require(`../../utils/validator`);
const {schema} = require(`./validation`);
const createStreamFromBuffer = require(`../../utils/buffer-to-stream`);
const logger = require(`../../utils/logger`);

const postsRouter = new Router();
const upload = multer({storage: multer.memoryStorage()});

postsRouter.use(bodyParser.json());
postsRouter.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  next();
});

const asyncWrap = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const toPage = async (data, skip = 0, limit = 50) => {
  return {
    data: await (data.skip(skip).limit(limit).toArray()),
    skip,
    limit,
    total: await data.count()
  };
};

postsRouter.get(
    ``,
    asyncWrap(async (req, res) => {
      const skip = parseInt(req.query.skip, 10) || void 0;
      const limit = parseInt(req.query.limit, 10) || void 0;

      try {
        const posts = await toPage(await postsRouter.postsStore.getAllPosts(), skip, limit);

        res.send(posts);
      } catch (err) {
        logger.error(`не удалось получить все посты`, err);
      }
    })
);

postsRouter.get(
    `/:date`,
    asyncWrap(async (req, res) => {
      try {
        const {date} = req.params;
        const result = await postsRouter.postsStore.getPost({date});
        const posts = await result.toArray();

        if (posts.length > 0) {
          res.send(posts);
        } else {
          res.status(404).send();
        }
      } catch (err) {
        logger.error(err);
      }
    })
);

postsRouter.get(
    `/:date/image`,
    asyncWrap(async (req, res) => {
      try {
        const {date} = req.params;
        const result = await postsRouter.postsStore.getPost({date});
        const posts = await result.toArray();

        if (posts.length > 0) {
          const {info, stream} = await postsRouter.imageStore.get(posts[0].url);

          res.set(`content-type`, info.contentType);
          res.set(`content-length`, info.length);
          res.status(200);
          stream.pipe(res);
        } else {
          res.status(404).send();
        }
      } catch (error) {
        logger.error(error);
      }
    })
);

postsRouter.post(
    ``,
    upload.single(`filename`),
    asyncWrap(async (req, res) => {
      const data = req.body;
      const image = req.file || data.filename;
      const date = Number(new Date());

      if (image) {
        data.filename = image;
      }

      const errors = validator(data, schema);

      if (errors.length > 0) {
        res.status(400)
            .json(errors)
            .end();

        return;
      } else {
        try {
          const url = `/api/posts/${date}/image`;
          const mimetype = data.filename.mimetype;

          await postsRouter.imageStore.save(
              url,
              mimetype,
              createStreamFromBuffer(data.filename.buffer)
          );

          delete data.filename;

          await postsRouter.postsStore.save(data);
          res.send(req.body);
        } catch (error) {
          logger.error(error);
        }
      }
    })
);


module.exports = (postsStore, imageStore) => {
  postsRouter.postsStore = postsStore;
  postsRouter.imageStore = imageStore;

  return postsRouter;
};
