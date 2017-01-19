var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/db-config.module');

//get messages
router.get('/', function(res, res){
  console.log('req.headers: ', req.headers);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query('SELECT message FROM messages WHERE $1 = $2',
    //[mentor_id or student_id, id value],
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


//post new message from student
router.post('/', function(req, res){
  console.log('req.body: ', req.body);
  var newMessage = req.body;
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query('INSERT INTO messages (mentor_id, student_id, date_sent, date_replied, subject, message, student_name)' +
    'VALUES ($1, $2, $3, $4, $5, $6, $7)',
    //[values],
    function(err, result){
      done();
      if(err){
        console.log('insert query error: ', err);
        res.sendStatus(500);
      }else{
        res.sendStatus(201);
      }
    });
  });
});


//mark message as"read"
router.put('/:id', function(req, res){
  //something
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query('UPDATE messages SET message_read=TRUE WHERE id=$1',
    //[id value],
    function(err, result){
      if(err){
        console.log('update error: ', err);
        res.sendStatus(500);
      }else{
        res.sendStatus(200);
      }
    });
  });
});


//add reply message
router.put('/:id', function(req, res){
  //something
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query('UPDATE messages SET reply=$1 WHERE id=$2',
    [],   //change
    function(err, result){
      if(err){
        console.log('update error: ', err);
        res.sendStatus(500);
      }else{
        res.sendStatus(200);
      }
    });
  });
});


//delete message
router.delete('/:id', function(req, res){
  console.log('req.params: ', req.params);
  //something
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query('DELETE FROM messages WHERE id=$1',
    [],   //change
    function(err, result){
      done();
      if(err){
        console.log('delete query error: ', err);
        res.sendStatus(500);
      }else{
        res.sendStatus(200);
      }
    });
  });
});


module.exports = router;
