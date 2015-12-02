'use strict';

var readStreamFrom = require('./src/read-stream-from');
var fibGenerator = require('./src/fib-generator');
var take = require('./src/take');
var appendString = require('./src/append-string');

var elementsInSequence = process.argv[2];

readStreamFrom(fibGenerator())
  .pipe(take(elementsInSequence))
  .pipe(appendString('\n'))
  .pipe(process.stdout);
