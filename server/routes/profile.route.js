//----------------------------------------------------------------------------//
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/db-config.module');
//----------------------------------------------------------------------------//

// Edit user info
router.put('/update', function(req, res) {
  var userType = req.userType;
  var typeId = userType + '_id';
  var userDatabase = userType + 's';
  // var userId = req.userId;
  var userId = '58';

  var userData = {
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    avatar: null,
    company: null,
    job_title: null,
    zip: null,
    race: null,
    gender: null,
    orientation: null,
    birthday: null,
    school: null,
    degree: null,
    major: null,
    languages: null
  };

  var query = queryBuilder(userData) + ' WHERE id = $1';

  pg.connect(connectionString, function(error, client, done) {
    connectionErrorCheck(error);

    // Update the database
    client.query(query, [userData.id],
      function(error, result) {
        if(error) {
          console.log('Unable to update user information: ', error);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }
    );
  });
});

// Create a new FAQ entry
router.post('/new-faq', function(req, res) {
  var userId = req.userId;
  var question = req.body.question;
  var answer = req.body.answer;

  pg.connect(connectionString, function(error, client, done) {
    connectionErrorCheck(error);

    client.query(
      'INSERT INTO faq (mentor_id, question, answer) VALUES ($1, $2, $3)',
      [userId, question, answer],
      function(error, result) {
        if(error) {
          console.log('Error when creating new FAQ: ', error);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      }
    );
  });
});

// Edit an existing FAQ entry
router.put('/edit-faq/:faq-id', function(req, res) {
  var userId = req.userId;
  var faqId = req.body.faqId;
  var question = req.body.question;
  var answer = req.body.answer;

  pg.connect(connectionString, function(error, client, done) {
    connectionString(error);

    client.query(
      'UPDATE faq SET question = $1 AND answer = $2 WHERE id = $3',
      [question, answer, faqId],
      function(error, result) {
        if(error) {
          console.log('Error when updating FAQ: ', error);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      }
    );
  });
});

module.exports = router;

// Checks for errors connecting to the database
function connectionErrorCheck(error) {
  if (error) {
    console.log('Database connection error: ', error);
    res.sendStatus(500);
  }
}

// Cunstructs SQL query based off of user defined search paramaters
function queryBuilder(object) {
  console.log('OBJECT IN QUERY BUILDER', object);
  var query = 'UPDATE mentors SET';

  // query builder logic goes here

  for(var property in object) {
    if(object[property]) {
      query += ' ' + property + ' = \'' + object[property] + '\' AND';
    }
  }

  // query = query.slice(0, -4);
  if (query === 'UPDATE mentors SET') {
    query = 'SELECT * FROM mentors';
  }
  return query;
}
