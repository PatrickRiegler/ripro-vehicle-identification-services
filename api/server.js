var express = require('express');
var vinlite = require('vin-lite');
var bodyParser = require('body-parser');  
var querystring = require('querystring'); 
var cors = require('cors');

var fs = require('fs');

//var AWS = require('aws-sdk/clients/rekognition');
var AWS = require('aws-sdk');

var app = express();
app.use(cors());
app.use(bodyParser.json({ extended: false, limit: '50mb' }));  


debug = false;
test = false;

function log(req,method,status,performance,vin) {
  ip = req.connection.remoteAddress
  var log = new Object()
  log.ip = ip
  log.method = method
  log.status = status
  log.performance = performance
  log.vin = vin
  console.log(JSON.stringify(log));
}

var elapsed_time = function(debug,start,note){
    var precision = 3; // 3 decimal places
    var elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
    if(debug) console.log(process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms - " + note); // print message + time
    // start = process.hrtime(); // reset the timer
    return elapsed.toFixed(precision);
}

function detectText(img) {
   var awsrekognition = new AWS.Rekognition({region: 'eu-west-1'});
   var params = {
    Image: { 
      'Bytes': img
    }
   };
   awsrekognition.detectText(params,function(err, data) {
     console.log(data);
     /*
     if (err) console.log(err, err.stack); 
     else     return data;
     */
     return data;
   });
}

app.get('/vinCheck/:vin', function (req, res) {
 try {
   var start = process.hrtime();
   var debug = (req.query.debug && req.query.debug!=undefined)? req.query.debug : debug;
   var test = (req.query.test && req.query.test!=undefined)? req.query.test : test;
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
   if(!test) log(req,"vinCheck",200,elapsed_time(debug,start,"end vinCheck()"),vin)
   res.end(vinCheck);
 } catch(error) {
   console.error("error");
   res.statusCode = 500;
   if(!test) log(req,"vinCheck",500,elapsed_time(debug,start,"end vinCheck()"),vin)
   return res.json({ errors: ["vinCheck could not be performed"] });
 }
})

app.get('/vinDecode/:vin', function (req, res) {
 try {
   var start = process.hrtime();
   var debug = (req.query.debug && req.query.debug!=undefined)? req.query.debug : debug;
   var test = (req.query.test && req.query.test!=undefined)? req.query.test : test;
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
   if(!test) log(req,"vinDecode","successful",elapsed_time(debug,start,"end vinDecode()"),vin)
   res.end(decoded);
 } catch(error) {
   console.error(error.toString());
   res.statusCode = 500;
   if(!test) log(req,"vinDecode",500,elapsed_time(debug,start,"end vinCheck()"),vin)
   return res.json({ errors: ["vinDecode could not be performed"] });
 }
})


app.use('/findVinInImage', function (req, res) {
   var start = process.hrtime();
   var debug = (req.query.debug && req.query.debug!=undefined)? req.query.debug : debug;
   var test = (req.query.test && req.query.test!=undefined)? req.query.test : test;
   if (req.method === 'POST') {
      // Handle post info...
     var input = req.body;
     var imgb64 = input.img.substr(input.img.indexOf(",")+1);
     // console.log(img);
     // console.log(img.substr(0,100));
     var img = Buffer.from(imgb64, 'base64');
     detectText(img, function(imgText) {
       res.statusCode = 200;
       console.log(imgText.result);
       if(!test) log(req,"findVinInImage",200,elapsed_time(debug,start,"end findVinInImage()"))
       return res.end(imgText);
     });
   } 
/*
     else {
     // console.error(error.toString());
     res.statusCode = 500;
     if(!test) log(req,"findVinInImage",500,elapsed_time(debug,start,"end findVinInImage()"))
     return res.json({ errors: ["findVinInImage could not be performed"] });
   }

*/


})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("RiPro Vehicle Identification Services listening on http://%s:%s", host, port)

})
