const express = require('express');
const mongodb = require("mongodb");
const assert = require('assert');
const bodyParser = require("body-parser");

const app = express();
const ObjectID = mongodb.ObjectID;

const REPORTS_COLLECTION = "reports";

app.use(bodyParser.json());

let connection = mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://test:testtest123@ds145412.mlab.com:45412/bristol', { useNewUrlParser: true });

app.get('/:type', (req, res) => {

  const newReport = {
    type: req.params.type
  };

  connection.then( db => {
    console.log(`Connected to db: ${db}`);
    return db.collection(REPORTS_COLLECTION).insertOne(newReport);
  }).then( doc => {
    res.sendStatus(200);
  }).catch( err => {
    console.log(`Unable to connect db: ${err}`);
    res.sendStatus(500);
  });
});

app.listen(process.env.PORT || 3000, () => console.log('Server started.'));
