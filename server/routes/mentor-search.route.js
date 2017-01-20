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
//----------------------------------------------------------------------------//

// Constructs SQL query based off of user defined search paramaters ----------//
function queryBuilder(object) {
  var index = 0;
  var query;

  // If the generic search bar was used, the `object.generic_search` property
  // will have a value, and we need to build a query based on that.
  if (object.generic_search) {
    index++;
    query = 'SELECT * FROM mentors ' +
            'WHERE first_name ILIKE %$1% ' +
            'WHERE last_name ILIKE %$1% ' +
            'WHERE blurb ILIKE %$1% ' +
            'WHERE bio ILIKE %$1% ' +
            'WHERE company ILIKE %$1% ' +
            'WHERE job_title ILIKE %$1% ' +
            'WHERE race ILIKE %$1% ' +
            'WHERE gender ILIKE $1 ' +
            'WHERE orientation ILIKE %$1% ' +
            'WHERE school ILIKE %$1% ' +
            'WHERE degree ILIKE %$1% ' +
            'WHERE major ILIKE %$1% ' +
            'WHERE languages ILIKE %$1% ' +
            'AND ';

    // This loops through the properties of the query object
    for (var property in object) {
      if (object[property] && property !== 'generic_search') {

        // If gender has been specified in the search, we need to match this
        // exactly, not loosely like the other queries.
        if (property === 'gender') {
          index++;
          query += property + ' = $' + index + ' AND ';
        }

        else {
          index++;
          query += property + ' ILIKE $' + index + ' AND ';
        }
      }
    }

  // If no generic search was specified, we set the standard query string, and
  // loop through the same way as above.
  } else {
    query = 'SELECT * FROM mentors WHERE ';

    for (var property in object) {
      if (object[property] && property !== 'generic_search') {
        if (property === 'gender') {
          index++;
          query += property + ' = $' + index + ' AND ';
        } else {
          index++;
          query += property + ' ILIKE $' + index + ' AND ';
        }
      }
    }
  }

  // Slice off the last four characters to remove the trailing 'AND'
  query = query.slice(0, -4);

  // If no search filters were specified, the slice will still remove the last
  // four characters. The query well end up being 'SELECT * FROM mentors WH',
  // so this will set it to be a search to return all mentors from the database.
  if (query == 'SELECT * FROM mentors WH') {
    query = 'SELECT * FROM mentors';
  }

  return query;
}
//----------------------------------------------------------------------------//

// Constructs an array of property names for PG to use in the query
function propertyArrayBuilder(object) {
  
}
//----------------------------------------------------------------------------//

module.exports = router;
