'use strict';

var assert = require('chai').assert;
var stream = require('stream');
var take = require('../src/take');

describe('#take', function() {
  function createResultsStream(results) {
    var resultStream = new stream.Writable();
    resultStream._write = function(buf, enc, cb) {
      results.push(buf.toString());
      cb();
    };

    return resultStream;
  }

  it('respects the limit', function(done) {
    var results = [];
    var resultStream = createResultsStream(results);
    var inputStream = new stream.Readable();
    inputStream.push("one");
    inputStream.push("two");
    inputStream.push("three");
    inputStream.push(null);

    var resultStream = createResultsStream(results);

    inputStream.pipe(take(2)).pipe(resultStream);
    resultStream.on('finish', function() {
      assert.deepEqual(results, ['one', 'two']);
      done();
    });
  });

  it('handles infinite streams', function(done) {
    var results = [];
    var resultStream = createResultsStream(results);
    var counter = 0;
    var inputStream = new stream.Readable();
    inputStream._read = function() {
      inputStream.push(counter.toString());
      counter++;
    }

    inputStream.pipe(take(5)).pipe(resultStream);
    resultStream.on('finish', function() {
      assert.deepEqual(results, ["0", "1", "2", "3", "4"]);
      done();
    });
  });
});
