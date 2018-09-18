var chai = require('chai')
  , chaiHttp = require('chai-http');

var assert = require('chai').assert
var expect = chai.expect;

var serverPort = (process.env.PORT>0)? process.env.PORT : 8081;
// console.log(serverPort)
chai.use(chaiHttp);
url="http://localhost:"+serverPort
chairequest = chai.request(url)

var fs = require('fs');
var array = fs.readFileSync('positivetestcases.test').toString().split("\n");
testCases=[]
for(i in array) {
  console.log(array[i]);
  if(array[i]!="") testCases.push("/vin/check/"+array[i])
}


describe('prove that, the response code is 200', function() {
  testCases.forEach(function(tc) {
    it('this test proves, that the response code for '+url+tc+' is 200', function(done) {
      // console.log(url+tc)
      chairequest.get(tc)
        .end(function(error, response) {
          expect(error).to.be.null;
          expect(response).to.have.status(200);
          assert.equal(200,response.status);
          done();
        });
    });
  })
});

