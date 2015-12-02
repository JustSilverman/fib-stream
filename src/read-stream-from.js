'use strict';

var assert = require('chai').assert;
var ReadableStream = require('stream').Readable

function readStreamFrom(generator) {
  assert.isFunction(generator.next);

  var readStream = ReadableStream();

  readStream._read = function() {
    var next = generator.next();
    readStream.push(next.value.toString());

    if (next.done) {
      readStream.push(null);
    }
  };

  return readStream;
}

module.exports = readStreamFrom;
