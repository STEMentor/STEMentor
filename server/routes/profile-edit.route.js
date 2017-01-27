//----------------------------------------------------------------------------//
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/db-config.module');
//----------------------------------------------------------------------------//

// Edit user profile info ----------------------------------------------------//
router.put('/update/:id', function(req, res) {

  var userData = req.body.userData;
  // var userId = req.userStatus.userId;

  var userId = assignUserId(req);

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
router.put('/edit-faq/:id', function(req, res) {
  var userId;
  var faqArray = req.body.faqArray;

  var queryObject = faqEditQueryBuilder(faqArray, userId);

  userId = assignUserId(req);

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

// Delete a user and all related messages and FAQs from the database ---------//
router.delete('/delete-user/:id', function(req, res) {
  var isAdmin = req.userStatus.isAdmin;
  var userId = req.userStatus.userId;
  var userToDelete = req.params.id;

  if (isAdmin === true || userToDelete === userId){
    pg.connect(connectionString, function(error, client, done) {
      connectionErrorCheck(error);

      client.query(
        'DELETE FROM mentors WHERE id = $1', [userToDelete],
        function(error, result) {
          done(); // Close connection to the database

          if(error) {
            console.log('Error when deleting user: ', error);
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

// Delete an existing FAQ entry ----------------------------------------------//
router.delete('/delete-faq/:id', function(req, res) {
  var faqId = req.params.id;

  pg.connect(connectionString, function(error, client, done) {
    connectionErrorCheck(error);

    client.query(
      'DELETE FROM faq WHERE id = $1',
      [faqId],
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

// Assigns userId based on isAdmin -------------------------------------------//
function assignUserId(req){
  if(req.userStatus.isAdmin){
    return req.params.id;
  } else {
    return req.userStatus.userId;
  }
}
//----------------------------------------------------------------------------//

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

  var queryString = '';
  var propertyArray = [];
  var questionString = '';
  var answerString = '';
  var loopTracker = 0;

  for (var index = 0; index < faqArray.length; index++) {
    loopTracker++;
    questionString += ' WHEN $' + loopTracker;
    loopTracker++;
    questionString += ' THEN $' + loopTracker;
  }

  for (index = 0; index < faqArray.length; index++) {
    loopTracker++;
    answerString += ' WHEN $' + loopTracker;
    loopTracker++;
    answerString += ' THEN $' + loopTracker;
  }

  queryString +=
  'UPDATE faq ' +
  'SET question = CASE id' + questionString + ' END, ' +
  'answer = CASE id' + answerString + ' END';

  for (index = 0; index < faqArray.length; index++) {
    propertyArray.push(faqArray[index].faq_id, faqArray[index].question);
  }

  for (index = 0; index < faqArray.length; index++) {
    propertyArray.push(faqArray[index].faq_id, faqArray[index].answer);
  }

  return {
    queryString: queryString,
    propertyArray: propertyArray
  };
}
//----------------------------------------------------------------------------//

module.exports = router;
