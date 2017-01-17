//----------------------------------------------------------------------------//
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/db-config.module');
//----------------------------------------------------------------------------//

// Edit user info
router.put('/update', function(req, res) {
  var userType = req.userType,
      typeId = userType + '_id',
      userDatabase = userType + 's';
  var userId = req.userId;

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

// Gets a user's FAQ entries
router.get('/faq', function(req, res) {

});

// Create a new FAQ entry
router.post('/faq', function(req, res) {

});

// Edit an existing FAQ entry
router.put('/faq', function(req, res) {

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
