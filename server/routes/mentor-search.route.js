var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/db-config.module');

// For bringing up a specific mentor profile
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
      done();
      if (error) {
        console.log('select query error: ', error);
        res.sendStatus(500);
      }
      console.log('result.rows: ', result.rows);
      res.send(result.rows);
    });
  });
});

// For searching the database from the search page
router.get('/', function(req, res) {
  console.log('req.headers: ', req.headers);
  var queryObject = JSON.parse(req.headers.newsearchstring);
  var query = '';
  console.log('QUERY OBJECT', queryObject);
  query = queryBuilder(queryObject);
  console.log('QUERY', query);
  pg.connect(connectionString, function(error, client, done) {
    if (error) {
      console.log('connection error: ', error);
      res.sendStatus(500);
    }
    client.query(query, function(error, result) {
      done();
      if (error) {
        console.log('select query error: ', error);
        res.sendStatus(500);
      }
      console.log('result.rows: ', result.rows);
      res.send(result.rows);
    });
  });
});

// Cunstructs SQL query based off of user defined search paramaters
function queryBuilder(object) {
  console.log('OBJECT IN QUERY BUILDER', object);
  var query = 'SELECT * FROM mentors WHERE';
  for (var property in object) {
    if (typeof object[property] === 'string') {}
    if (object[property]) {
      query += ' ' + property + ' = ' + "'" + object[property] + "'" + ' AND';
    }
  }
  query = query.slice(0, -4);
  if (query == 'SELECT * FROM mentors W') {
    query = 'SELECT * FROM mentors';
  }
  return query;
}

module.exports = router;
