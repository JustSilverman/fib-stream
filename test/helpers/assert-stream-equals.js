'use strict';

import { assert } from 'chai';
import { Writable as WritableStream } from 'stream';

export default function assertStreamEquals(expected, cb) {
  const results = [];
  const resultStream = new WritableStream();
  resultStream._write = (buf, enc, cb) => {
    results.push(buf.toString());
    cb(null);
  };

  resultStream.on('finish', () => {
    assert.strictEqual(results.join(''), expected);
    cb();
  });

  return resultStream;
}
