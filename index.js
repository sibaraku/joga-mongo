const Express = require('express')
const mongodb = require('mongodb').MongoClient

const dotenv = require('dotenv')
const app = Express()
dotenv.config()

connectionToDB = async (connectionString) => {
  try {
    const client = await mongodb.connect(connectionString);
    db = client.db();
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error('Failed to connect to MongoDb', err);
  }
  return db;
}

const user = process.env.MONGO_USER
const password = process.env.MONGO_PASSWORD
const host = process.env.MONGO_HOST
const port = process.env.MONGO_PORT
const dbname = process.env.MONGO_DATABASE

let db, connectionString = `mongodb://${host}:${port}/${dbname}`
connectionToDB(connectionString)
app.listen(3012, () => {
  console.log('Server is running on port 3012');
})