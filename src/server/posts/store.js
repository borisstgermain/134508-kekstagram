const db = require(`../../database`);

const setupCollection = async () => {
  const dBase = await db;
  const collection = dBase.collection(`posts`);

  return collection;
};

class PostsStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getAllPosts() {
    return (await this.collection).find({});
  }

  async getPost(date) {
    return (await this.collection).find(date);
  }

  async save(post) {
    return (await this.collection).insertOne(post);
  }

  async saveSet(posts) {
    return (await this.collection).insertMany(posts);
  }
}

module.exports = new PostsStore(
    setupCollection()
        .catch((err) => console.error(`Failed to set up "posts"-collection`, err))
);
