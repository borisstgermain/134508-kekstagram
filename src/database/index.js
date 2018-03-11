const {MongoClient} = require(`mongodb`);

const url = `mongodb://localhost:27017`;

module.exports = MongoClient.connect(url)
    .then((client) => client.db(`kekstagramm`))
    .catch((err) => {
      console.log(`Failed to connect to MongoDB`, err);

      process.exit(1);
    });
