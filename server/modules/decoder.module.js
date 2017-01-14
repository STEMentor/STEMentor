var admin = require('firebase-admin');

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

  if(req.headers.id_token){
    console.log('TOKEN DECODER');
    admin.auth().verifyIdToken(req.headers.id_token).then(function(decodedToken) {
      // Adding the decodedToken to the request so that downstream processes can use it
      req.decodedToken = decodedToken;
      // req.userId = 17;
      console.log('GOT DECODED TOKEN');

      userIdQuery(decodedToken.email, req, next);
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
}

function userIdQuery(userEmail, req, next){
  return pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT id FROM users WHERE email = $1',
    [userEmail],
    function(err, result) {
      done(); // close the connection.

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      } else {
        console.log('Length of ROWS:', result.rows.length);
        if(result.rows.length === 1){
          var userId = result.rows[0].id;
          req.userId = userId; // this is the id that corresponds to users email in users table
          console.log('USER ID DECODER:', userId);
        }

        next();

      }

    });

  })
}

module.exports = { token: tokenDecoder };
