const express = require(`express`);
const {getErrorMessage} = require(`./utils/log`);

const app = express();
app.use(`/`, express.static(`static`));

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
  }
};
