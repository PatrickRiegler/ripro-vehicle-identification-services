
vindecoderUrl = "https://api.vindecoder.eu/2.0";

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

function vindecoder(vin,info,debug,callback) {
  var apikey = process.env.APIKEY
  var secretkey = process.env.SECRETKEY
  var id = (info) ? "info-"+vin : vin
  if(debug) console.log("id: "+id)
  var controlsum = sha1(id+"|"+apikey+"|"+secretkey)
  if(debug) console.log(controlsum)
  var controlsum = controlsum.substr(0,10)
  if(debug) console.log(controlsum)
  var path = (info) ? "decode/info" : "decode"

  url = vindecoderUrl + "/" + apikey + "/" + controlsum + "/" + path + "/" + vin + ".json"
  if(debug) console.log(url)

  var options = {
    uri: url,
    method: "GET",
    json: true,
    headers: { 'Content-Type': 'application/json' }
  };
  rp(options).then(function (parsedBody) {
      json = JSON.stringify(parsedBody)
      console.log("typeof json: "+typeof json)
      console.log("json: "+json)
      callback(json)
  })

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

var initApi = function(req) {
 try {
   var start = process.hrtime();
   var debug = (req.query.debug && req.query.debug!=undefined)? req.query.debug : debug;
   var test = (req.query.test && req.query.test!=undefined)? req.query.test : test;
 } catch(err) {
   console.log(err)
 }
   return { 
	start: start,
        debug: debug,
        test: test
   };
}

