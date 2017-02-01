//----------------------------------------------------------------------------//
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var pg = require('pg');
var connectionString = require('../modules/db-config.module');
//----------------------------------------------------------------------------//

// Find email of receiver of in app msg then send email notification to them -//
router.post('/', function(req, res) {
  var receiverId = req.body.receiverId;
  var userType = req.body.userType + 's';

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    } else {
      client.query('SELECT email FROM ' + userType + ' WHERE id = ' + receiverId,
      function(err, result) {
        done(); // close the connection.

        if(err) {
          console.log('select query error: ', err);
          res.sendStatus(500);
        } else {
          sendEmail(result.rows[0].email);
        }
      });
    }
  });
  //--------------------------------------------------------------------------//

  //--------------------------------------------------------------------------//
  function sendEmail(email){
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'ad.test.stementor@gmail.com',
        pass: process.env.GMAIL_PASSWORD
      } });

      // setup e-mail data with unicode symbols
      var mailOptions = {
        from: 'ad.test.stementor@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'STEMentor', // Subject line
        text: 'You have a new message! ', // plaintext body
        html: '<h2>You have a new message! </h2><h3>Click <a href="https://stementor.herokuapp.com">STEMentor</a> and log in to view your message</h3>' // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, function(error, info){
        if(error){
          return console.log(error);
        } else{
          res.json({yo: info.response});
        }
      });
    }
  });
  //--------------------------------------------------------------------------//

  module.exports = router;
