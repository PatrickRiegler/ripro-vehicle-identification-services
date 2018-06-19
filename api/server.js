var express = require('express');
var vinlite = require('vin-lite');
var bodyParser = require('body-parser');  
var querystring = require('querystring'); 
var JSONPath = require('JSONPath');

var cors = require('cors');

var fs = require('fs');

//var AWS = require('aws-sdk/clients/rekognition');
var AWS = require('aws-sdk');

var app = express();
app.use(cors());
app.use(bodyParser.json({ extended: false, limit: '50mb' }));  


debug = false;
test = false;

function log(req,method,status,performance,payload) {
  ip = (req.connection) ? req.connection.remoteAddress : "internal";
  var log = new Object()
  log.ip = ip
  log.type = (method.indexOf("/")!=-1) ? "method" : "function";
  log.action = method
  log.status = status
  log.performance = performance
  log.payload = payload
  console.log(JSON.stringify(log));
}

var elapsed_time = function(debug,start,note){
    var precision = 2; // 3 decimal places
    var elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
    if(debug) console.log(process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms - " + note); // print message + time
    // start = process.hrtime(); // reset the timer
    return elapsed.toFixed(precision);
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function detectText(img,callback) {
   var startdetectText = process.hrtime();
   var awsrekognition = new AWS.Rekognition({region: 'eu-west-1'});
   var params = {
    Image: { 
      'Bytes': img
    }
   };
   awsrekognition.detectText(params,function(err, data) {
     if(debug) console.log(data);
     /*
     if (err) console.log(err, err.stack); 
     else     return data;
     */
     var imgText = data;
     if(!test) log("","detectText",0,elapsed_time(debug,startdetectText,"end detectText()"),imgText.TextDetections.length)
     callback(imgText);
   });
}

function findVinInText(txt) {
   var startfindVinInText = process.hrtime();
   var txtarr = "";
   if(typeof txt == "object") {
     for(i=0;i<txt.length;i++) if(txt[i].DetectedText!="undefined") txtarr += txt[i].DetectedText+" "
     txt = txtarr
   }
   if(typeof txt == "array") {
    txt = txt.merge(" ");
   }
   txtsplit = txt.split(" ");
   if(debug) console.log(txt);
   var vins = [];
   for(i=0;i<txtsplit.length;i++) {
     if(txtsplit[i].length>=3) {
       if(debug) console.log(txtsplit[i]);
       var q=i;
       var txtcurr = "";
       for(z=0;z<15;q++) {
         if(debug) console.log("q: "+q+"  ---  i: "+i+"  ---  txtcurr: "+txtcurr+"  ---  txtsplit[q]: "+txtsplit[q]);
	 txtcurr += txtsplit[q];
         txtcurr = txtcurr.replace(/\s/g, '');
         z=txtcurr.length;
       }
       if(txtcurr.length>15 && txtcurr.length<18) {
         txtcurr = txtcurr.toUpperCase();
         txtcurr = txtcurr.replace("O","0")
         if(vinlite.isValid(txtcurr)) {
           if(debug) console.log(txtcurr)
           vins.push(txtcurr)
         }
       }
     }
   }
   var uniqueVins = vins.filter( onlyUnique );
   if(debug) console.log(uniqueVins);
   if(!test) log("","findVinInText",0,elapsed_time(debug,startfindVinInText,"end findVinInText()"),uniqueVins.length)
   return uniqueVins;
}

/* deactivated for the moment....
var initApi = function(req) {
 try {
   console.log("between1")
   var start = process.hrtime();
   var debug = (req.query.debug && req.query.debug!=undefined)? req.query.debug : debug;
   var test = (req.query.test && req.query.test!=undefined)? req.query.test : test;
   console.log("between2")
 } catch(err) {
   console.log(err)
 }
   return { 
	start: start,
        debug: debug,
        test: test
   };
}
*/


app.post('/vin/check/:vin', function (req, res) {
  // to be implemented
  console.log("not yet implemented");
});


app.get('/vin/check/:vin', function (req, res) {
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
   if(!test) log(req,"vin/check",200,elapsed_time(debug,start,"end vin/check()"),vin)
   res.end(vinCheck);
 } catch(error) {
   console.error("error");
   res.statusCode = 500;
   if(!test) log(req,"vin/check",500,elapsed_time(debug,start,"end vin/check()"),vin)
   return res.json({ errors: ["vin/check could not be performed"] });
 }
})

app.get('/vin/decode/:vin', function (req, res) {
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
   if(!test) log(req,"vin/decode","successful",elapsed_time(debug,start,"end vin/decode()"),vin)
   res.end(decoded);
 } catch(error) {
   console.error(error.toString());
   res.statusCode = 500;
   if(!test) log(req,"vin/decode",500,elapsed_time(debug,start,"end vin/decode()"),vin)
   return res.json({ errors: ["vin/decode could not be performed"] });
 }
})

app.get('/vin/decodepro/:vin', function (req, res) {
  // to be implemented
  console.log("not yet implemented");
});

app.post('/vin/findInImage', function (req, res) {
   var start = process.hrtime();
   var debug = (req.query.debug && req.query.debug!=undefined)? req.query.debug : debug;
   var test = (req.query.test && req.query.test!=undefined)? req.query.test : test;
   if (req.method === 'POST') {
     var input = req.body;
     var imgb64 = input.img.substr(input.img.indexOf(",")+1);
     // console.log(img);
     if(debug) console.log(img.substr(0,100));
     var img = Buffer.from(imgb64, 'base64');
     detectText(img, function(imgText) {
       if(debug) console.log(imgText);
       if(imgText.TextDetections) {
         res.statusCode = 200;
         if(debug) console.log(imgText.TextDetections);
         vinvals = findVinInText(imgText.TextDetections);
         if(vinvals.length>0) {
           var vinres = {
             vins: vinvals
           }
           if(debug) console.log(JSON.stringify(vinres));
           if(!test) log(res,"vin/findInImage",200,elapsed_time(debug,start,"end vin/findInImage()"),vinvals.length)
           return res.end(JSON.stringify(vinres));
         } else {
           if(!test) log(req,"vin/findInImage",500,elapsed_time(debug,start,"end vin/findInImage()"))
           return res.json({ errors: ["vin/findInImage could not find any valid VIN numbers on the image"] });
         }
       } else {
         if(!test) log(req,"vin/findInImage",500,elapsed_time(debug,start,"end vin/findInImage()"))
         return res.json({ errors: ["vin/findInImage could not be performed"] });
       }
     });
   } 

})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("RiPro Vehicle Identification Services listening on http://%s:%s", host, port)

})
