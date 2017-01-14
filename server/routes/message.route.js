//----------------------------------------------------------------------------//
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/db-config.module');
// TODO: Add correct decoded token variable below
// var decodedToken = tokenDecoder;
//----------------------------------------------------------------------------//

// Get messages for specific user
router.get('/', function(req, res) {
  var userEmail = req.decodedToken.email;
  var userType = req.headers.type;
  var typeId = userType + '_id';
  var userDatabase = userType + 's';
  var userId = req.userId;

  pg.connect(connectionString, function(error, client, done) {
    connectionErrorCheck();

    // Query database to get user's ID
    // Note: This may not be necessary
    client.query(
      'SELECT id FROM $1 WHERE email = $2', [userDatabase, userEmail],
      function(error, result) {
        done(); // Close connection to database
        databaseErrorCheck();

        if (error) {
          console.log('Database SELECT error when searching for user ID: ', error);
          res.sendStatus(500);
        }
      }
    )

    // Query messages database for all messages matching the user's ID
    // TODO: Check if it's possible to do multiple queries in one connection
    .then(
      client.query(
        'SELECT * FROM messages WHERE $1 = $2', [typeId, userId],
        function(error, result) {
          done(); // Close connection to database
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

// Create new message when user hits the "Send" button
router.post('/new-message', function(req, res) {
  var userId = req.userId;
  var userType = req.headers.type;
  var message = req.headers.message; // TODO: transfer message info in req.headers

  // Check that user is a student
  if (userType !== 'student') {
    console.log('User cannot create message');
    res.sendStatus(500);
  }

  pg.connect(connectionString, function(error, client, done) {
    connectionErrorCheck();

    // Create new message record
    client.query(
      'INSERT INTO messages' +
      '(mentor_id, student_id, date_sent, subject, message, student_name) ' +
      'VALUES ($1, $2, now(), $3, $4, $5)',
      [message.mentor_id, userId, message.subject, message.body, message.student_name],
      function(error, result) {
        done(); // Close connection to database
        if (error) {
          console.log('Error creating new message: ', error);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      }
    );
  });

});

// Mark message as read
router.put('/read-message', function(req, res) {
  var userId = req.userId;
  var messageId = req.headers.message.id; // TODO: Transfr message info in req.headers

  pg.connect(connectionString, function(error, client, done) {
    connectionErrorCheck();

    client.query(
      'UPDATE messages SET message_read = TRUE WHERE id = $1',
      [messageId],
      
    );
  });
});

function connectionErrorCheck() {
  if (error) {
    console.log('Database connection error: ', error);
    res.sendStatus(500);
  }
}

module.exports = router;
