'use strict';

import { assert } from 'chai';
import { Readable as ReadableStream} from 'stream';

export default function readStreamFrom(generator) {
  assert.isFunction(generator.next);

  let readStream = ReadableStream();

  readStream._read = function() {
    const next = generator.next();

    if (next.done) {
      readStream.push(null);
    } else {
      readStream.push(next.value.toString());
    }
  };

  return readStream;
}
