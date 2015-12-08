'use strict';

import { assert } from 'chai';
import { Writable as WritableStream } from 'stream';
import assertStreamEquals from '../helpers/assert-stream-equals';
import readStreamFrom from '../../src/read-stream-from';

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

    readStreamFrom(generator())
      .pipe(assertStreamEquals(["0", "1", "2", "3"].join(''), done));
  });
});
