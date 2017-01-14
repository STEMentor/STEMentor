//----------------------------------------------------------------------------//
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/db-config.module');
// TODO: Add correct decoded token variable below
// var decodedToken = tokenDecoder;
//----------------------------------------------------------------------------//

// Get messages for specific user
router.get('/', function(req, res){
  var userEmail = req.decodedToken.email;
  var userType = req.headers.type;
  var typeId = userType + '_id';
  var userDatabase = userType + 's';
  var userId = req.userId;

  pg.connect(connectionString, function(error, client, done){
    if (error) {
      console.log('Database connection error: ', error);
      res.sendStatus(500);
    }

    // Query database to get user's ID
    // Note: This may not be necessary
    client.query(
      'SELECT id FROM $1 WHERE email = $2',
      [userDatabase, userEmail],
      function (error, result) {
        done();
        if (error) {
          console.log('Database SELECT error when searching for user ID: ', error);
          res.sendStatus(500);
        }
      }
    )

    // Query messages database for all messages matching the user's ID
    .then(
      client.query(
        'SELECT * FROM messages WHERE $1 = $2',
        [typeId, userId],
        function (error, result) {
          done();
          if (error) {
            console.log('Database SELECT error when searching for user messages: ', error);
            res.sendStatus(500);
          } else {
            res.sendStatus(201).send(result.rows);
          }
        }
      )
    );

  });
});
