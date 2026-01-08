const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const hbs = require('express-handlebars');
const path = require('path');

dotenv.config();

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine("hbs", hbs.engine({
  extname: "hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layouts"),
}));

app.use(express.static("public"));

const connectToDB = async (connectionString) => {
  const client = await MongoClient.connect(connectionString);
  console.log("Connected to MongoDB");
  return client.db();
};

const host = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const dbname = process.env.MONGO_DATABASE;

let db;
const connectionString = `mongodb://${host}:${mongoPort}/${dbname}`;

;(async () => {
  db = await connectToDB(connectionString);
})();

app.get("/", async (req, res) => {
  const articles = await db.collection('articles').find().toArray();
  res.render("index", { articles });
});

app.get("/article/:slug", async (req, res) => {
    const article = await (await db).collection("articles").findOne({slug: req.params.slug})
    console.log(article)
    res.render("article", {article: article})
})

app.listen(3012, () => {
  console.log('Server is running on port 3012');
});