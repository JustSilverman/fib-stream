'use strict';

import { assert } from 'chai';
import * as stream from 'stream';
import assertStreamEquals from '../helpers/assert-stream-equals';
import transformStreamFrom from '../../src/transform-stream-from';

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

    inputStream
      .pipe(transformStreamFrom(worldGenerator))
      .pipe(assertStreamEquals(['hello world', 'two world'].join(''), done));
  });
});
