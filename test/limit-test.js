'use strict';

var assert = require('chai').assert;
var limit = require('../src/limit');

describe('#limit', function() {
  it('yields the input until the limit has been reached using the generator interface', function() {
    var limitIterator = limit(5);

    for (var i = 0; i < 5; i++) {
      var next = limitIterator.next('input ' + i);
      assert.strictEqual(next.value, 'input ' + i);
      assert.isFalse(next.done);
    }

    next = limitIterator.next(i);
    assert.isUndefined(next.value);
    assert.isTrue(next.done);
  });
});
