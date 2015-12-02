'use strict';

var assert = require('chai').assert;
var fibGenerator = require('../src/fib-generator');

describe('FibGenerator', function() {
  function assertNextValueAndDone(next, expectedValue) {
    assert.strictEqual(next.value, expectedValue);
    assert.isFalse(next.done);
  }

  describe('#next', function() {
    it('begins at the first number in the sequence', function() {
      var generator = fibGenerator();

      assertNextValueAndDone(generator.next(), 0);
    });

    it('returns the next number in the sequence', function() {
      var generator = fibGenerator();

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
