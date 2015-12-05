'use strict';

const assert = require('chai').assert;
const ReadableStream = require('stream').Readable

function readStreamFrom(generator) {
  assert.isFunction(generator.next);

  let readStream = ReadableStream();

  readStream._read = function() {
    const next = generator.next();

    if (next.done) {
      readStream.push(null);
    } else {
      readStream.push(next.value.toString());
    }
  };

  return readStream;
}

module.exports = readStreamFrom;
