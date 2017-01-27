//----------------------------------------------------------------------------//
require('dotenv').config();
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var decoder = require('./modules/decoder.module');
var mentorSearch = require('./routes/mentor-search.route');
var users = require('./routes/users.route');
var message = require('./routes/message.route');
var profileEdit = require('./routes/profile-edit.route');
var profile = require('./routes/profile.route');
var email = require('./routes/email.route');
//----------------------------------------------------------------------------//

//---------------------------------- SETUP -----------------------------------//
app.use(express.static('./server/public'));
app.use(bodyParser.json());

//----------------------------- ROUTES & MODULES -----------------------------//
app.use('/mentor-search', mentorSearch);
app.use('/profile', profile);
app.use('/email', email);

app.use(decoder.token); // Above not authenticated, below is authenticated

app.use('/users', users);
app.use('/message', message);
app.use('/profile-edit', profileEdit);

//------------------------------- START SERVER -------------------------------//
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('Server is listening on port ' + app.get('port'));
});

//----------------------------------------------------------------------------//
