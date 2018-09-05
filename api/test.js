var request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); 
  console.log('statusCode:', response && response.statusCode); 
  console.log('body:', body); 
});

var assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('http response code is 200', function () {             
    });
  });
  // tibors new code
  describe('Tibors Test Cases', function() {
    console.log("Tibors log entry");
  });
});