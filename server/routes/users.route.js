var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/db-config.module');


router.get('/', function(req, res) {
  // console.log('PARAMS', req.params.type)
  console.log('USER ID DECODER:', req.userId);
  console.log('ARRIVED IN USERS GET!');
  // var userType = req.headers.type;
  var userEmail = req.decodedToken.email;
  console.log('USER EMAIL:', userEmail);
  var data = {};
  // get user from DB
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM mentors WHERE email = $1',
      [userEmail],
      function(err, result) {
        done(); // close the connection.

        if(err) {
          console.log('select query error: ', err);
          res.sendStatus(500);
        }
        console.log("RESULT: ", result.rows);
        if(result.rows.length === 1){
          data.userType = "mentor";
          data.user = result.rows[0];
          res.send(data);
          // console.log('DATA:', data);

        } else {
          client.query('SELECT * FROM students WHERE email = $1',
          [userEmail],
          function(err, result) {
            done(); // close the connection.

            if(err) {
              console.log('select query error: ', err);
              res.sendStatus(500);
            }
            console.log('LANDED IN STUDENTS QUERY!');
            console.log("RESULT: ", result.rows.length);
            if(result.rows.length === 1){

              data.userType = "student";
              data.user = result.rows[0];
              console.log('DATA:', data);
              res.send(data);
            }

          });
        }


      });
      console.log('DATA to send:', data);

    }

  });
  console.log('DATA to send:', data);
});

module.exports = router;
