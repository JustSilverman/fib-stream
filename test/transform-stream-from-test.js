'use strict';

const assert = require('chai').assert;
const stream = require('stream');
const transformStreamFrom = require('../src/transform-stream-from');

describe('#transformStreamFrom', () => {
  it('raises if passed something that does not implement the generator interface', () => {
    assert.throws(transformStreamFrom.bind(null, {}), 'to be a function');
  });

  it('returns a transformStream that passes values downstream until the generator is done', (done) => {
    const postfixGenerator = function* (postfix) {
      let base = '';
      while (true) {
        base = yield (base + postfix);
      }
    }

    const worldGenerator = postfixGenerator(' world');
    worldGenerator.next();

    const inputStream = new stream.Readable();
    inputStream.push("hello");
    inputStream.push("two");
    inputStream.push(null);

    const results = [];
    const resultStream = new stream.Writable();
    resultStream._write = (buf, enc, cb) => {
      results.push(buf.toString());
      cb(null);
    };

    inputStream.pipe(transformStreamFrom(worldGenerator)).pipe(resultStream);
    resultStream.on('finish', () => {
      assert.deepEqual(results, ["hello world", "two world"]);
      done();
    });
  });
});
