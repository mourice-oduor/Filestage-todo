const { MongoClient } = require('mongodb');

const database = module.exports;

database.connect = async function connect() {
  database.client = new MongoClient('mongodb+srv://root:1234@cluster0.vlsqb.gcp.mongodb.net/@database', { useUnifiedTopology: true });
  await database.client.connect();
};
