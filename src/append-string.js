'use strict';

const assert = require('chai').assert;
const TransformStream = require('stream').Transform

function appendString(stringToAppend) {
  assert.isString(stringToAppend);

  const appendGenerator = function* () {
    let last = '';
    while (true) {
      last = yield (last + stringToAppend);
    }
  }

  const generator = appendGenerator();
  generator.next();
  return generator;
}

module.exports = appendString;
