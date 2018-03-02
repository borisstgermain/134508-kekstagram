const http = require(`http`);
const path = require(`path`);
const url = require(`url`);
const fs = require(`fs`);
const {promisify} = require(`util`);

const readfile = promisify(fs.readFile);
const {getErrorMessage} = require(`./utils/log`);

const MIME_TYPES = {
  html: `text/html; charset=UTF-8`,
  css: `text/css`,
  jpg: `image/jpeg`,
  png: `image/png`,
  gif: `image/gif`,
  ico: `image/x-icon`,
};

const readFile = async (fileName, res) => {
  const data = await readfile(fileName);
  const fileExt = path.extname(fileName).replace(`.`, ``);
  const contentType = MIME_TYPES[fileExt];

  res.setHeader(`content-type`, contentType);
  res.setHeader(`content-length`, Buffer.byteLength(data));
  res.end(data);
};

const server = http.createServer(async (req, res) => {
  try {
    const {pathname} = url.parse(req.url);
    const staticPath = path.join(__dirname, `../static`, pathname);
    const reqPath = pathname === `/` ? staticPath + `index.html` : staticPath;
    await readFile(reqPath, res);
  } catch (err) {
    res.writeHead(404);
    res.end(`Not found!`);
  }
});

module.exports = {
  name: `--server`,
  description: `Запускает сервер`,
  execute(port = 3000) {
    server.listen(port, (err) => {
      if (err) {
        console.error(getErrorMessage(err));
      }

      console.log(`Server start!`);
    });
  }
};
