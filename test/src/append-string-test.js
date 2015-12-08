'use strict';

import { assert } from 'chai';
import appendString from '../../src/append-string';

describe('#appendString', () => {
  it('raises if not passed a string', () => {
    assert.throws(appendString.bind(null, null), 'to be a string');
    assert.throws(appendString.bind(null, undefined), 'to be a string');
    assert.throws(appendString.bind(null, 1), 'to be a string');
    assert.throws(appendString.bind(null, []), 'to be a string');
    assert.throws(appendString.bind(null, {}), 'to be a string');
    assert.throws(appendString.bind(null, false), 'to be a string');
  });

  it('appends the string to each value yielded from the generator', () => {
    const TAIL = ' for the win';
    const appendStringGenerator = appendString(TAIL);;

    assert.strictEqual(appendStringGenerator.next('anything').value, 'anything' + TAIL);
    assert.strictEqual(appendStringGenerator.next('nothing').value, 'nothing' + TAIL);
    assert.strictEqual(appendStringGenerator.next('FTW').value, 'FTW' + TAIL);
  });
});
