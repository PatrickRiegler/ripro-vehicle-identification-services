var chai = require('chai')
  , chaiHttp = require('chai-http');

var assert = require('chai').assert
var expect = chai.expect;

chai.use(chaiHttp);

describe('Array', function() {
    describe('indexOf', function() {
        it('should return -1 when the value not present', function() {
            chai.request('http://www.google.com')
               .get('/')
               .end(function(error,response) {
                 expect(error).to.be.null;
                 expect(response).to.have.status(200);
                 assert.equal([200,response.status].indexOf(3), -1);
               });
        });
     });
});
   describe('prove that, the response code is 200', function() {
      it('this test proves, that the response code is 200', function(done) {
         chai.request('http://www.google.com')
              .get('/')
              .end(function(error, response) {
                 expect(error).to.be.null;
                 expect(response).to.have.status(200);
                 assert.equal(200,response.status);
                 done();
              });
      });
  });

    // test branch restriction
 
    // tibors new code
  describe('Tibors Test Cases', function() {
    console.log("Tibors log entry");
  });
