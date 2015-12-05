'use strict';

export default function fibGenerator() {
  const generator = function* () {
    let penultimate = 0;
    let last = 1;
    let current;

    yield penultimate;
    yield last;

    while (true) {
      current = penultimate + last;
      yield current;

      penultimate = last;
      last = current;
    }
  }

  return generator();
}
