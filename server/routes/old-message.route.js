var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/db-config.module');

//get messages
router.get('/', function(req, res) {
  console.log('req.headers: ', req.headers);
  pg.connect(connectionString, function(error, client, done) {
    if (error) {
      console.log('connection erroror: ', error);
      res.sendStatus(500);
    }
    client.query('SELECT message FROM messages WHERE $1 = $2',
      //[mentor_id or student_id, id value],
      function(error, result) {
        done();
        if (error) {
          console.log('select query erroror: ', error);
          res.sendStatus(500);
        }
        console.log('result.rows: ', result.rows);
        res.send(result.rows);
      });
  });
});


//post new message from student
router.post('/', function(req, res) {
  console.log('req.body: ', req.body);
  var newMessage = req.body;
  pg.connect(connectionString, function(error, client, done) {
    if (error) {
      console.log('connection erroror: ', error);
      res.sendStatus(500);
    }
    client.query('INSERT INTO messages (mentor_id, student_id, date_sent, date_replied, subject, message, student_name)' +
      'VALUES ($1, $2, $3, $4, $5, $6, $7)',
      //[values],
      function(error, result) {
        done();
        if (error) {
          console.log('insert query erroror: ', error);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
  });
});


//mark message as"read"
router.put('/:id', function(req, res) {
  //something
  pg.connect(connectionString, function(error, client, done) {
    if (error) {
      console.log('connection erroror: ', error);
      res.sendStatus(500);
    }
    client.query('UPDATE messages SET message_read=TRUE WHERE id=$1',
      //[id value],
      function(error, result) {
        if (error) {
          console.log('update erroror: ', error);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
  });
});


//add reply message
router.put('/:id', function(req, res) {
  //something
  pg.connect(connectionString, function(error, client, done) {
    if (error) {
      console.log('connection erroror: ', error);
      res.sendStatus(500);
    }
    client.query('UPDATE messages SET reply=$1 WHERE id=$2', [], //change
      function(error, result) {
        if (error) {
          console.log('update erroror: ', error);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
  });
});


//delete message
router.delete('/:id', function(req, res) {
  console.log('req.params: ', req.params);
  //something
  pg.connect(connectionString, function(error, client, done) {
    if (error) {
      console.log('connection erroror: ', error);
      res.sendStatus(500);
    }
    client.query('DELETE FROM messages WHERE id=$1', [], //change
      function(error, result) {
        done();
        if (error) {
          console.log('delete query erroror: ', error);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
  });
});


module.exports = router;
