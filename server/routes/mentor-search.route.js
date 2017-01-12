var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/db-config.module');

router.get('/', function(req, res) {
  console.log('req.headers: ', req.headers);
  var queryObject = JSON.parse(req.headers.newsearchstring);
  var query = '';
  console.log('QUERY OBJECT', queryObject);
  query = queryBuilder(queryObject);
  console.log('QUERY', query);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query(query,
      function(err, result){
      done();
      if(err){
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      console.log('result.rows: ', result.rows);
      res.send(result.rows);
    });
  });
});


function queryBuilder(object){
  console.log('OBJECT IN QUERY BUILDER', object);
  var query = 'SELECT * FROM mentors WHERE';
  for(property in object){
    if (typeof object[property] === 'string'){
    }
    if (object[property]){
      query += ' ' + property + ' = ' + "'" + object[property] + "'" + ' AND';
    }
  }
  query = query.slice(0, -4);
  if (query == 'SELECT * FROM mentors W'){
    query = 'SELECT * FROM mentors';
  }
  return query;
}

// queryObject = {
//   first_name: null,
//   last_name: null,
//   email: null,
//   company: null,
//   job_title: null,
//   zip: null,
//   race: null,
//   sex: null,
//   orientation: null,
//   birthday: null,
//   school: null,
//   degree: null,
//   major: null,
//   languages: null
// }


module.exports = router;
