//----------------------------------------------------------------------------//
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/db-config.module');
//----------------------------------------------------------------------------//

//----------------------------------------------------------------------------//
router.get('/', function(req, res) {
  var data = {};
  data.userStatus = req.userStatus;
  res.send(data);
});
//----------------------------------------------------------------------------//

module.exports = router;
