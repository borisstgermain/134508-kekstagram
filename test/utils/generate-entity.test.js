const assert = require(`assert`);
const generateEntity = require(`../../src/utils/generate-entity`);

describe(`generateEntity`, () => {
  let entity;

  beforeEach(() => {
    entity = generateEntity();
  });

  describe(`url`, () => {
    let url;

    before(() => {
      url = entity.url;
    });

    it(`should contain url`, () => {
      assert.ok(url.includes(`https`));
    });

    it(`should contain correct size image`, () => {
      assert.ok(url.includes(`600`));
    });
  });

  it(`should contain correct scale`, () => {
    const {scale} = entity;
    assert.ok(scale >= 0 && scale <= 100);
  });

  it(`should contain correct likes`, () => {
    const {likes} = entity;
    assert.ok(likes >= 0 && likes <= 1000);
  });

  it(`should contain correct effect`, () => {
    const {effect} = entity;
    assert.ok([`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`].indexOf(effect) > -1);
  });

  describe(`hashtags`, () => {
    const isFirstHashtagChar = (hashtag) => hashtag.substr(0, 1) === `#`;
    let hashtags;

    before(() => {
      hashtags = entity.hashtags;
    });

    it(`should contain correct hashtag (#)`, () => {
      assert.ok(hashtags.every(isFirstHashtagChar));
    });

    it(`should contain correct hashtags amount`, () => {
      assert.ok(hashtags.length < 6);
    });

    it(`should contain correct hashtag length`, () => {
      assert.ok(hashtags.every((hashtag) => hashtag.length < 21));
    });

    it(`should contain unique hashtags`, () => {
      const uniqIndexHashtags = hashtags.filter((val, idx, arr) => arr.indexOf(val) === idx);
      assert.equal(hashtags.length, uniqIndexHashtags.length);
    });
  });

  it(`should containt correct description`, () => {
    const {description} = entity;
    assert.ok(description.length < 141);
  });

  it(`should correct comment length`, () => {
    const {comments} = entity;
    assert.ok(comments.every((comment) => comment.length < 141));
  });
});
