const request = require(`supertest`);
const assert = require(`assert`);
const {app} = require(`../src/server`);
const path = require(`path`);

describe(`GET /api/posts`, () => {
  it(`responded with JSON`, () => {
    return request(app)
        .get(`/api/posts`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((res) => {
          const posts = res.body;
          assert.equal(posts.data.length, 13);
          assert.equal(Object.keys(posts.data[0]).length, 8);
        });
  });

  it(`should return default params skip, limit`, () => {
    return request(app)
        .get(`/api/posts`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((res) => {
          const posts = res.body;
          assert.equal(posts.skip, 0);
          assert.equal(posts.limit, 50);
        });
  });

  it(`unknown address should respond with 404`, () => {
    return request(app)
        .get(`/api/postsssss`)
        .set(`Accept`, `application/json`)
        .expect(404)
        .expect(`Content-Type`, /html/);
  });
});

describe(`POST /api/posts`, () => {
  it(`should consume JSON`, () => {
    return request(app)
        .post(`/api/posts`)
        .send({
          description: `Самая красивая тачка на этой планете`,
          effect: `chrome`,
          hashtags: [`#тачка`, `#огонь`, `#car`, `#bmwX5`],
          scale: 100,
          filename: {
            mimetype: `image/png`
          }
        })
        .expect(200)
        .expect({
          description: `Самая красивая тачка на этой планете`,
          effect: `chrome`,
          hashtags: [`#тачка`, `#огонь`, `#car`, `#bmwX5`],
          scale: 100
        });
  });

  it(`should consume form-data`, () => {
    return request(app)
        .post(`/api/posts`)
        .field(`description`, `Самая красивая тачка на этой планете`)
        .field(`effect`, `chrome`)
        .field(`hashtags`, [`#тачка`, `#огонь`, `#car`, `#bmwX5`])
        .field(`scale`, 100)
        .attach(`filename`, path.join(__dirname, `./fixtures/image.png`))
        .expect(200)
        .expect({
          description: `Самая красивая тачка на этой планете`,
          effect: `chrome`,
          hashtags: [`#тачка`, `#огонь`, `#car`, `#bmwX5`],
          scale: 100,
        });
  });

  it(`unknown address should respond with 404`, () => {
    return request(app)
        .post(`/api/postsssss`)
        .send({
          description: `Самая красивая тачка на этой планете`,
          effect: `chrome`,
          hashtags: [`#тачка`, `#огонь`, `#car`, `#bmwX5`],
          scale: 100,
          filename: {
            mimetype: `image/png`
          }
        })
        .expect(404)
        .expect(`Content-Type`, /html/);
  });
});
