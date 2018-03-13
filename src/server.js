const app = require(`./server`);
const logger = require(`./utils/logger`);


const HOSTNAME = process.env.SERVER_HOST || `0.0.0.0`;
const PORT = process.env.SERVER_PORT || 3000;

module.exports = {
  name: `--server`,
  description: `Запускает сервер`,
  execute(port = PORT) {
    app.listen(port, HOSTNAME, (err) => {
      if (err) {
        logger.error(err);
      }

      logger.info(`Server start! ${HOSTNAME}:${port}`);
    });
  }
};
