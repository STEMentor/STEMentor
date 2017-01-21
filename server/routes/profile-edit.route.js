//----------------------------------------------------------------------------//
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/db-config.module');
//----------------------------------------------------------------------------//

<<<<<<< HEAD
// Edit user profile info ----------------------------------------------------//
router.put('/update', function(req, res) {
  // console.log('ARRIVED IN EDIT ROUTE');
  // console.log('USER DATA:', req.body.userData);
  var userData = req.body.userData;
  var userId = req.userStatus.userId;
=======
// Edit user info ------------------------------------------------------------//
router.put('/update/:id', function(req, res) {
  console.log('ARRIVED IN EDIT ROUTE');
  console.log('USER DATA:', req.body.userData);
  var userData = req.body.userData;

  var userType = req.userStatus.userType;
  var typeId = userType + '_id';
  var userDatabase = userType + 's';
  var userId;

  console.log("USER ID IN PARAMS", req.params.id);
  userId = assignUserId(req);

  // userId = req.userStatus.userId;
>>>>>>> dev

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
<<<<<<< HEAD
router.put('/edit-faq', function(req, res) {
  var userId = req.userStatus.userId;
  var faqArray = req.body.faqArray;
  console.log('--- profile-edit.route faqArray: ', faqArray);

  var queryObject = faqEditQueryBuilder(faqArray, userId);
  console.log('queryObject', queryObject);
=======
router.put('/edit-faq/:faq-id', function(req, res) {
  var userId;
  var faqId = req.body.faqId;
  var question = req.body.question;
  var answer = req.body.answer;
>>>>>>> dev

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

module.exports = router;

// Checks for errors connecting to the database ------------------------------//
function connectionErrorCheck(error) {
  if (error) {
    console.log('Database connection error: ', error);
    res.sendStatus(500);
  }
}
//----------------------------------------------------------------------------//

<<<<<<< HEAD
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
=======
// Assign user id to the mentor id if user is an admin -----------------------//
function assignUserId(req){
  console.log("THIS IS REQ IN ASSIGN USER ID", req.params.id);
  if(req.userStatus.isAdmin === true){
    return req.params.id;
  } else {
    return req.userStatus.userId;
  }
}

// Cunstructs SQL query based off of user defined search paramaters ----------//
function queryBuilder(object) {
  console.log('OBJECT IN QUERY BUILDER', object);
  var query = 'UPDATE mentors SET';

  for(var property in object) {
    if(object[property]) {
      query += ' ' + property + ' = \'' + object[property] + '\',';
>>>>>>> dev
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
