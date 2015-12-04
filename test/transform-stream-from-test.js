'use strict';

var assert = require('chai').assert;
var stream = require('stream');
var transformStreamFrom = require('../src/transform-stream-from');

describe('#transformStreamFrom', function() {
  it('raises if passed something that does not implement the generator interface', function() {
    assert.throws(transformStreamFrom.bind(null, {}), 'to be a function');
  });

  it('returns a transformStream that passes values downstream until the generator is done', function(done) {
    const postfixGenerator = function* (postfix) {
      let base = '';
      while (true) {
        base = yield (base + postfix);
      }
    }

    const worldGenerator = postfixGenerator(' world');
    worldGenerator.next();

    var inputStream = new stream.Readable();
    inputStream.push("hello");
    inputStream.push("two");
    inputStream.push(null);

    var results = [];
    var resultStream = new stream.Writable();
    resultStream._write = function(buf, enc, cb) {
      results.push(buf.toString());
      cb(null);
    };

    inputStream.pipe(transformStreamFrom(worldGenerator)).pipe(resultStream);
    resultStream.on('finish', function() {
      assert.deepEqual(results, ["hello world", "two world"]);
      done();
    });
  });
});
