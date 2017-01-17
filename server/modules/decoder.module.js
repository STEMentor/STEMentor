var admin = require('firebase-admin');
var express = require('express');
var pg = require('pg');
var connectionString = require('../modules/db-config.module');


admin.initializeApp({
  credential: admin.credential.cert({
    "type": process.env.FIREBASE_SERVICE_ACCOUNT_TYPE,
    "project_id": process.env.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY,
    "client_email": process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_URI,
    "token_uri": process.env.FIREBASE_SERVICE_ACCOUNT_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL
  }),
  databaseURL: "https://stementor.firebaseio.com"
});

/* Pull id_token off of the request,
verify it against firebase service account private_key.
Then add the decodedToken */
var tokenDecoder = function(req, res, next){
  //console.log("ID TOKEN",req.headers.id_token);
  console.log("TYPE IN DECODER", req.headers.type);
  var userType = req.headers.type;
  console.log('USER TYPE:', userType);

  if(req.headers.id_token){
    console.log('TOKEN DECODER');
    admin.auth().verifyIdToken(req.headers.id_token).then(function(decodedToken) {
      // Adding the decodedToken to the request so that downstream processes can use it
      req.decodedToken = decodedToken;
      console.log('GOT DECODED TOKEN');
      // next();

      // call this function to check attach user_id to the request
      // if they are already in the db. If they aren't, add them
      userIdQuery(decodedToken.email, req, res, next, userType);
    })
    .catch(function(error) {
      // If the id_token isn't right, you end up in this callback function
      // Here we are returning a forbidden error
      console.log('User token could not be verified');
      res.send(403);
    });

  } else {
    console.log('NO ID TOKEN');
    res.send(403);
  }
};

//This runs everytime a request goes through decoder
function userIdQuery(userEmail, req, res, next, userType){
  return pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    req.newUser = false;
    //Checking to see is user exists in db and if not, adds them based on type
    if(userType){
      req.userType = userType;
      userType = userType + 's'; // Add 's' to match tables (mentors, students)

      // TODO sanitize userType input

      client.query('SELECT id FROM ' + userType + ' WHERE email = $1',
      [userEmail],
      function(err, result) {
        done(); // close the connection.

        if(err) {
          console.log('select query error: ', err);
          res.sendStatus(500);
        } else {
          //If not in db, insert new user into db
          if(result.rows.length === 0){
            console.log("ENTER IF STATEMENT. userEmail:", userEmail);
            client.query(
              'INSERT INTO ' + userType +' (email) ' +
              'VALUES ($1)',
              [userEmail],
              function(err, result) {
                done(); // close the connection.

                if(err) {
                  console.log('insert query error: ', err);
                  res.sendStatus(500);
                } else {
                  console.log("INSERT SUCCESSFUL!");
                  req.newUser = true;

                  next();
                }

              });
            } else {
              //If already in db, attach userId to req
              if(result.rows.length === 1){
                var userId = result.rows[0].id;
                req.userId = userId; // this is the id that corresponds to users email in users table
                console.log('USER ID DECODER:', userId);

                next();
              }
            }


          }
        });
      } else {
        //If there is no userType, check db to see which table user is in, then attach userType to req
        client.query('SELECT students.email AS student, mentors.email AS mentor, students.id AS student_id, mentors.id AS mentor_id '+
        'FROM mentors '+
        'FULL OUTER JOIN students ON mentors.email = students.email '+
        'WHERE students.email=$1 OR mentors.email=$1',
        [userEmail],
        function(err, result) {
          done();
          if(err) {
            console.log('select query error: ', err);
            res.sendStatus(500);
          } else {
            console.log("RESULT: ", result.rows[0]);
            var userObject = result.rows[0];
              for (var property in userObject){
                if (userObject[property] !== null && typeof userObject[property] === 'string'){
                  req.userType = property;

                  // req.userId = userObject.id;
                }
                if (userObject[property] !== null && typeof userObject[property] === 'number'){
                  req.userId = userObject[property];
                }
              }
              console.log('req.userType: ', req.userType);
              console.log('req.userId: ', req.userId);
              next();

            }
          });
        }
      });

  }

  module.exports = { token: tokenDecoder };
