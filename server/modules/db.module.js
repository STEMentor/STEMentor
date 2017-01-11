var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('./db-config.module');

router.get('/mentors', function(req, res) {
  console.log('req.headers: ', req.headers);
  var queryObject = req.headers;

  //stuff will go here

  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query('SELECT            ',
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
  var query = 'SELECT * FROM mentors WHERE ';
  for(property in queryObject){
    if (queryObject.hasOwnProperty(property)){
      query += property + ' = ' + queryObject[property];
    }
  }
}

queryObject = {
  first_name: null,
  last_name: null,
  email: null,
  company: null,
  job_title: null,
  zip: null,
  race: null,
  sex: null,
  orientation: null,
  birthday: null,
  school: null,
  degree: null,
  major: null,
  languages: null
}
