//----------------------------------------------------------------------------//
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/db-config.module');
//----------------------------------------------------------------------------//

// For bringing up a specific mentor profile ---------------------------------//
router.get('/profile/:id', function(req, res) {
  // The id of the mentor is transferred via the url and extracted using req.params
  var mentorID = req.params.id;

  // Add the mentor id to the SQL search query
  var query = 'SELECT * FROM mentors WHERE id = ' + mentorID;

  // Query the database and send the results back to the client
  pg.connect(connectionString, function(error, client, done) {
    if (error) {
      console.log('connection error: ', error);
      res.sendStatus(500);
    }

    client.query(query, function(error, result){
      done(); // Close connection to the database

      if (error) {
        console.log('select query error: ', error);
        res.sendStatus(500);
      }
      // console.log('result.rows: ', result.rows);
      res.send(result.rows);
    });
  });
});

// For searching the database from the search page ---------------------------//
router.get('/search', function(req, res) {

  var queryObject = JSON.parse(req.headers.newsearchstring);
  // console.log('Query object: ', queryObject);

  var query = queryBuilder(queryObject);
  // console.log('Built query: ', query);

  pg.connect(connectionString, function(error, client, done) {
    if (error) {
      console.log('connection error: ', error);
      res.sendStatus(500);
    }

    client.query(query, function(error, result) {
      done(); // Close connection to the database

      if (error) {
        console.log('select query error: ', error);
        res.sendStatus(500);
      }

      // console.log('result.rows: ', result.rows);
      res.send(result.rows);
    });
  });
});

// Cunstructs SQL query based off of user defined search paramaters ----------//
function queryBuilder(object) {

  var query;

  if(object.generic_search) {
    query = 'SELECT * FROM mentors ' +
            'WHERE first_name ILIKE \'%'    + object.generic_search +
            '%\' OR last_name ILIKE \'%'    + object.generic_search +
            '%\' OR email ILIKE \'%'        + object.generic_search +
            '%\' OR blurb ILIKE \'%'        + object.generic_search +
            '%\' OR bio ILIKE \'%'          + object.generic_search +
            '%\' OR company ILIKE \'%'      + object.generic_search +
            '%\' OR job_title ILIKE \'%'    + object.generic_search +
            '%\' OR race ILIKE \'%'         + object.generic_search +
            '%\' OR gender ILIKE \'%'       + object.generic_search +
            '%\' OR orientation ILIKE \'%'  + object.generic_search +
            '%\' OR school ILIKE \'%'       + object.generic_search +
            '%\' OR degree ILIKE \'%'       + object.generic_search +
            '%\' OR major ILIKE \'%'        + object.generic_search +
            '%\' OR languages ILIKE \'%'    + object.generic_search +
            '%\' AND ';
  } else {
    query = 'SELECT * FROM mentors WHERE ';
  }

  for (var property in object) {
    if (object[property] && property !== 'generic_search') {
      query += property + ' ILIKE \'' + object[property] + '\' AND ';
    }
  }

  query = query.slice(0, -4);
  if (query == 'SELECT * FROM mentors W') {
    query = 'SELECT * FROM mentors';
  }

  console.log('Query after query builder: ', query);

  return query;
}

module.exports = router;
