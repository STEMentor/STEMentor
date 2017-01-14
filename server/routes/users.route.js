var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/db-config.module');


router.get('/', function(req, res) {
  // console.log('PARAMS', req.params.type)
  console.log('USER ID DECODER:', req.userId);
  console.log('ARRIVED IN USERS GET!');
  var userType = req.headers.type;
  var userEmail = req.decodedToken.email;
  console.log('USER EMAIL:', userEmail);
  var data = {};
  // get user from DB
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM ' + userType + ' WHERE email = $1',
      [userEmail],
      function(err, result) {
        done(); // close the connection.

        if(err) {
          console.log('select query error: ', err);
          res.sendStatus(500);
        }
        res.send(result.rows);
      });
    }
    });
  });
    //     console.log('Length of rows:', result.rows.length);
    //     if (result.rows.length === 1){
    //       data.userType = 'mentor';
    //       res.send(data);
    //     } else {
    //       if (result.rows.length === 0){
    //         client.query('SELECT * FROM students WHERE email = $1',
    //         [userEmail],
    //         //[mentor_id or student_id, id value],
    //         function(err, result){
    //           done();
    //           if(err){
    //             console.log('select query error: ', err);
    //             res.sendStatus(500);
    //           } else {
    //             if (result.rows.length === 1){
    //               data.userType = 'student';
    //               res.send(data);
    //             } else {
    //               data.userType = "Not in DB";
    //               res.send(data);
    //             }
    //           }
    //
    //         });
    //       }
    //     }
    //
    //
    //   });
    // }
    //
    // });
  // });

  // router.post('/', function(req, res) {
  //   console.log('POST SUCCESSFUL');
  //   var userEmail = req.decodedToken.email;
  //   pg.connect(connectionString, function(err, client, done) {
  //     if(err) {
  //       console.log('connection error: ', err);
  //       res.sendStatus(500);
  //     }
  //     client.query(
  //       'INSERT INTO users (email) ' +
  //       'VALUES ($1)',
  //       [userEmail],
  //       function(err, result) {
  //         done();
  //
  //         if(err) {
  //           console.log('insert query error: ', err);
  //           res.sendStatus(500);
  //         } else {
  //           res.sendStatus(201);
  //         }
  //       });
  //
  //   });
  //
  // });

  module.exports = router;
