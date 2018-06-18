var express = require('express');
var vinlite = require('vin-lite');
var bodyParser = require('body-parser');  
var querystring = require('querystring'); 

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());

debug = false;

function log(req,vin) {
  ip = req.connection.remoteAddress
  var log = new Object()
  log.ip = ip
  log.vin = vin
  console.log(JSON.stringify(log));
}

app.get('/vinCheck/:vin', function (req, res) {
   var debug = (req.query.debug && req.query.debug!=undefined)? req.query.debug : debug;
   var vin = req.params.vin;
   check = vinlite.isValid(vin);
   if(debug) {
     console.log(vin);
     console.log(check);
   }
   var vinCheck = new Object()
   vinCheck.vin = vin
   vinCheck.vinIsValid = check
   if(debug) console.log(vinCheck);
   vinCheck = JSON.stringify(vinCheck);
   log(req,"vinCheck","successful",vin)
   res.end(vinCheck);
})

app.get('/vinDecode/:vin', function (req, res) {
   var debug = (req.query.debug && req.query.debug!=undefined)? req.query.debug : debug;
   var vin = req.params.vin;
   decoded = vinlite.decode(vin);
   if(debug) {
     console.log(vin);
     console.log(typeof decoded);
     console.log(JSON.stringify(decoded));
   }
   if(typeof decoded == "object") {
     decoded = JSON.stringify(decoded);
   }
   log(req,"vinDecode","successful",vin)
   res.end(decoded);
})



var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("RiPro Vehicle Identification Services listening on http://%s:%s", host, port)

})
