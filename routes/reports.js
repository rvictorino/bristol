const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();
const REPORTS_COLLECTION = "reports";

router.post('/create/', (req, res, next) => {
  const newReport = {
    type: req.body.type
  };

  let db;
  let client;

  mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://test:testtest123@ds145412.mlab.com:45412/bristol', {
      useNewUrlParser: true
    })
    .then((dbClient) => {
      client = dbClient;
      db = dbClient.db(process.env.MONGODB_DBNAME || 'bristol');
      return db.collection(REPORTS_COLLECTION).insertOne(newReport);
    }).then(doc => {
      console.log(`Success inserting: ${doc}`);
      client.close();
      res.redirect('/success');
    }).catch(err => {
      console.error(err);
      res.redirect('error');
    });

});

module.exports = router;