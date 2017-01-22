//----------------------------------------------------------------------------//
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/db-config.module');
//----------------------------------------------------------------------------//

// Get messages for specific user --------------------------------------------//
router.get('/get-all-messages', function(req, res) {
  // console.log('req.decodedToken: ', req.decodedToken);

  // Pull needed data off of req
  var userEmail = req.decodedToken.email;
  var userType = req.userStatus.userType;
  // console.log("USER TYPE:", userType);
  var typeId = userType + '_id';
  var userDatabase = userType + 's';
  var userId = req.userStatus.userId;

  pg.connect(connectionString, function(error, client, done){
    connectionErrorCheck(error);
    // console.log('message route userType: ', userType);
    // console.log('message route userId: ', userId);
    // Query the database for the user's messages
    client.query(
      'SELECT * FROM messages where ' + typeId + ' = $1', [userId],
      function(error, result) {
        done(); // Close connection to database

        if (error) {
          console.log('Database SELECT error when searching for user messages: ', error);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      }
    );
  });
});

// Get all unread messages for current user ----------------------------------//
router.get('/unread-messages', function(req, res) {
  console.log("IN UNREAD-MESSAGES ROUTE");
  console.log("UserId", userId);
  // Pull needed data off of req
  var userType = req.userStatus.userType,
      typeId = userType + '_id';
  var userId = req.userStatus.userId;

  pg.connect(connectionString, function(error, client, done) {
    connectionErrorCheck(error);

    client.query(
      'SELECT * ' +
      'FROM messages ' +
      'WHERE message_read = FALSE AND $1 = $2;',
      [typeId, userId],
      function(error, result) {
        done(); // Close connection to the database

        if (error) {
          console.log('Unable to mark message as read: ', error);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }
    );
  });

  // Create new message (from student) when user hits the "Send" button --------//
  router.post('/new-message', function(req, res) {
    // console.log('req.body: ', req.body);
    var message = req.body.message_info;

    pg.connect(connectionString, function(error, client, done) {
      connectionErrorCheck(error);

      // Find mentor_id
      client.query(
        'SELECT id FROM mentors WHERE email = $1', [message.email],
        function(error, result) {
          done(); // Close connection to the database

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
              [mentorId, req.userStatus.userId, message.msgSubject, message.msgBody, message.msgName],
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


});

// Mark message as read ------------------------------------------------------//
router.put('/read-message', function(req, res) {
  // Pull needed data off of req
  var userEmail = req.decodedToken.email;

  var userType = req.userStatus.userType,
  typeId = userType + '_id',
  userDatabase = userType + 's';
  var userId = req.userStatus.userId;
  var messageId = req.body.message.id;
  // console.log('userEmail: ', userEmail);
  // console.log('messageId: ', messageId);

  pg.connect(connectionString, function(error, client, done) {
    connectionErrorCheck(error);

    client.query(
      'UPDATE messages SET message_read = TRUE WHERE id = $1',
      [messageId],
      function(error, result) {
        done(); // Close connection to the database

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

// Reply to message ----------------------------------------------------------//
router.put('/reply', function(req, res) {
  // console.log('req.body: ', req.body);

  var messageId = req.body.message_info.msgId;
  var messageReply = req.body.message_info.msgBody;

  pg.connect(connectionString, function(error, client, done) {
    connectionErrorCheck(error);

    client.query(
      'UPDATE messages SET reply = $1 WHERE id = $2',
      [messageReply, messageId],
      function(error, result) {
        done(); // Close connection to the database

        if (error) {
          console.log('UPDATE database error: ', error);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }
    );
  });
});

module.exports = router;

// Checks for errors connecting to the database ------------------------------//
function connectionErrorCheck(error) {
  if (error) {
    console.log('Database connection error: ', error);
    res.sendStatus(500);
  }
}
