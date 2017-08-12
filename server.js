// Base Node requirements
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

// Use for cleaner parsing of User Agent info
var useragent = require('express-useragent');


// Instantiating express app.
var app = module.exports = express();

// Get app running
app.use(cors());
app.use(bodyParser.json());
app.use(useragent.express());

// API URL
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/api/whoami.html');
  });

var api = '/api/whoami.html';
app.get(api, function(req, res, next){
  var language = req.acceptsLanguages();
  //var software = req.get('User-Agent');
  var software = "OS: " + req.useragent.os + ", Browser: " + req.useragent.browser;
  var ipaddress = req.ip;
  
  res.json({'ipaddress': ipaddress, 'language': language[0], 'software': software});
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Working!");
});