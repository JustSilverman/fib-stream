'use strict';

import { assert } from 'chai';
import limit from '../../src/limit';

describe('#limit', () => {
  it('yields the input until the limit has been reached using the generator interface', () => {
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
