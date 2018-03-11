const app = require(`./server`);
const {getErrorMessage} = require(`./utils/log`);


const hostname = `0.0.0.0`;

module.exports = {
  name: `--server`,
  description: `Запускает сервер`,
  execute(port = 3000) {
    app.listen(port, hostname, (err) => {
      if (err) {
        console.error(getErrorMessage(err));
      }

      console.log(`Server start! ${hostname}:${port}`);
    });
  }
};
