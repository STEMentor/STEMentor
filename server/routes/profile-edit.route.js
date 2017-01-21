//----------------------------------------------------------------------------//
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/db-config.module');
//----------------------------------------------------------------------------//

// Edit user profile info ----------------------------------------------------//
router.put('/update', function(req, res) {
  // console.log('ARRIVED IN EDIT ROUTE');
  // console.log('USER DATA:', req.body.userData);
  var userData = req.body.userData;
  var userId = req.userStatus.userId;

  var queryObject = profileEditQueryBuilder(userData, userId);

  if (queryObject.queryString !== 'UPDATE mentors SE WHERE id = $1') {
    pg.connect(connectionString, function(error, client, done) {
      connectionErrorCheck(error);

      // Update the database
      client.query(queryObject.queryString, queryObject.propertyArray,
        function(error, result) {
          done(); // Close connection to the database

          if(error) {
            console.log('Unable to update user information: ', error);
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }

        }
      );
    });
  }
});
//----------------------------------------------------------------------------//

// Create a new FAQ entry ----------------------------------------------------//
router.post('/new-faq', function(req, res) {
  var userId = req.userStatus.userId;
  var question = req.body.faqData.question;
  var answer = req.body.faqData.answer;
  console.log("FAQ OBJECT:", req.body.faqData);

  pg.connect(connectionString, function(error, client, done) {
    connectionErrorCheck(error);

    client.query(
      'INSERT INTO faq (mentor_id, question, answer) VALUES ($1, $2, $3)',
      [userId, question, answer],
      function(error, result) {
        done(); // Close connection to the database

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
//----------------------------------------------------------------------------//

// Edit an existing FAQ entry ------------------------------------------------//
router.put('/edit-faq', function(req, res) {
  var userId = req.userStatus.userId;
  var faqArray = req.body.faqArray;
  console.log('--- profile-edit.route faqArray: ', faqArray);

  var queryObject = faqEditQueryBuilder(faqArray, userId);

  pg.connect(connectionString, function(error, client, done) {
    connectionErrorCheck(error);

    client.query(queryObject.queryString, queryObject.propertyArray,
      function(error, result) {
        done(); // Close connection to the database

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
//----------------------------------------------------------------------------//

module.exports = router;

// Checks for errors connecting to the database ------------------------------//
function connectionErrorCheck(error) {
  if (error) {
    console.log('Database connection error: ', error);
    res.sendStatus(500);
  }
}
//----------------------------------------------------------------------------//

// Cunstructs SQL query based off of the profile fields ----------------------//
function profileEditQueryBuilder(object, userId) {
  var query = 'UPDATE mentors SET ';
  var array = [];
  var index = 0;

  for (var property in object) {
    if (object[property]) {
      index++;
      query += property + ' = $' + index + ', ';
      array.push(object[property]);
    }
  }

  index++;
  query = query.slice(0, -2);
  query += ' WHERE id = $' + index;
  array.push(userId);

  return {
    queryString: query,
    propertyArray: array
  };
}
//----------------------------------------------------------------------------//

// Constructs SQL query based off of updated FAQ info ------------------------//
function faqEditQueryBuilder(faqArray, userId) {
  // console.log('ARRAY IN QUERY BUILDER', array);

  var queryString = 'UPDATE faq SET ';
  var propertyArray = [];
  var questionString = 'question = CASE';
  var answerString = '';

  for (var index = 0; index < faqArray.length; index++) {
    questionString += ' WHEN ' + faqArray[index].id + ' THEN ' + faqArray[index].question;
    answerString += ' WHEN ' + faqArray[index].id + ' THEN ' + faqArray[index].answer;
  }

  console.log('questionString: ', questionString);
  console.log('answerString: ', answerString);

  // console.log('--- profile.edit queryString: ', queryString);
  // console.log('--- profile.edit propertyArray: ', propertyArray);
  // console.log('--- profile.edit index: ', index);

  return {
    queryString: queryString,
    propertyArray: propertyArray
  };
}
//----------------------------------------------------------------------------//
