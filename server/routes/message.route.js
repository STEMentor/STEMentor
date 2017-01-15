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
  var userType = req.headers.type,
      typeId = userType + '_id',
      userDatabase = userType + 's';
  var userId = req.userId;

  pg.connect(connectionString, function(error, client, done) {
    connectionErrorCheck();

    // Query database to get user's ID
    // Note: This may not be necessary
    client.query(
      'SELECT id FROM $1 WHERE email = $2', [userDatabase, userEmail],
      function(error, result) {
        if (error) {
          console.log('Database SELECT error when searching for user ID: ', error);
          res.sendStatus(500);
        } else {
          // Query messages database for all messages matching the user's ID
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
          );
        }
      }
    );
  });
});

// Create new message when user hits the "Send" button
router.post('/new-message', function(req, res) {
  var userId = req.userId; // provided by token decoder route
  // TODO: Make sure mentor email makes it onto the request
  var mentorEmail = req.headers.message.mentorEmail;
  // TODO: Check where message is coming through from the client
  var message = req.headers.message;

  pg.connect(connectionString, function(error, client, done) {
    connectionErrorCheck();

    // Find mentor_id
    client.query(
      'SELECT id FROM mentors WHERE email = $1', [mentorEmail],
      function(error, result) {
        if (error) {
          console.log('Database SELECT error when searching for mentor ID: ', error);
          res.sendStatus(500);
        } else {
          var mentorId = result.rows[0].id; // TODO: Verify this value is returning correctly
          // Create new message record
          client.query(
            'INSERT INTO messages' +
            '(mentor_id, student_id, date_sent, subject, message, student_name) ' +
            'VALUES ($1, $2, now(), $3, $4, $5)',
            [mentorId, userId, message.subject, message.body, message.student_name],
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
        }
      }
    );

  });

});

// Mark message as read
router.put('/read-message', function(req, res) {
  // TODO: Check where message is coming through from the client
  var messageId = req.headers.message.id;

  pg.connect(connectionString, function(error, client, done) {
    connectionErrorCheck();

    client.query(
      'UPDATE messages SET message_read = TRUE WHERE id = $1',
      [messageId],
      function(error, result) {
        if (error) {
          console.log('Unable to mark message as read: ', error);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }
    );
  });
});

// TODO: Build reply to message function

module.exports = router;

function connectionErrorCheck() {
  if (error) {
    console.log('Database connection error: ', error);
    res.sendStatus(500);
  }
}
