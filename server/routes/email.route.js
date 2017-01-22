//----------------------------------------------------------------------------//
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
//---------------------------------------------------------------------------//
router.post('/', function(req, res) {
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'pivotpvttest@gmail.com',
      pass: process.env.GMAIL_PASSWORD
  } });

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: 'pivotpvttest@gmail.com', // sender address
    to: 'pivotpvttest@gmail.com', // list of receivers
    subject: 'STEMentor', // Subject line
    text: 'You have a new message! ', // plaintext body
    html: '<h1>You have a new message! </h1>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    } else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
  });
});

module.exports = router;
