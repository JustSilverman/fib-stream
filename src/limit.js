'use strict'

function limit(n) {
  const limitGenerator = function* (count) {
    let callCount = 0;

    while (callCount <= count) {
      let last = yield last;
      callCount++;
    }
  }

  const generator = limitGenerator(n);
  generator.next();
  return generator;
}

module.exports = limit;
