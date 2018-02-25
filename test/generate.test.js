const assert = require(`assert`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const access = promisify(fs.access);
const unlink = promisify(fs.unlink);
const generate = require(`../src/generate`);

describe(`Generate file`, () => {
  it(`should fail on not existing folder`, function () {
    const path = `./data.json`;
    const amount = 10;

    return generate.execute({amount, path})
        .then(() => assert.fail(`${path} should not be available`))
        .catch((err) => assert.ok(err));
  });

  it(`should create new file`, () => {
    const path = `./data.json`;
    const amount = 10;

    return generate.execute({amount, path})
        .then(() => access(path))
        .then(() => unlink(path));
  });
});
