var express = require('express');
var http = require('http');
var https = require('https');
var vinlite = require('vin-lite');
var bodyParser = require('body-parser');  
var querystring = require('querystring'); 
var JSONPath = require('JSONPath');
var sha1 = require('sha1');
var request = require('request');
var rp = require('request-promise');

var cors = require('cors');

var fs = require('fs');

var AWS = require('aws-sdk');

var app = express();
app.use(cors());
app.use(bodyParser.json({ extended: false, limit: '50mb' }));  

// include library
eval(fs.readFileSync('./lib.js')+'');

app.get('/', function (req, res) {
  res.statusCode = 200;
  return res.json({ response: "successful" });
});

app.get('/healthcheck', function (req, res) {
  res.statusCode = 200;
  return res.json({ response: "successful" });
});

app.post('/vin/check', function (req, res) {
  // initialize the function
  var init = initApi(req);

  try {

    var vins = req.body.vins;
    var result = {};
    for(i=0;i<vins.length;i++) {
      if(init.debug) console.log(vins[i]);
      result[vins[i]] = vinlite.isValid(vins[i]);
    }
    if(init.debug) console.log("result: "+JSON.stringify(result))
    if(!init.test) log(req,"vin/check",200,elapsed_time(init.debug,init.start,"end vin/check()"),JSON.stringify(result))
    return res.json(JSON.stringify(result));

  } catch (err) {

    res.statusCode = 500;
    console.log(err)
    if(!vins) vins = "{ error: 'value vins not set' }"
    if(!init.test) log(req,"vin/check",500,elapsed_time(init.debug,init.start,"end vin/check()"),vins.toString())
    return res.json({ errors: ["vin/check could not be performed"] });

  }
});


app.get('/vin/check/:vin', function (req, res) {
 try {
   var init = initApi(req);
   var vin = req.params.vin;

   check = vinlite.isValid(vin);
   if(init.debug) {
     console.log(vin);
     console.log(check);
   }
   var vinCheck = new Object()
   vinCheck.vin = vin
   vinCheck.vinIsValid = check
   if(init.debug) console.log(vinCheck);

   vinCheck = JSON.stringify(vinCheck);
   if(!init.test) log(req,"vin/check",200,elapsed_time(init.debug,init.start,"end vin/check()"),vin)
   res.end(vinCheck);

 } catch(error) {

   console.error("error");
   res.statusCode = 500;
   if(!init.test) log(req,"vin/check",500,elapsed_time(init.debug,init.start,"end vin/check()"),vin)
   return res.json({ errors: ["vin/check could not be performed"] });

 }
})

app.get('/vin/decode/:vin', function (req, res) {
 try {
   var init = initApi(req);
   var vin = req.params.vin;

   decoded = vinlite.decode(vin);
   if(init.debug) { console.log(vin); console.log(typeof decoded); console.log(JSON.stringify(decoded)); }

   if(typeof decoded == "object") {
     decoded = JSON.stringify(decoded);
   }
   if(!init.test) log(req,"vin/decode","successful",elapsed_time(init.debug,init.start,"end vin/decode()"),vin)
   res.end(decoded);

 } catch(error) {

   console.error(error.toString());
   res.statusCode = 500;
   if(!init.test) log(req,"vin/decode",500,elapsed_time(init.debug,init.start,"end vin/decode()"),vin)
   return res.json({ errors: ["vin/decode could not be performed"] });

 }
})

app.get('/vin/decodePro/:vin', function (req, res) {
 var init = initApi(req);
 try {
   var vin = req.params.vin;
   var decoded = vin;
   var json = vindecoder(vin, false, init.debug, function (callback) {
     console.log("vd - typeof: "+typeof callback)
     console.log("callback: "+callback)
     if(!init.test) log(req,"vin/decodePro","successful",elapsed_time(init.debug,init.start,"end vin/decodePro()"),json)
     res.end(callback);
   });

 } catch(error) {

   console.error(error.toString());
   res.statusCode = 500;
   if(!init.test) log(req,"vin/decodePro",500,elapsed_time(init.debug,init.start,"end vin/decodePro()"),vin)
   return res.json({ errors: ["vin/decodePro could not be performed"] });

 }
});

app.get('/vin/decodePro/info/:vin', function (req, res) {
 var init = initApi(req);
 try {
   var vin = req.params.vin;
   var decoded = vin;
   var json = vindecoder(vin, true, init.debug, function (callback) {
     console.log("vd - typeof: "+typeof callback)
     console.log("callback: "+callback)
     if(!init.test) log(req,"vin/decodePro/info","successful",elapsed_time(init.debug,init.start,"end vin/decodePro/info()"),json)
     res.end(callback);
   });

 } catch(error) {

   console.error(error.toString());
   res.statusCode = 500;
   if(!init.test) log(req,"vin/decodePro/info",500,elapsed_time(init.debug,init.start,"end vin/decodePro/info()"),vin)
   return res.json({ errors: ["vin/decodePro/info could not be performed"] });

 }
});

app.post('/vin/findInImage', function (req, res) {

   var init = initApi(req);

   if (req.method === 'POST') {
     var input = req.body;
     var imgb64 = input.img.substr(input.img.indexOf(",")+1);
     // console.log(img);
     if(init.debug) console.log(img.substr(0,100));
     var img = Buffer.from(imgb64, 'base64');

     detectText(img, function(imgText) {
       if(init.debug) console.log(imgText);
       if(imgText.TextDetections) {
         res.statusCode = 200;
         if(init.debug) console.log(imgText.TextDetections);
         vinvals = findVinInText(imgText.TextDetections);
         if(vinvals.length>0) {
           var vinres = {
             vins: vinvals
           }
           if(init.debug) console.log(JSON.stringify(vinres));
           if(!init.test) log(res,"vin/findInImage",200,elapsed_time(init.debug,init.start,"end vin/findInImage()"),vinvals.length)
           return res.end(JSON.stringify(vinres));
         } else {
           if(!init.test) log(req,"vin/findInImage",500,elapsed_time(init.debug,init.start,"end vin/findInImage()"))
           return res.json({ errors: ["vin/findInImage could not find any valid VIN numbers on the image"] });
         }
       } else {
         if(!init.test) log(req,"vin/findInImage",500,elapsed_time(init.debug,init.start,"end vin/findInImage()"))
         return res.json({ errors: ["vin/findInImage could not be performed"] });
       }
     });
   } 

})

var serverPort = (process.env.PORT>0)? process.env.PORT : 80;
var server = app.listen(serverPort, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("RiPro Vehicle Identification Services listening on Port: %s", port)

})

var options = {
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.crt'),
};

var serverPortSsl = (process.env.PORT>0)? process.env.SSLPORT : 443;
var serverSsl = https.createServer(options, app).listen(serverPortSsl, function () {

  var host = serverSsl.address().address
  var port = serverSsl.address().port

  console.log("RiPro Vehicle Identification Services (SSL) listening on Port: %s", port)

})
