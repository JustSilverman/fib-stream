'use strict';

const assert = require('chai').assert;
const TransformStream = require('stream').Transform;

function transformStreamFrom(generator) {
  assert.isFunction(generator.next);

  let transformStream = new TransformStream();
  transformStream._transform = function(buf, enc, cb) {
    const next = generator.next(buf.toString());

    if (!next.done) {
      cb(null, next.value);
      return;
    }


    this.emit('end');
  }

  return transformStream;
}

module.exports = transformStreamFrom;
