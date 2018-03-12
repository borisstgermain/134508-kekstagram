const app = require(`./server`);
const {getErrorMessage} = require(`./utils/log`);


const HOSTNAME = process.env.SERVER_HOST || `0.0.0.0`;
const PORT = process.env.SERVER_PORT || 3000;

module.exports = {
  name: `--server`,
  description: `Запускает сервер`,
  execute(port = PORT) {
    app.listen(port, HOSTNAME, (err) => {
      if (err) {
        console.error(getErrorMessage(err));
      }

      console.log(`Server start! ${HOSTNAME}:${port}`);
    });
  }
};
