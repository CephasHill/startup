const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const username = encodeURIComponent(config.userName);
const password = encodeURIComponent(config.password);
const hostname = config.hostname.replace(/\/+$/, '');
const url = `mongodb+srv://${username}:${password}@${hostname}`;

const client = new MongoClient(url);
const db = client.db('ntconnect');
const userCollection = db.collection('user');

async function testConnection() {
  await db.command({ ping: 1 });
  await userCollection.createIndex({ email: 1 }, { unique: true });
  console.log(`Connected to MongoDB at ${hostname}`);
}

function getUser(email) {
  return userCollection.findOne({ email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token });
}

function addUser(user) {
  return userCollection.insertOne(user);
}

function updateUser(user) {
  return userCollection.updateOne(
    { email: user.email },
    { $set: { token: user.token } }
  );
}

function updateUserRemoveAuth(email) {
  return userCollection.updateOne(
    { email },
    { $unset: { token: '' } }
  );
}

function updateProgress(email, progress) {
  return userCollection.updateOne(
    { email },
    { $set: { progress } }
  );
}

module.exports = {
  testConnection,
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  updateUserRemoveAuth,
  updateProgress,
};
