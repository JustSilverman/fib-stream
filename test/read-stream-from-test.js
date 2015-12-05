'use strict';

const assert = require('chai').assert;
const WritableStream = require('stream').Writable;
const readStreamFrom = require('../src/read-stream-from');

describe('#readStreamFrom', () => {
  it('raises if passed something that does not implement the generator interface', () => {
    assert.throws(readStreamFrom.bind(null, {}), 'to be a function');
  });

  it('returns a readStream that reads the value of generator#next until done', (done) => {
    const generator = function* () {
      let counter = 0;
      while (counter <= 3) {
        yield counter;
        counter++;
      }
    }

    const results = [];
    const resultStream = new WritableStream();
    resultStream._write = (buf, enc, cb) => {
      results.push(buf.toString());
      cb(null);
    };


    readStreamFrom(generator()).pipe(resultStream);
    resultStream.on('finish', () => {
      assert.deepEqual(results, ["0", "1", "2", "3"]);
      done();
    });
  });
});