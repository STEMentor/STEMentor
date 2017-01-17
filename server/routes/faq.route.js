//----------------------------------------------------------------------------//
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/db-config.module');
//----------------------------------------------------------------------------//

// Gets a user's FAQ entries
router.get('/:id', function(req, res) {
  var userId = req.params.id;

  pg.connect(connectionString, function(error, client, done) {
    connectionErrorCheck(error);

    client.query(
      'SELECT * FROM faq WHERE mentor_id = $1', [userId],
      function(error, result) {
        if(error) {
          console.log('Error when searching FAQ table: ', error);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      }
    );
  });
});

// Create a new FAQ entry
router.post('/', function(req, res) {

});

// Edit an existing FAQ entry
router.put('/', function(req, res) {

});

module.exports = router;

// Checks for errors connecting to the database
function connectionErrorCheck(error) {
  if (error) {
    console.log('Database connection error: ', error);
    res.sendStatus(500);
  }
}
