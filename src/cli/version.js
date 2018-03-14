const colors = require(`colors/safe`);
const {version} = require(`../../package.json`);

const [major, minor, patch] = version.split(`.`);

module.exports = {
  name: `--version`,
  description: `Печатает версию приложения`,
  execute() {
    console.log(`v${colors.red(major)}.${colors.green(minor)}.${colors.blue(patch)}`);
  }
};
