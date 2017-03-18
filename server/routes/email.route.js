//----------------------------------------------------------------------------//
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var pg = require('pg');
var connectionString = require('../modules/db-config.module');
//----------------------------------------------------------------------------//

// Find email of receiver of in app msg then send email notification to them -//
router.post('/', function(req, res) {
  console.log('got to email route');
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
          console.log('email route about to send email');
          sendEmail(result.rows[0].email);
        }
      });
    }
  });
  //--------------------------------------------------------------------------//

  //--------------------------------------------------------------------------//
  function sendEmail(email){
    console.log('sendEmail function');
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
          user: 'ad.test.stementor@gmail.com',
          // pass: process.env.GMAIL_PASSWORD,
          clientId: '284578649449-3i6g61pbmrkd28fcc5ioktvl9qu7v307.apps.googleusercontent.com',
          clientSecret: 'X7nsj4zq1s_H6z5Fodc7YdXZ',
          refreshToken: '1/5KhXAF33P0fv7-V9H06NaH9keoedWDatAhFY_HITaoQ'
        })
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
          return console.log('sendMail error: ', error);
        } else{
          res.json({yo: info.response});
        }
      });
    }
  });
  //--------------------------------------------------------------------------//

  module.exports = router;
