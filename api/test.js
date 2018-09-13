var assert = require('assert');
var request = require('request');
request('http://www.google.com', function (error, response) {
          console.log('error:', error); 
          console.log('statusCode:', response && response.statusCode); 
});
describe('Array', function() {
  describe('#indexOf()', function() {   
    it('should return -1 when the value is not present', function () {
      assert([200,404].indexOf(3), -1);    
        });
  });
});

  describe('prove, that http response code is 200', function() {
    it('this test proves, that the response code is 200', function() {
      assert(200 == 404);
    });
  });

    // test branch restriction
 
    // tibors new code
  describe('Tibors Test Cases', function() {
    console.log("Tibors log entry");
  });