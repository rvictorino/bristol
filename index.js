const express = require('express');
const mongodb = require("mongodb");
const assert = require('assert');
const bodyParser = require("body-parser");

const app = express();
const ObjectID = mongodb.ObjectID;

const REPORTS_COLLECTION = "reports";

app.use(bodyParser.json());

// avoid using / directly (browser may request other things, like favicon.ico)
app.get('/create/:type', (req, res) => {

  const newReport = {
    type: req.params.type
  };

  let db;
  let client;

  mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://test:testtest123@ds145412.mlab.com:45412/bristol', { useNewUrlParser: true })
    .then( (dbClient) => {
      client = dbClient;
      db = dbClient.db(process.env.MONGODB_DBNAME || 'bristol');
      return db.collection(REPORTS_COLLECTION).insertOne(newReport);
    }).then( doc => {
      console.log(`Success inserting: ${doc}`);
      client.close();
      res.sendStatus(200);
    }).catch( err => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.listen(process.env.PORT || 3000, () => console.log('Server started.'));
