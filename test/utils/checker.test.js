const assert = require(`assert`);
const {isNumeric} = require(`../../src/utils/checker`);

describe(`Utils: checker`, () => {
  describe(`#isNumeric()`, () => {
    it(`should return true`, () => {
      assert.equal(isNumeric(5), true);
      assert.equal(isNumeric(2.3), true);
      assert.equal(isNumeric(-2), true);
      assert.equal(isNumeric(`12`), true);
    });

    it(`should return false`, () => {
      assert.equal(isNumeric(`abc`), false);
      assert.equal(isNumeric(`12a`), false);
      assert.equal(isNumeric({}), false);
    });
  });
});
