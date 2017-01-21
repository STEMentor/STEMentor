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
  var query = 'SELECT * FROM mentors WHERE ';

  /* If `object.generic_search` exists, we need to start our query off with a
  long `if` statement to search all table columns for that query */
  if (object.generic_search) {
    index++;
    query +=
      '(first_name ILIKE $' + index +
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

  // Next we loop through each of the query object's properties
  for (var property in object) {

    // First we check if the property has a value
    if (object[property]) {

      /* If `generic_search` has a value, that means the long search object
      above was created, so we need to add an `AND` to the end of the query
      in preparation for the rest of the query */
      if (property === 'generic_search') {
        query += ' AND ';
      }

      /* For the `gender` property, we want to make a more strict match, so we
      omit the `%` from that part of the query */
      else if (property === 'gender') {
        index++;
        query += property + ' = $' + index + ' AND ';
      }

      /* Finally, if the property is not `generic_search` or `gender`, we add a
      loose, case insensitive search to the query */
      else {
        index++;
        query += property + ' ILIKE $' + index + ' AND ';
      }
    }
  }

  /* After all of the above conditionals, if the query ends with `WHERE `, that
  means that no filter was applied, so we return all of the `mentors` data */
  if (query.endsWith('WHERE ')) {
    query = 'SELECT * FROM mentors';
  }

  /* If the query ends with `AND ` or ` AND`, that means some filters were
  used, and we need to slice off the trailing `AND` */
  else if (query.endsWith('AND ') || query.endsWith(' AND')) {
    query = query.slice(0, -4);
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
