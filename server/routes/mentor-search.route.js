//----------------------------------------------------------------------------//
var express = require('express');
var router = express.Router();
var pg = require('pg');
var pg_escape = require('pg-escape');
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
//----------------------------------------------------------------------------//

// For searching the database from the search page ---------------------------//
router.get('/search', function(req, res) {

  var queryObject = JSON.parse(req.headers.newsearchstring);
  console.log('Query object from client: ', queryObject);

  var query = queryBuilder(queryObject);
  console.log('Built query: ', query);

  var propertyArray = propertyArrayBuilder(queryObject);
  console.log('Built array: ', propertyArray);

  pg.connect(connectionString, function(error, client, done) {
    if (error) {
      console.log('connection error: ', error);
      res.sendStatus(500);
    }

    client.query(query, propertyArray, function(error, result) {
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
//----------------------------------------------------------------------------//

// Constructs SQL query based off of user defined search paramaters ----------//
function queryBuilder(object) {
  var index = 0;
  var query = 'SELECT * FROM mentors';

  if (object.generic_search) {
    index++;
    query += ' WHERE' +
      ' (first_name ILIKE $' + index +
      ' OR last_name ILIKE $' + index +
      ' OR blurb ILIKE $' + index +
      ' OR bio ILIKE $' + index +
      ' OR company ILIKE $' + index +
      ' OR job_title ILIKE $' + index +
      ' OR race ILIKE $' + index +
      ' OR gender ILIKE $' + index +
      ' OR orientation ILIKE $' + index +
      ' OR school ILIKE $' + index +
      ' OR degree ILIKE $' + index +
      ' OR major ILIKE $' + index +
      ' OR languages ILIKE $' + index + ')';
  }

  for (var property in object) {
    if (object[property] && property !== 'generic_search') {
        query += ' AND ';
      if (property === 'gender') {
        index++;
        query += property + ' = $' + index;
      } else {
        index++;
        query += property + ' ILIKE $' + index;
      }
    }
  }

  return query;
}
//----------------------------------------------------------------------------//

// Constructs an array of property names for PG to use in the query
function propertyArrayBuilder(object) {
  var propertyArray = [];

  for (var property in object) {
    if (object[property]) {
      if (property === 'generic_search') {
        propertyArray.push('%' + object[property] + '%');
      } else if (property === 'gender'){
        propertyArray.push(object[property]);
      } else {
        propertyArray.push('%' + object[property] + '%');
      }
    }
  }

  return propertyArray;

}
//----------------------------------------------------------------------------//

module.exports = router;
