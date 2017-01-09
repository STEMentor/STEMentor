//----------------------------------------------------------------------------//
require('dotenv').config();
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var decoder = require('./modules/decoder.module');
//----------------------------------------------------------------------------//
//---------------------------------- SETUP -----------------------------------//
app.use(express.static('./server/public'));
app.use(bodyParser.json());


//----------------------- POSTGRES CONNECTION HANDLING -----------------------//


//----------------------------- ROUTES & MODULES -----------------------------//


app.use(decoder.token); // Above not authenticated, below is authenticated


//------------------------------- START SERVER -------------------------------//
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('Server is listening on port ' + app.get('port'));
});

//----------------------------------------------------------------------------//
