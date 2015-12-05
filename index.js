'use strict';

import transformStreamFrom from './src/transform-stream-from';
import readStreamFrom from './src/read-stream-from';
import fibGenerator from './src/fib-generator';
import limit from './src/limit';
import appendString from './src/append-string';

var elementsInSequence = process.argv[2];

readStreamFrom(fibGenerator())
  .pipe(transformStreamFrom(limit(elementsInSequence)))
  .pipe(transformStreamFrom(appendString('\n')))
  .pipe(process.stdout);
