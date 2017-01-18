//----------------------------------------------------------------------------//
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/db-config.module');
//----------------------------------------------------------------------------//

// Gets a user's profile info and FAQ entries
router.get('/:id', function(req, res) {
  var userId = req.params.id;

  pg.connect(connectionString, function(error, client, done) {
    connectionErrorCheck(error);

    client.query(
      'SELECT * FROM mentors ' +
      'FULL OUTER JOIN faq ON mentors.id = faq.mentor_id ' +
      'WHERE mentors.id = $1', [userId],
      function(error, result) {
        done();
        if(error) {
          console.log('Error when searching mentors and FAQ tables: ', error);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      }
    );
  });
});

module.exports = router;

// Checks for errors connecting to the database
function connectionErrorCheck(error) {
  if (error) {
    console.log('Database connection error: ', error);
    res.sendStatus(500);
  }
}
