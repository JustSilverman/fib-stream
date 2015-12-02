'use strict';

var assert = require('chai').assert;
var TransformStream = require('stream').Transform

function appendString(stringToAppend) {
  assert.isString(stringToAppend);

  var transformStream = new TransformStream();

  transformStream._transform = function(buf, encoding, cb){
    try {
      var appended = Buffer.concat([buf, new Buffer(stringToAppend)]);
      cb(null, appended);
    } catch (error) {
      cb(error);
    }
  };

  return transformStream;
}

module.exports = appendString;
