'use strict'

const fibGen = require('./src/fib-generator')

// create a new object that is "iterable"
// this means it has a property whos name is Symbol.iterator
// and who's value is an object that is an "iterator"
// and "iterator" is an object that has a "next"
// method which returns a { value, done } record when called
const fibSeq = { [Symbol.iterator]: () => fibGen() }

// the `for/of` construct in es6 works *only* with iterables
// (but code has been added to native arrays to make them iterable)
let count = 1
for (let fib of fibSeq) {
  console.log(count, fib)
  if (count === 100) break
  count += 1
}
