'use strict';

var transformStreamFrom = require('./src/transform-stream-from');
var readStreamFrom = require('./src/read-stream-from');
var fibGenerator = require('./src/fib-generator');
var limit = require('./src/limit');
var appendString = require('./src/append-string');

var elementsInSequence = process.argv[2];

readStreamFrom(fibGenerator())
  .pipe(transformStreamFrom(limit(elementsInSequence)))
  .pipe(transformStreamFrom(appendString('\n')))
  .pipe(process.stdout);
