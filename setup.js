const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
let mongoServer;
const startDatabase = async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((db) => {
    console.log("Database Instance Connected URL:", db.connections[0]._connectionString)
  })
};

const stopDatabase = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

module.exports = { startDatabase, stopDatabase };
