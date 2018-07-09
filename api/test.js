let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
//let server = require('server');
let should = chai.should();

var assert = require('assert');

var SERVERN = (process.env.SERVERN!=undefined)? process.env.SERVERN : "localhost";
var PORT = (process.env.PORT>0)? process.env.PORT : 80;

console.log

chai.use(chaiHttp);

  describe('/vin/check verify vin number WAUZZZF50JN016611', () => {
      it('verify if VIN WAUZZZF50JN016611 is valid', (done) => {
        console.log("http://"+SERVERN+":"+PORT)
        chai.request("http://"+SERVERN+":"+PORT)
            .get('/vin/check/WAUZZZF50JN016611')
            .end((err, res) => {
console.log("res: "+res)
                res.should.have.status(200);
              done();
            });
      });
  });



// include further tests here
