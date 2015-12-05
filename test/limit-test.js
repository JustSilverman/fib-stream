'use strict';

const assert = require('chai').assert;
const limit = require('../src/limit');

describe('#limit', function() {
  it('yields the input until the limit has been reached using the generator interface', function() {
    const limitIterator = limit(5);

    for (let i = 0; i < 5; i++) {
      let next = limitIterator.next('input ' + i);
      assert.strictEqual(next.value, 'input ' + i);
      assert.isFalse(next.done);
    }

    let last = limitIterator.next(5);
    assert.isUndefined(last.value);
    assert.isTrue(last.done);
  });
});
