var request = require('request'); 
var url1 = 'https://en.wikipedia.org/wiki/Vehicle_identification_number#List_of_common_WMI'
var url2 = 'https://github.com/ApelSYN/node-vin-lite/blob/master/db/manufacturersIndex.json'
var url3 = 'https://en.wikipedia.org/wiki/Vehicle_identification_number#World_manufacturer_identifier'
var url4 = 'https://en.wikipedia.org/wiki/Vehicle_identification_number#Model_year_encoding'
var url5 = 'https://github.com/ApelSYN/node-vin-lite/blob/master/db/modelyears.json'
 
request('url1', function(error, response, body) {
      request('url2', function(error, response, body) {
          request('url3', function(error, response, body) {
              request('url4', function(error, response, body) {
                  request('url5', function(error, response, body) {
                  });
              });
          });
     });
});

var HtmlDiffer = require('html-differ').HtmlDiffer;
var fs = require('fs'),
    logger = require('html-differ/lib/logger');

var htmlDiffer = new HtmlDiffer(options);

var options = {
        ignoreAttributes: [],
        compareAttributesAsJSON: [],
        ignoreWhitespaces: true,
        ignoreComments: true,
        ignoreEndTags: false,
        ignoreDuplicateAttributes: false
    };

var diff = htmlDiffer.diffHtml(url1, url2),
    isEqual = htmlDiffer.isEqual(url1, url2);
res = logger.getDiffText(diff, { charsAroundDiff: 40 });

logger.logDiffText(diff, { charsAroundDiff: 40 });

var diff = htmlDiffer.diffHtml(url2, url3),
    isEqual = htmlDiffer.isEqual(url2, url3);
res = logger.getDiffText(diff, { charsAroundDiff: 40 });

logger.logDiffText(diff, { charsAroundDiff: 40 });

var diff = htmlDiffer.diffHtml(url3, url4),
    isEqual = htmlDiffer.isEqual(url3, url4);
res = logger.getDiffText(diff, { charsAroundDiff: 40 });

logger.logDiffText(diff, { charsAroundDiff: 40 });

var diff = htmlDiffer.diffHtml(url4, url5),
    isEqual = htmlDiffer.isEqual(url4, url5);
res = logger.getDiffText(diff, { charsAroundDiff: 40 });

logger.logDiffText(diff, { charsAroundDiff: 40 });