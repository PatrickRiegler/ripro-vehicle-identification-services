

var lpchpattern=/(\bAG|\bSZ|\bZH|\bsZ)\s*(\d[0-9\s*0-9]{0,6})\b/
var tgpattern=/[0-9]{1,1}[a-zA-Z ]{2,2}[0-9]{0,5}$/g
var kbapattern=/[0-9]{1,1}[a-zA-Z ]{2,2}[0-9]{0,5}$/g
var lpchenabled=false;
var tgenabled=false;
var kbaenabled=false;



// var APIURL = "http://192.168.1.105:8090/image2text/image2text.php"
// var APIHOST = "ripro-svis-lb-96fd9452b00ef973.elb.eu-central-1.amazonaws.com"
var APIHOST = "localhost:8081"
var APIURL = "http://" +APIHOST + "/vin/findInImage"
function callApi(img) {
    var url = APIURL;
    console.log(url);
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //console.log(this.responseText);
        var response = JSON.parse(this.responseText);
        console.log(response);
	licensePlate = "";
	licensePlateConfidence = 0;
	otxt = "";
	typenGenehmigung = "";
	typenGenehmigungConfidence = 0;
	for(var i in response) {
		txt = response[i].DetectedText;
		confidence = response[i].Confidence;
		ctxt = otxt + txt;
		if(lpchenabled && (ctxt.match(lpchpattern) || txt.match(lpchpattern))) {
			lpa = ctxt.split(lpchpattern);
			olp = ""
			for(var z in lpa) {
				lp=olp.replace(/\s/g, '') + lpa[z].replace(/\s/g, '');
				if(lp.match(lpchpattern)) {
					if(licensePlateConfidence < confidence) {
						console.log("LicensePlate match:" + lp);
						console.log("confidence:" + confidence);
						licensePlate = lp.toUpperCase();
						licensePlateConfidence = confidence;
					}
				}
				// console.log(lp);
				olp = lp;
			}
		}
		if(ctxt.indexOf("1AC")!=-1) console.log("1AC...:"+ ctxt);
		if(tgenabled && (ctxt.match(tgpattern) || txt.match(tgpattern))) {
			tga = ctxt.split(" ");
			console.log(tga);
			otg = ""
			for(var z in tga) {
				tg=otg.replace(/\s/g, '') + tga[z].replace(/\s/g, '');
				if(tg.match(tgpattern)) {
					//if(typenGenehmigungConfidence < confidence) {
						console.log("Typengenehmigung match:" + tg);
						console.log("confidence:" + confidence);
						typenGenehmigung = tg.toUpperCase();
						typenGenehmigungConfidence = confidence;
					//}
				}
				// console.log(tg);
				otg = tg;
			}
		}
		if(ctxt.indexOf("1AC")!=-1) console.log("1AC...:"+ ctxt);
		if(kbaenabled && (ctxt.match(kbapattern) || txt.match(kbapattern))) {
			kbaa = ctxt.split(" ");
			console.log(kbaa);
			okba = ""
			for(var z in kbaa) {
				kba=okba.replace(/\s/g, '') + kbaa[z].replace(/\s/g, '');
				if(kba.match(kbapattern)) {
					//if(typenGenehmigungConfidence < confidence) {
						console.log("Typengenehmigung match:" + kba);
						console.log("confidence:" + confidence);
						typenGenehmigung = kba.toUpperCase();
						typenGenehmigungConfidence = confidence;
					//}
				}
				// console.log(kba);
				okba = kba;
			}
		}
		otxt = response[i].DetectedText;
	}
	if(licensePlate) $("#result").css('display', 'inline-block').append("<br><br>License Plate: "+licensePlate);
	if(typenGenehmigung) $("#result").css('display', 'inline-block').append("<br><br>Typengenehmigung: "+typenGenehmigung);
	if(response.vins && response.vins.length>0) {
          console.log(JSON.stringify(response.vins))
          response.vins.forEach(function (element) { $("#result").css('display', 'inline-block').append("<br><br>VIN: "+element) });
        }
      }
    };
    xhttp.send('{ "img": '+img+' }');
    // xhttp.send(img);


}



