'use strict';

const assert = require('chai').assert;
const ReadableStream = require('stream').Readable

function readStreamFrom(generator) {
  assert.isFunction(generator.next);

  let readStream = ReadableStream();

  readStream._read = function() {
    const next = generator.next();
    readStream.push(next.value.toString());

    if (next.done) {
      readStream.push(null);
    }
  };

  return readStream;
}

module.exports = readStreamFrom;
