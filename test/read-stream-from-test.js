'use strict';

var assert = require('chai').assert;
var WritableStream = require('stream').Writable;
var readStreamFrom = require('../src/read-stream-from');

describe('#readStreamFrom', function() {
  it('raises if passed something that does not implement the generator interface', function() {
    assert.throws(readStreamFrom.bind(null, {}), 'to be a function');
  });

  it('returns a readStream that reads the value of generator#next until done', function(done) {
    var generator = {
      counter: 0,
      next: function() {
        var value = this.counter;
        var done = this.counter >= 3;
        this.counter++;

        return {
          value: value,
          done: done
        }
      }
    }

    var results = [];
    var resultStream = new WritableStream();
    resultStream._write = function(buf, enc, cb) {
      results.push(buf.toString());
      cb(null);
    };

    readStreamFrom(generator).pipe(resultStream);
    resultStream.on('finish', function() {
      assert.deepEqual(results, ["0", "1", "2", "3"]);
      done();
    });
  });
});