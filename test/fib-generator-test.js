'use strict';

const assert = require('chai').assert;
const fibGenerator = require('../src/fib-generator');

describe('FibGenerator', () => {
  function assertNextValueAndDone(next, expectedValue) {
    assert.strictEqual(next.value, expectedValue);
    assert.isFalse(next.done);
  }

  describe('#next', () => {
    it('begins at the first number in the sequence', () => {
      const generator = fibGenerator();

      assertNextValueAndDone(generator.next(), 0);
    });

    it('returns the next number in the sequence', () => {
      const generator = fibGenerator();

      assertNextValueAndDone(generator.next(), 0);
      assertNextValueAndDone(generator.next(), 1);
      assertNextValueAndDone(generator.next(), 1);
      assertNextValueAndDone(generator.next(), 2);
      assertNextValueAndDone(generator.next(), 3);
      assertNextValueAndDone(generator.next(), 5);
      assertNextValueAndDone(generator.next(), 8);
      assertNextValueAndDone(generator.next(), 13);
      assertNextValueAndDone(generator.next(), 21);
      assertNextValueAndDone(generator.next(), 34);
      assertNextValueAndDone(generator.next(), 55);
    });
  });
});
