'use strict';

var assert = require('chai').assert;
var stream = require('stream');
var appendString = require('../src/append-string');

describe('#appendString', function() {
  it('raises if not passed a string', function() {
    assert.throws(appendString.bind(null, null), 'to be a string');
    assert.throws(appendString.bind(null, undefined), 'to be a string');
    assert.throws(appendString.bind(null, 1), 'to be a string');
    assert.throws(appendString.bind(null, []), 'to be a string');
    assert.throws(appendString.bind(null, {}), 'to be a string');
    assert.throws(appendString.bind(null, false), 'to be a string');
  });

  it('appends the string to each value yielded from the generator', function() {
    var TAIL = ' for the win';
    var appendStringGenerator = appendString(TAIL);;

    assert.strictEqual(appendStringGenerator.next('anything').value, 'anything' + TAIL);
    assert.strictEqual(appendStringGenerator.next('nothing').value, 'nothing' + TAIL);
    assert.strictEqual(appendStringGenerator.next('FTW').value, 'FTW' + TAIL);
  });
});
