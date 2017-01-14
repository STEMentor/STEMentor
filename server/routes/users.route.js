var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/db-config.module');


router.get('/', function(req, res) {
  // console.log('PARAMS', req.params.type)
  console.log('USER ID DECODER:', req.userId);
  console.log('ARRIVED IN USERS GET!');
  // var userEmail = req.decodedToken.email;
  // var userExists;
  // console.log('USER EMAIL:', userEmail);
  // // get verbs from DB
  // pg.connect(connectionString, function(err, client, done) {
  //   if(err) {
  //     console.log('connection error: ', err);
  //     res.sendStatus(500);
  //   } else {
  //   client.query('SELECT * FROM users WHERE email = $1',
  //   [userEmail],
  //   function(err, result) {
  //     done(); // close the connection.
  //
  //     if(err) {
  //       console.log('select query error: ', err);
  //       res.sendStatus(500);
  //     }
  //     console.log('Length of rows:', result.rows.length);
  //     userExists = result.rows.length > 0;
  //     res.send(userExists);
  //   });
  // }
  //
  // });
});

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
