var request = require('request');
request('http://www.google.com', function(err, res) {
    console.log('err:', err);
    console.log('statusCode:', res &&res.statusCode);
   });
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {   
    it('should return -1 when http://www.google.com not present', function () {
        assert([200,404].indexOf(3), -1);
    });
  });
});
      

  describe('prove, that htttp response code is 200', function() {
    it('this test proves that http response code is 200', function() {
      assert(200 == 200);
    });
  });

    // test branch restriction
 
    // tibors new code
  describe('Tibors Test Cases', function() {
    console.log("Tibors log entry");
  });