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

  it('appends the string to each chunk of the stream', function(done) {
    var results = [];
    var inputStream = new stream.Readable();
    inputStream.push("one");
    inputStream.push("two");
    inputStream.push(null);

    var resultStream = new stream.Writable();
    resultStream._write = function(buf, enc, cb) {
      results.push(buf.toString());
      cb(null);
    };

    inputStream.pipe(appendString('\n')).pipe(resultStream);

    resultStream.on('finish', function() {
      assert.deepEqual(results, ['one\n', 'two\n']);
      done();
    });
  });
});